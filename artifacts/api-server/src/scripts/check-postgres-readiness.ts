import pg from "pg";
import { ensureSchema } from "../lib/migrate.js";

const readinessDatabaseUrl = process.env.READINESS_DATABASE_URL?.trim();

function redactDatabaseUrl(message: string): string {
  return message.replace(
    /(?:postgres(?:ql)?):\/\/[^\s"'`]+/gi,
    "postgresql://[redacted]",
  );
}

export function getReadinessDatabaseUrl(
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  return env.READINESS_DATABASE_URL?.trim() || undefined;
}

export function formatReadinessFailure(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return redactDatabaseUrl(message);
}

async function main(): Promise<void> {
  if (!readinessDatabaseUrl) {
    console.error(
      "PostgreSQL readiness check is not ready: set READINESS_DATABASE_URL explicitly to a provisioned PostgreSQL connection string.",
    );
    process.exitCode = 1;
    return;
  }

  const readinessPool = new pg.Pool({
    connectionString: readinessDatabaseUrl,
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