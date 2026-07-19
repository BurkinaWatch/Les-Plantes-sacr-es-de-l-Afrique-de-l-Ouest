import { pool } from "@workspace/db";
import { logger } from "./logger";

export async function ensureSchema() {
  const client = await pool.connect();
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
