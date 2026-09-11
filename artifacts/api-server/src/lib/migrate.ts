import { pool } from "@workspace/db";
import { logger } from "./logger";

export const REQUIRED_SCHEMA_TABLES = ["users", "push_tokens"] as const;

type SchemaClient = {
  query(text: string, values?: unknown[]): Promise<unknown>;
  release(): void;
};

export type SchemaPool = {
  connect(): Promise<SchemaClient>;
  query<T extends Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
};

function assertDatabaseConfigured(configuredDatabaseUrl: string | undefined) {
  if (!configuredDatabaseUrl) {
    throw new Error(
      "Database configuration is missing: set DATABASE_URL or RAILWAY_DATABASE_URL to a provisioned PostgreSQL database.",
    );
  }
}

export async function ensureSchema(
  schemaPool: Pick<SchemaPool, "connect"> = pool,
  configuredDatabaseUrl: string | undefined =
    process.env.DATABASE_URL ?? process.env.RAILWAY_DATABASE_URL,
) {
  assertDatabaseConfigured(configuredDatabaseUrl);

  const client = await schemaPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS push_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        token TEXT NOT NULL UNIQUE,
        platform TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS push_tokens_user_id_idx ON push_tokens(user_id)
    `);

    logger.info("Database schema is ready");
  } catch (err) {
    logger.error({ err }, "Failed to ensure database schema");
    throw err;
  } finally {
    client.release();
  }
}

export async function verifySchema(
  schemaPool: Pick<SchemaPool, "query"> = pool,
  configuredDatabaseUrl: string | undefined =
    process.env.DATABASE_URL ?? process.env.RAILWAY_DATABASE_URL,
) {
  assertDatabaseConfigured(configuredDatabaseUrl);

  const result = await schemaPool.query<{ table_name: string }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = current_schema()
        AND table_type = 'BASE TABLE'
        AND table_name = ANY($1::text[])
    `,
    [REQUIRED_SCHEMA_TABLES],
  );

  const existingTables = new Set(result.rows.map((row) => row.table_name));
  const missingTables = REQUIRED_SCHEMA_TABLES.filter(
    (tableName) => !existingTables.has(tableName),
  );

  if (missingTables.length > 0) {
    throw new Error(
      `PostgreSQL schema verification failed: missing required table(s): ${missingTables.join(", ")}`,
    );
  }
}
