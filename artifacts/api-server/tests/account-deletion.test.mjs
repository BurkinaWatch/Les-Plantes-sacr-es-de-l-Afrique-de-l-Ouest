import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import test from "node:test";
import jwt from "jsonwebtoken";

import { createAccountDeletionRouter } from "../.test-dist/src/routes/account-deletion.js";
import { createRequireJwt } from "../.test-dist/src/lib/auth-middleware.js";

const JWT_SECRET = "test-jwt-secret";
const TOKEN = jwt.sign(
  { id: 42, username: "tester" },
  JWT_SECRET,
  { algorithm: "HS256", issuer: "plantes-sacrees-api", audience: "plantes-sacrees-mobile", expiresIn: "1h" },
);

async function withApp(router, callback, { urlencoded = false } = {}) {
  const app = express();
  app.use(express.json());
  if (urlencoded) app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", router);
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    return await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

function createDatabase({ username = "tester" } = {}) {
  const calls = [];
  const client = {
    async query(sql, params = []) {
      const normalized = sql.trim().replace(/\s+/g, " ");
      calls.push({ sql: normalized, params });

      if (normalized.startsWith("SELECT id, password_hash FROM users")) {
        return {
          rows: username
            ? [{ id: 42, username, password_hash: "stored-hash" }]
            : [],
          rowCount: username ? 1 : 0,
        };
      }
      if (normalized.startsWith("SELECT provider, provider_transaction_id, provider_reference FROM payment_attempts")) {
        return {
          rows: [
            { provider: "saspay", provider_transaction_id: "txn-1", provider_reference: "ref-1" },
            { provider: "saspay", provider_transaction_id: "txn-2", provider_reference: null },
          ],
          rowCount: 2,
        };
      }
      if (normalized.startsWith("DELETE FROM users")) return { rows: [], rowCount: 1 };
      return { rows: [], rowCount: 0 };
    },
    release() {
      calls.push({ sql: "RELEASE", params: [] });
    },
  };
  return { calls, client, connect: async () => client };
}

test("authenticated account deletion rechecks the password and removes dependent records transactionally", async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  const database = createDatabase();
  const compared = [];
  const router = createAccountDeletionRouter({
    connect: database.connect,
    comparePassword: async (password, hash) => {
      compared.push([password, hash]);
      return password === "correct-password";
    },
    authenticate: (req, res, next) => {
      req.user = { id: 42, username: "tester" };
      next();
    },
  });

  await withApp(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/auth/account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ password: "correct-password" }),
    });

    assert.equal(response.status, 204);
    assert.deepEqual(compared, [["correct-password", "stored-hash"]]);
    const statements = database.calls.map((call) => call.sql);
    assert.equal(statements[0], "BEGIN");
    assert.ok(statements.indexOf("DELETE FROM payment_attempts WHERE user_id = $1") < statements.indexOf("DELETE FROM subscriptions WHERE user_id = $1"));
    assert.ok(statements.indexOf("DELETE FROM subscriptions WHERE user_id = $1") < statements.indexOf("DELETE FROM users WHERE id = $1"));
    assert.ok(statements.indexOf("UPDATE payment_events SET provider_reference = NULL, payload = $4::jsonb, payload_hash = $5, processing_error = NULL WHERE provider = $1 AND ( provider_transaction_id = ANY($2::text[]) OR provider_reference = ANY($3::text[]) )") < statements.indexOf("DELETE FROM payment_attempts WHERE user_id = $1"));
    assert.equal(statements.at(-2), "COMMIT");
    assert.equal(statements.at(-1), "RELEASE");
    const redaction = database.calls.find((call) => call.sql.startsWith("UPDATE payment_events"));
    assert.deepEqual(redaction.params.slice(0, 3), ["saspay", ["txn-1", "txn-2"], ["ref-1"]]);
    assert.deepEqual(JSON.parse(redaction.params[3]), { redacted: true, reason: "account-deletion" });
  });
});

test("authenticated account deletion rejects a wrong password without deleting records", async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  const database = createDatabase();
  const router = createAccountDeletionRouter({
    connect: database.connect,
    comparePassword: async () => false,
    authenticate: (req, _res, next) => {
      req.user = { id: 42, username: "tester" };
      next();
    },
  });

  await withApp(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/auth/account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ password: "wrong-password" }),
    });

    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: "Mot de passe incorrect" });
    const statements = database.calls.map((call) => call.sql);
    assert.deepEqual(statements, ["BEGIN", "SELECT id, password_hash FROM users WHERE id = $1 FOR UPDATE", "ROLLBACK", "RELEASE"]);
  });
});

test("a repeated authenticated deletion is idempotent once the account is absent", async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  const database = createDatabase({ username: null });
  const router = createAccountDeletionRouter({
    connect: database.connect,
    comparePassword: async () => {
      throw new Error("Password comparison must not run for a missing account.");
    },
    authenticate: (req, _res, next) => {
      req.user = { id: 42, username: "tester" };
      next();
    },
  });

  await withApp(router, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/auth/account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ password: "correct-password" }),
    });

    assert.equal(response.status, 204);
    const statements = database.calls.map((call) => call.sql);
    assert.deepEqual(statements, ["BEGIN", "SELECT id, password_hash FROM users WHERE id = $1 FOR UPDATE", "ROLLBACK", "RELEASE"]);
  });
});

test("public form accepts URL-encoded requests and returns generic errors for invalid credentials", async () => {
  const database = createDatabase();
  const router = createAccountDeletionRouter({
    connect: database.connect,
    comparePassword: async (password) => password === "correct-password",
  });

  await withApp(router, async (baseUrl) => {
    const page = await fetch(`${baseUrl}/api/auth/account-deletion`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /demander la suppression/i);
    assert.equal(page.headers.get("cache-control"), "no-store");

    const response = await fetch(`${baseUrl}/api/auth/account-deletion`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: "tester",
        password: "wrong-password",
        confirm: "yes",
      }),
    });
    const html = await response.text();
    assert.equal(response.status, 401);
    assert.match(html, /Compte non supprimé/);
    assert.match(html, /nom d’utilisateur ou le mot de passe est incorrect/i);
    assert.doesNotMatch(html, /stored-hash|wrong-password/);

    const successResponse = await fetch(`${baseUrl}/api/auth/account-deletion`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: "tester",
        password: "correct-password",
        confirm: "yes",
      }),
    });
    assert.equal(successResponse.status, 200);
    assert.match(await successResponse.text(), /Compte supprimé/);
    assert.ok(database.calls.some((call) => call.sql === "DELETE FROM users WHERE id = $1"));
  }, { urlencoded: true });
});

test("active-account authentication rejects a valid token when its user row is gone", async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  const app = express();
  app.get("/protected", createRequireJwt(async (userId) => userId !== 42), (_req, res) => {
    res.status(200).json({ ok: true });
  });
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/protected`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: "Ce compte n’existe plus" });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});