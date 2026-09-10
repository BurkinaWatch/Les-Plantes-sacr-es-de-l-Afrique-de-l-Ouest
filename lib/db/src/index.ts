import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;
export function resolveDatabaseUrl(
  env: NodeJS.ProcessEnv = process.env,
): string | undefined {
  const configuredUrl = env.DATABASE_URL ?? env.RAILWAY_DATABASE_URL;
  return configuredUrl?.trim() || undefined;
}

export const databaseUrl = resolveDatabaseUrl();

export function createDatabasePool(connectionString?: string) {
  return new Pool(connectionString ? { connectionString } : {});
}

// Do not throw while this module is loading. The API needs to expose its
// readiness endpoint even when Railway configuration is incomplete.
export const pool = createDatabasePool(databaseUrl);
export const db = drizzle(pool, { schema });

export * from "./schema";
