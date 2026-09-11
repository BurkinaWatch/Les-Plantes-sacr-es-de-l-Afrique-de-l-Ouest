import { createDatabasePool } from "@workspace/db";
import {
  CURRENT_SCHEMA_VERSION,
  ensureSchema,
  IncompatibleSchemaVersionError,
  verifySchema,
} from "../lib/migrate.js";
import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../lib/readiness-report.js";

type ServerVersionRow = {
  server_version: string;
};

type DatabaseTableRow = {
  table_name: string;
};

async function readServerVersion(
  testPool: ReturnType<typeof createDatabasePool>,
): Promise<string> {
  const result = await testPool.query<ServerVersionRow>(
    "SELECT current_setting('server_version') AS server_version",
  );
  return result.rows[0]?.server_version ?? "unknown";
}

async function assertEmptyDatabase(
  testPool: ReturnType<typeof createDatabasePool>,
): Promise<void> {
  const result = await testPool.query<DatabaseTableRow>(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = current_schema()
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);

  if (result.rows.length > 0) {
    throw new Error(
      `Expected a blank PostgreSQL database, found table(s): ${result.rows
        .map((row) => row.table_name)
        .join(", ")}`,
    );
  }
}

async function main(): Promise<void> {
  const databaseUrl = getReadinessDatabaseUrl();

  if (!databaseUrl) {
    console.error(
      "PostgreSQL schema smoke check is not ready: set READINESS_DATABASE_URL explicitly.",
    );
    process.exitCode = 1;
    return;
  }

  const testPool = createDatabasePool(databaseUrl, {
    connectionTimeoutMillis: 10_000,
  });
  let postgresVersion = process.env.POSTGRES_VERSION?.trim() || "unknown";

  try {
    postgresVersion = await readServerVersion(testPool);
    console.log(
      `PostgreSQL ${postgresVersion}: starting blank-database migration smoke check.`,
    );
    await assertEmptyDatabase(testPool);

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion}: initial migrations succeeded on a blank database.`,
    );

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion}: already-versioned database verification succeeded.`,
    );

    await testPool.query(
      "INSERT INTO schema_migrations (version) VALUES ($1)",
      [CURRENT_SCHEMA_VERSION + 1],
    );

    let incompatibleVersionDetected = false;
    try {
      await ensureSchema(testPool, databaseUrl);
    } catch (error) {
      if (error instanceof IncompatibleSchemaVersionError) {
        incompatibleVersionDetected = true;
      } else {
        throw error;
      }
    }

    if (!incompatibleVersionDetected) {
      throw new Error(
        "Schema version smoke check failed: a future migration version was accepted.",
      );
    }
    console.log(
      `PostgreSQL ${postgresVersion}: future migration version was rejected on an already-versioned database.`,
    );

    await testPool.query("DELETE FROM schema_migrations WHERE version = $1", [
      CURRENT_SCHEMA_VERSION + 1,
    ]);
    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);

    await testPool.query("DROP INDEX IF EXISTS push_tokens_user_id_idx");

    let indexDriftDetected = false;
    try {
      await verifySchema(testPool, databaseUrl);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes(
          "missing required index(es): push_tokens_user_id_idx on push_tokens(user_id)",
        )
      ) {
        indexDriftDetected = true;
      } else {
        throw error;
      }
    }

    if (!indexDriftDetected) {
      throw new Error(
        "Schema drift smoke check failed: missing push_tokens_user_id_idx was not detected.",
      );
    }

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);

    await testPool.query(
      "ALTER TABLE push_tokens ALTER COLUMN platform TYPE integer USING NULL",
    );

    let typeDriftDetected = false;
    try {
      await verifySchema(testPool, databaseUrl);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes(
          "incompatible required column(s): push_tokens.platform (expected type text (text), found integer (int4))",
        )
      ) {
        typeDriftDetected = true;
      } else {
        throw error;
      }
    }

    if (!typeDriftDetected) {
      throw new Error(
        "Schema drift smoke check failed: incompatible push_tokens.platform type was not detected.",
      );
    }

    await testPool.query(
      "ALTER TABLE push_tokens ALTER COLUMN platform TYPE text USING NULL",
    );
    await verifySchema(testPool, databaseUrl);

    await testPool.query(
      "ALTER TABLE push_tokens ALTER COLUMN updated_at SET DEFAULT TIMESTAMP '2000-01-01 00:00:00'",
    );

    let defaultDriftDetected = false;
    try {
      await verifySchema(testPool, databaseUrl);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes(
          "incompatible required column(s): push_tokens.updated_at (expected default now(), found ",
        )
      ) {
        defaultDriftDetected = true;
      } else {
        throw error;
      }
    }

    if (!defaultDriftDetected) {
      throw new Error(
        "Schema drift smoke check failed: incompatible push_tokens.updated_at default was not detected.",
      );
    }

    await testPool.query(
      "ALTER TABLE push_tokens ALTER COLUMN updated_at SET DEFAULT NOW()",
    );
    await verifySchema(testPool, databaseUrl);

    await testPool.query("DROP TABLE IF EXISTS push_tokens");

    let driftDetected = false;
    try {
      await verifySchema(testPool, databaseUrl);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("missing required table(s): push_tokens")
      ) {
        driftDetected = true;
      } else {
        throw error;
      }
    }

    if (!driftDetected) {
      throw new Error(
        "Schema drift smoke check failed: missing push_tokens was not detected.",
      );
    }

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion} schema smoke check passed: blank and already-versioned migrations, future-version rejection, drift detection, and restoration all succeeded.`,
    );
  } catch (error) {
    console.error(
      `PostgreSQL ${postgresVersion} schema smoke check failed: ${formatReadinessFailure(error)}`,
    );
    process.exitCode = 1;
  } finally {
    await testPool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
