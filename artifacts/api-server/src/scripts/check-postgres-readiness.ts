import { createDatabasePool } from "@workspace/db";
import { ensureSchema, verifySchema } from "../lib/migrate.js";
import {
  formatReadinessFailure,
  getReadinessDatabaseUrl,
} from "../lib/readiness-report.js";

type ConnectionMetadata = {
  serverVersion: string;
  applicationName: string;
  ssl: boolean;
};

type ConnectionOptions = {
  mode: string;
  sslMode: string;
  applicationName: string | undefined;
};

function getConnectionMode(): string {
  const mode = process.env.READINESS_CONNECTION_MODE?.trim() || "default";
  return /^[a-z0-9_-]+$/i.test(mode) ? mode : "custom";
}

function getConnectionOptions(databaseUrl: string): ConnectionOptions {
  const parsedUrl = new URL(databaseUrl);
  const sslMode = parsedUrl.searchParams.get("sslmode") ?? "default";
  const applicationName =
    parsedUrl.searchParams.get("application_name") || undefined;

  return {
    mode: getConnectionMode(),
    sslMode: /^[a-z0-9_-]+$/i.test(sslMode) ? sslMode : "custom",
    applicationName,
  };
}

function formatConnectionOptions(options: ConnectionOptions): string {
  const applicationName =
    options.applicationName &&
    /^[a-z0-9._-]{1,64}$/i.test(options.applicationName)
      ? `, application_name=${options.applicationName}`
      : "";
  return `${options.mode} (sslmode=${options.sslMode}${applicationName})`;
}

async function readConnectionMetadata(
  readinessPool: ReturnType<typeof createDatabasePool>,
): Promise<ConnectionMetadata> {
  const client = await readinessPool.connect();

  try {
    const result = await client.query<{
      server_version: string;
      application_name: string;
      ssl: boolean;
    }>(`
      SELECT
        current_setting('server_version') AS server_version,
        current_setting('application_name') AS application_name,
        COALESCE(pg_stat_ssl.ssl, false) AS ssl
      FROM pg_stat_activity
      LEFT JOIN pg_stat_ssl ON pg_stat_ssl.pid = pg_stat_activity.pid
      WHERE pg_stat_activity.pid = pg_backend_pid()
    `);
    const row = result.rows[0];

    if (!row) {
      throw new Error("PostgreSQL connection metadata was not returned.");
    }

    return {
      serverVersion: row.server_version,
      applicationName: row.application_name,
      ssl: row.ssl,
    };
  } finally {
    client.release();
  }
}

function assertConnectionOptions(
  metadata: ConnectionMetadata,
  options: ConnectionOptions,
): void {
  if (
    options.applicationName &&
    metadata.applicationName !== options.applicationName
  ) {
    throw new Error(
      `PostgreSQL connection option application_name was not applied (expected ${options.applicationName}, found ${metadata.applicationName || "empty"}).`,
    );
  }

  if (
    ["require", "verify-ca", "verify-full", "no-verify"].includes(
      options.sslMode,
    )
  ) {
    if (!metadata.ssl) {
      throw new Error(
        `PostgreSQL connection option sslmode=${options.sslMode} did not establish an SSL session.`,
      );
    }
  } else if (options.sslMode === "disable" && metadata.ssl) {
    throw new Error(
      "PostgreSQL connection option sslmode=disable established an SSL session.",
    );
  }
}

async function main(): Promise<void> {
  const readinessDatabaseUrl = getReadinessDatabaseUrl();
  const verifyOnly = process.argv.includes("--verify-only");
  let postgresVersion = process.env.POSTGRES_VERSION?.trim() || "unknown";
  let connectionOptions = "unknown";

  if (!readinessDatabaseUrl) {
    console.error(
      "PostgreSQL readiness check is not ready: set READINESS_DATABASE_URL explicitly to a provisioned PostgreSQL connection string.",
    );
    process.exitCode = 1;
    return;
  }

  try {
    connectionOptions = formatConnectionOptions(
      getConnectionOptions(readinessDatabaseUrl),
    );
  } catch {
    connectionOptions = `${getConnectionMode()} (invalid connection URL)`;
  }

  let readinessPool: ReturnType<typeof createDatabasePool> | undefined;

  try {
    readinessPool = createDatabasePool(readinessDatabaseUrl, {
      connectionTimeoutMillis: 10_000,
    });
    const metadata = await readConnectionMetadata(readinessPool);
    postgresVersion = metadata.serverVersion;
    const parsedConnectionOptions = getConnectionOptions(readinessDatabaseUrl);
    assertConnectionOptions(metadata, parsedConnectionOptions);

    if (!verifyOnly) {
      await ensureSchema(readinessPool, readinessDatabaseUrl);
    }
    await verifySchema(readinessPool, readinessDatabaseUrl);
    console.log(
      `PostgreSQL ${postgresVersion} ${connectionOptions}: schema ${verifyOnly ? "verification" : "readiness"} passed; users and push_tokens tables are ready.`,
    );
  } catch (error) {
    console.error(
      `PostgreSQL ${postgresVersion} ${connectionOptions} readiness check failed: ${formatReadinessFailure(error)}`,
    );
    process.exitCode = 1;
  } finally {
    await readinessPool?.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}