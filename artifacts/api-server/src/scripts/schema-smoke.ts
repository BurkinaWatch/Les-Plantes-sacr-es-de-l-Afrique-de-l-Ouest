import { createDatabasePool } from "@workspace/db";
import {
  ensureSchema,
  verifySchema,
} from "../lib/migrate.js";
import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../lib/readiness-report.js";

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

  try {
    await ensureSchema(testPool, databaseUrl);
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
      "PostgreSQL schema smoke check passed: creation, drift detection, and restoration all succeeded.",
    );
  } catch (error) {
    console.error(
      `PostgreSQL schema smoke check failed: ${formatReadinessFailure(error)}`,
    );
    process.exitCode = 1;
  } finally {
    await testPool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}