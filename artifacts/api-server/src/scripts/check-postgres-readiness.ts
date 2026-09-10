import { createDatabasePool } from "@workspace/db";
import { ensureSchema } from "../lib/migrate.js";
import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../lib/readiness-report.js";

const requiredTables = ["users", "push_tokens"] as const;

async function verifyRequiredTables(
  readinessPool: ReturnType<typeof createDatabasePool>,
): Promise<void> {
  const result = await readinessPool.query<{ table_name: string }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = current_schema()
        AND table_type = 'BASE TABLE'
        AND table_name = ANY($1::text[])
    `,
    [requiredTables],
  );

  const existingTables = new Set(result.rows.map((row) => row.table_name));
  const missingTables = requiredTables.filter(
    (tableName) => !existingTables.has(tableName),
  );

  if (missingTables.length > 0) {
    throw new Error(
      `PostgreSQL schema verification failed: missing required table(s): ${missingTables.join(", ")}`,
    );
  }
}

async function main(): Promise<void> {
  const readinessDatabaseUrl = getReadinessDatabaseUrl();

  if (!readinessDatabaseUrl) {
    console.error(
      "PostgreSQL readiness check is not ready: set READINESS_DATABASE_URL explicitly to a provisioned PostgreSQL connection string.",
    );
    process.exitCode = 1;
    return;
  }

  const readinessPool = createDatabasePool(readinessDatabaseUrl, {
    connectionTimeoutMillis: 10_000,
  });

  try {
    await ensureSchema(readinessPool, readinessDatabaseUrl);
    await verifyRequiredTables(readinessPool);
    console.log(
      "PostgreSQL readiness check passed: users and push_tokens tables are ready.",
    );
  } catch (error) {
    console.error(
      `PostgreSQL readiness check failed: ${formatReadinessFailure(error)}`,
    );
    process.exitCode = 1;
  } finally {
    await readinessPool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}