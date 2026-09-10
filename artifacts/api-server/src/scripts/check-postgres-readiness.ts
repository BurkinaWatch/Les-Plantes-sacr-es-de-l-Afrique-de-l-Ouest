import { createDatabasePool } from "@workspace/db";
import { ensureSchema } from "../lib/migrate.js";
import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../lib/readiness-report.js";

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
    console.log("PostgreSQL readiness check passed: schema is ready.");
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