import { createDatabasePool } from "@workspace/db";
import {
  BackupRestoreRequiredError,
  CURRENT_SCHEMA_VERSION,
  ensureSchema,
  IncompatibleSchemaVersionError,
  rollbackSchemaForVerification,
  verifyEffectivePrivileges,
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

type RepresentativeUserRow = {
  id: number;
  username: string;
  password_hash: string;
};

type RepresentativeTokenRow = {
  token: string;
  user_id: number | null;
  platform: string | null;
};

const API_WRITE_SMOKE_USERNAME = "service-api-write-smoke-user";
const API_WRITE_SMOKE_TOKEN = "ExponentPushToken[service_api_write_smoke]";

const PRIVILEGE_PROBE_TABLE = "migration_privilege_probe";
const PRIVILEGE_PROBE_SEQUENCE = "migration_privilege_probe_id_seq";
const PRIVILEGE_PROBE_REQUIREMENTS = [
  {
    objectType: "table" as const,
    objectName: `${PRIVILEGE_PROBE_TABLE}`,
    privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  },
  {
    objectType: "sequence" as const,
    objectName: `${PRIVILEGE_PROBE_SEQUENCE}`,
    privileges: ["USAGE", "SELECT"],
  },
] as const;

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

async function readRepresentativeData(
  testPool: ReturnType<typeof createDatabasePool>,
): Promise<{
  users: RepresentativeUserRow[];
  tokens: RepresentativeTokenRow[];
}> {
  const userResult = await testPool.query<RepresentativeUserRow>(`
    SELECT id, username, password_hash
    FROM users
    WHERE username IN ('smoke-alice', 'smoke-boubacar')
    ORDER BY username
  `);
  const tokenResult = await testPool.query<RepresentativeTokenRow>(`
    SELECT token, user_id, platform
    FROM push_tokens
    WHERE token IN ('smoke-token-alice', 'smoke-token-boubacar')
    ORDER BY token
  `);

  return {
    users: userResult.rows,
    tokens: tokenResult.rows,
  };
}

function assertRepresentativeData(
  actual: {
    users: RepresentativeUserRow[];
    tokens: RepresentativeTokenRow[];
  },
  expected: {
    users: RepresentativeUserRow[];
    tokens: RepresentativeTokenRow[];
  },
  context: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Rollback data verification failed ${context}: expected ${JSON.stringify(
        expected,
      )}, found ${JSON.stringify(actual)}.`,
    );
  }
}

async function seedRepresentativeData(
  testPool: ReturnType<typeof createDatabasePool>,
): Promise<{
  users: RepresentativeUserRow[];
  tokens: RepresentativeTokenRow[];
}> {
  await testPool.query(`
    INSERT INTO users (username, password_hash)
    VALUES
      ('smoke-alice', 'representative-password-hash-alice'),
      ('smoke-boubacar', 'representative-password-hash-boubacar')
    RETURNING id, username, password_hash
  `);
  await testPool.query(
    `
      INSERT INTO push_tokens (user_id, token, platform)
      SELECT id, 'smoke-token-alice', 'ios'
      FROM users
      WHERE username = 'smoke-alice'
      UNION ALL
      SELECT id, 'smoke-token-boubacar', 'android'
      FROM users
      WHERE username = 'smoke-boubacar'
    `,
  );

  return readRepresentativeData(testPool);
}

function getPostgresErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }

  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

async function verifyServiceApiWrites(
  servicePool: ReturnType<typeof createDatabasePool>,
): Promise<void> {
  const client = await servicePool.connect();

  try {
    await client.query("BEGIN");

    const insertedUser = await client.query<{
      id: number;
      username: string;
      password_hash: string;
    }>(
      `
        INSERT INTO users (username, password_hash)
        VALUES ($1, $2)
        RETURNING id, username, password_hash
      `,
      [API_WRITE_SMOKE_USERNAME, "service-api-write-initial-hash"],
    );
    const user = insertedUser.rows[0];

    if (
      !user ||
      !Number.isInteger(user.id) ||
      user.username !== API_WRITE_SMOKE_USERNAME ||
      user.password_hash !== "service-api-write-initial-hash"
    ) {
      throw new Error(
        "API write smoke failed: the service role could not insert a user using the users.id sequence.",
      );
    }

    const selectedUser = await client.query<{
      id: number;
      username: string;
      password_hash: string;
    }>(
      `
        SELECT id, username, password_hash
        FROM users
        WHERE id = $1
      `,
      [user.id],
    );
    if (
      selectedUser.rows.length !== 1 ||
      selectedUser.rows[0]?.username !== API_WRITE_SMOKE_USERNAME
    ) {
      throw new Error(
        "API write smoke failed: the service role could not read the inserted user.",
      );
    }

    const updatedUser = await client.query<{
      id: number;
      password_hash: string;
    }>(
      `
        UPDATE users
        SET password_hash = $2
        WHERE id = $1
        RETURNING id, password_hash
      `,
      [user.id, "service-api-write-updated-hash"],
    );
    if (
      updatedUser.rows.length !== 1 ||
      updatedUser.rows[0]?.password_hash !== "service-api-write-updated-hash"
    ) {
      throw new Error(
        "API write smoke failed: the service role could not update the user.",
      );
    }

    const insertedToken = await client.query<{ id: number }>(
      `
        INSERT INTO push_tokens (user_id, token, platform, updated_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING id
      `,
      [user.id, API_WRITE_SMOKE_TOKEN, "ios"],
    );
    if (
      insertedToken.rows.length !== 1 ||
      !Number.isInteger(insertedToken.rows[0]?.id)
    ) {
      throw new Error(
        "API write smoke failed: the service role could not insert a push token using the push_tokens.id sequence.",
      );
    }

    const upsertedToken = await client.query<{ id: number }>(
      `
        INSERT INTO push_tokens (user_id, token, platform, updated_at)
        VALUES ($1, $2, $3, NOW())
        ON CONFLICT (token) DO UPDATE
        SET platform = $3, updated_at = NOW()
        WHERE push_tokens.user_id = $1
        RETURNING id
      `,
      [user.id, API_WRITE_SMOKE_TOKEN, "android"],
    );
    if (upsertedToken.rows.length !== 1) {
      throw new Error(
        "API write smoke failed: the service role could not update an existing push token through the API upsert.",
      );
    }

    const selectedToken = await client.query<{
      user_id: number | null;
      token: string;
      platform: string | null;
    }>(
      `
        SELECT user_id, token, platform
        FROM push_tokens
        WHERE token = $1
      `,
      [API_WRITE_SMOKE_TOKEN],
    );
    const token = selectedToken.rows[0];
    if (
      selectedToken.rows.length !== 1 ||
      token?.user_id !== user.id ||
      token.token !== API_WRITE_SMOKE_TOKEN ||
      token.platform !== "android"
    ) {
      throw new Error(
        "API write smoke failed: the service role could not read the updated push token relationship.",
      );
    }

    await client.query("SAVEPOINT duplicate_username_constraint");
    try {
      await client.query(
        `
          INSERT INTO users (username, password_hash)
          VALUES ($1, $2)
        `,
        [API_WRITE_SMOKE_USERNAME, "duplicate-user-hash"],
      );
      throw new Error(
        "API write smoke failed: duplicate usernames were accepted.",
      );
    } catch (error) {
      if (getPostgresErrorCode(error) !== "23505") {
        throw error;
      }
      await client.query("ROLLBACK TO SAVEPOINT duplicate_username_constraint");
      await client.query("RELEASE SAVEPOINT duplicate_username_constraint");
    }

    await client.query("SAVEPOINT foreign_key_constraint");
    try {
      await client.query(
        `
          INSERT INTO push_tokens (user_id, token, platform)
          VALUES ($1, $2, $3)
        `,
        [-2147483648, "ExponentPushToken[invalid_foreign_key]", "ios"],
      );
      throw new Error(
        "API write smoke failed: a push token with an unknown user was accepted.",
      );
    } catch (error) {
      if (getPostgresErrorCode(error) !== "23503") {
        throw error;
      }
      await client.query("ROLLBACK TO SAVEPOINT foreign_key_constraint");
      await client.query("RELEASE SAVEPOINT foreign_key_constraint");
    }

    await client.query("DELETE FROM push_tokens WHERE token = $1", [
      API_WRITE_SMOKE_TOKEN,
    ]);
    const deletedToken = await client.query(
      "SELECT 1 FROM push_tokens WHERE token = $1",
      [API_WRITE_SMOKE_TOKEN],
    );
    if (deletedToken.rows.length !== 0) {
      throw new Error(
        "API write smoke failed: the service role could not delete the push token.",
      );
    }

    await client.query("DELETE FROM users WHERE id = $1", [user.id]);
    const deletedUser = await client.query("SELECT 1 FROM users WHERE id = $1", [
      user.id,
    ]);
    if (deletedUser.rows.length !== 0) {
      throw new Error(
        "API write smoke failed: the service role could not delete the user.",
      );
    }

    await client.query("COMMIT");
    console.log(
      "PostgreSQL API write smoke passed: the non-privileged Railway API role inserted, read, updated, and deleted users and push tokens; serial permissions and constraints were enforced.",
    );
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // Preserve the original failure when the transaction is already closed.
    }
    throw error;
  } finally {
    client.release();
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
  const serviceDatabaseUrl = process.env.SERVICE_DATABASE_URL?.trim();
  const servicePool = serviceDatabaseUrl
    ? createDatabasePool(serviceDatabaseUrl, {
        connectionTimeoutMillis: 10_000,
      })
    : undefined;
  const migrationDatabaseUrl = process.env.MIGRATION_DATABASE_URL?.trim();
  const migrationPool = migrationDatabaseUrl
    ? createDatabasePool(migrationDatabaseUrl, {
        connectionTimeoutMillis: 10_000,
      })
    : undefined;
  let postgresVersion = process.env.POSTGRES_VERSION?.trim() || "unknown";

  try {
    postgresVersion = await readServerVersion(testPool);
    console.log(
      `PostgreSQL ${postgresVersion}: starting blank-database migration smoke check.`,
    );
    await assertEmptyDatabase(testPool);

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    const privilegeProbePool = migrationPool ?? testPool;
    await privilegeProbePool.query(
      `CREATE SEQUENCE ${PRIVILEGE_PROBE_SEQUENCE}`,
    );
    await privilegeProbePool.query(`
      CREATE TABLE ${PRIVILEGE_PROBE_TABLE} (
        id INTEGER NOT NULL DEFAULT nextval('${PRIVILEGE_PROBE_SEQUENCE}'),
        payload TEXT NOT NULL,
        PRIMARY KEY (id)
      )
    `);
    await verifyEffectivePrivileges(
      privilegeProbePool,
      migrationDatabaseUrl ?? databaseUrl,
      PRIVILEGE_PROBE_REQUIREMENTS,
    );
    if (servicePool && serviceDatabaseUrl) {
      await verifyEffectivePrivileges(
        servicePool,
        serviceDatabaseUrl,
        PRIVILEGE_PROBE_REQUIREMENTS,
      );
      console.log(
        `PostgreSQL ${postgresVersion}: API role privileges remained effective on a migration-created table and sequence.`,
      );
    }
    console.log(
      `PostgreSQL ${postgresVersion}: initial migrations succeeded on a blank database.`,
    );

    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion}: already-versioned database verification succeeded.`,
    );

    if (servicePool && serviceDatabaseUrl) {
      await verifyServiceApiWrites(servicePool);
    }

    const representativeDataBeforeUpgrade =
      await seedRepresentativeData(testPool);
    await testPool.query(
      "DELETE FROM schema_migrations WHERE version = $1",
      [CURRENT_SCHEMA_VERSION],
    );
    await ensureSchema(testPool, databaseUrl);
    await verifySchema(testPool, databaseUrl);
    assertRepresentativeData(
      await readRepresentativeData(testPool),
      representativeDataBeforeUpgrade,
      "after the upgrade",
    );
    console.log(
      `PostgreSQL ${postgresVersion}: representative users and push tokens survived the upgrade.`,
    );

    let backupRestoreRequired = false;
    try {
      await rollbackSchemaForVerification(
        testPool,
        databaseUrl,
        CURRENT_SCHEMA_VERSION - 1,
      );
    } catch (error) {
      if (error instanceof BackupRestoreRequiredError) {
        backupRestoreRequired = true;
      } else {
        throw error;
      }
    }

    if (!backupRestoreRequired) {
      throw new Error(
        "Rollback verification failed: a destructive migration did not require a backup restore.",
      );
    }

    assertRepresentativeData(
      await readRepresentativeData(testPool),
      representativeDataBeforeUpgrade,
      "after the backup-restore requirement",
    );
    await verifySchema(testPool, databaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion}: destructive rollback was rejected in favor of backup restore and representative data remained intact.`,
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
      `PostgreSQL ${postgresVersion} schema smoke check passed: upgrade and rollback verification, future-version rejection, drift detection, and restoration all succeeded.`,
    );
  } catch (error) {
    console.error(
      `PostgreSQL ${postgresVersion} schema smoke check failed: ${formatReadinessFailure(error)}`,
    );
    process.exitCode = 1;
  } finally {
    await servicePool?.end();
    await migrationPool?.end();
    await testPool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
