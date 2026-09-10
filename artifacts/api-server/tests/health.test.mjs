import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import test from "node:test";

import healthRouter from "../.test-dist/src/routes/health.js";
import { setDatabaseReadiness } from "../.test-dist/src/lib/runtime-state.js";

async function withHealthServer(callback) {
  const app = express();
  app.use("/api", healthRouter);
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("health reports actionable configuration failures before traffic is accepted", async () => {
  const previousDatabaseUrl = process.env.DATABASE_URL;
  const previousRailwayDatabaseUrl = process.env.RAILWAY_DATABASE_URL;
  const previousJwtSecret = process.env.JWT_SECRET;
  delete process.env.DATABASE_URL;
  delete process.env.RAILWAY_DATABASE_URL;
  delete process.env.JWT_SECRET;
  setDatabaseReadiness("failed");

  try {
    await withHealthServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/healthz`);
      const body = await response.json();

      assert.equal(response.status, 503);
      assert.deepEqual(body.checks, { database: "missing", jwt: "missing" });
      assert.equal(body.status, "not_ready");
      assert.match(body.message, /DATABASE_URL/);
      assert.match(body.message, /JWT_SECRET/);
    });
  } finally {
    if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousDatabaseUrl;
    if (previousRailwayDatabaseUrl === undefined) delete process.env.RAILWAY_DATABASE_URL;
    else process.env.RAILWAY_DATABASE_URL = previousRailwayDatabaseUrl;
    if (previousJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousJwtSecret;
  }
});

test("health returns ready only after the schema check succeeds", async () => {
  const previousDatabaseUrl = process.env.DATABASE_URL;
  const previousJwtSecret = process.env.JWT_SECRET;
  process.env.DATABASE_URL = "postgresql://health-check.example.invalid/api";
  process.env.JWT_SECRET = "health-test-secret";
  setDatabaseReadiness("ready");

  try {
    await withHealthServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/healthz`);
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.deepEqual(body, {
        status: "ready",
        ready: true,
        checks: { database: "ready", jwt: "configured" },
        message: "API is ready to accept traffic.",
      });
    });
  } finally {
    if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousDatabaseUrl;
    if (previousJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousJwtSecret;
    setDatabaseReadiness("not_started");
  }
});

test("health exposes a clear not-ready response after PostgreSQL schema failure", async () => {
  const previousDatabaseUrl = process.env.DATABASE_URL;
  const previousJwtSecret = process.env.JWT_SECRET;
  process.env.DATABASE_URL = "postgresql://health-check.example.invalid/api";
  process.env.JWT_SECRET = "health-test-secret";
  setDatabaseReadiness(
    "failed",
    "Database schema verification failed. Check the PostgreSQL connection and server logs.",
  );

  try {
    await withHealthServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/healthz`);
      const body = await response.json();

      assert.equal(response.status, 503);
      assert.deepEqual(body.checks, { database: "unavailable", jwt: "configured" });
      assert.equal(body.status, "not_ready");
      assert.equal(body.ready, false);
      assert.match(body.message, /Database schema verification failed/);
      assert.doesNotMatch(body.message, /postgresql:\/\/health-check/);
    });
  } finally {
    if (previousDatabaseUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previousDatabaseUrl;
    if (previousJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousJwtSecret;
    setDatabaseReadiness("not_started");
  }
});