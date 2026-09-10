import { databaseUrl, pool } from "@workspace/db";
import { logger } from "./logger";

export type SchemaPool = {
  connect(): Promise<{
    query(text: string): Promise<unknown>;
    release(): void;
  }>;
};

export async function ensureSchema(
  schemaPool: SchemaPool = pool,
  configuredDatabaseUrl: string | undefined = databaseUrl,
) {
  if (!configuredDatabaseUrl) {
    throw new Error(
      "Database configuration is missing: set DATABASE_URL or RAILWAY_DATABASE_URL to a provisioned PostgreSQL database.",
    );
  }

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
