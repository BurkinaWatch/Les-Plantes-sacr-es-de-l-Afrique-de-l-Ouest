import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import jwt from "jsonwebtoken";
import test from "node:test";
import { credentialsSchema } from "../.test-dist/src/lib/auth-credentials.js";
import { createEmailLinkHandler } from "../.test-dist/src/lib/email-link.js";
import { createRequireJwt, signUserToken } from "../.test-dist/src/lib/auth-middleware.js";

test("email credentials are normalized without breaking legacy clients or accepting extra fields", () => {
  assert.equal(credentialsSchema.parse({ username: " Client.Name+app@Example.COM ", password: "test-password" }).username, "client.name+app@example.com");
  assert.equal(credentialsSchema.parse({ username: " Legacy_User ", password: "test-password" }).username, "legacy_user");
  for (const username of ["bad@", "two words@example.com", "name-hyphen", ""]) {
    assert.equal(credentialsSchema.safeParse({ username, password: "test-password" }).success, false);
  }
  assert.equal(credentialsSchema.safeParse({ username: "client@example.com", password: "test-password", userId: 9 }).success, false);
});

test("email JWTs longer than thirty characters remain usable on protected routes", async () => {
  const username = `${"a".repeat(50)}@example.com`;
  const token = signUserToken({ id: 42, username });
  const req = { headers: { authorization: `Bearer ${token}` } };
  let accepted = false;
  await createRequireJwt()(req, { status() { throw new Error("Email JWT rejected"); } }, () => { accepted = true; });
  assert.equal(accepted, true);
  assert.deepEqual(req.user, { id: 42, username });
});

async function withLink(callback, { exists = true, conflict = false, stale = false } = {}) {
  const account = { id: 42, username: "legacy_user", passwordHash: "unchanged-hash" };
  const calls = [];
  const app = express();
  app.use(express.json());
  app.post("/link", createEmailLinkHandler({
    findAccount: async () => exists ? account : undefined,
    comparePassword: async password => password === "correct-password",
    renameAccount: async (original, email) => {
      calls.push({ original: { ...original }, email });
      if (conflict) throw { code: "23505" };
      if (stale) return undefined;
      account.username = email;
      return { id: account.id, username: email };
    },
  }));
  const server = createServer(app);
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const post = body => fetch(`http://127.0.0.1:${server.address().port}/link`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
  try { await callback({ post, calls, account }); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

const body = { username: "legacy_user", email: " Client@Example.com ", password: "correct-password" };

test("email association preserves the account ID and password and issues a usable new session", async () => {
  await withLink(async ({ post, calls, account }) => {
    const response = await post(body);
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.deepEqual(result.user, { id: 42, username: "client@example.com" });
    assert.equal(account.passwordHash, "unchanged-hash");
    assert.equal(calls.length, 1);
    assert.equal(jwt.verify(result.token, process.env.JWT_SECRET, {
      issuer: "plantes-sacrees-api", audience: "plantes-sacrees-mobile", algorithms: ["HS256"],
    }).id, 42);
  });
});

test("wrong passwords and unknown old accounts cannot claim an email", async () => {
  await withLink(async ({ post, calls }) => {
    assert.equal((await post({ ...body, password: "incorrect-password" })).status, 401);
    assert.equal(calls.length, 0);
  });
  await withLink(async ({ post, calls }) => {
    assert.equal((await post(body)).status, 401);
    assert.equal(calls.length, 0);
  }, { exists: false });
});

test("an email belonging to another account is never overwritten or merged", async () => {
  await withLink(async ({ post, account }) => {
    assert.equal((await post(body)).status, 409);
    assert.equal(account.username, "legacy_user");
    assert.equal(account.passwordHash, "unchanged-hash");
  }, { conflict: true });
});

test("invalid association data and concurrent account changes fail explicitly", async () => {
  await withLink(async ({ post, calls }) => {
    assert.equal((await post({ ...body, email: "not-email" })).status, 400);
    assert.equal((await post({ ...body, userId: 99 })).status, 400);
    assert.equal(calls.length, 0);
  });
  await withLink(async ({ post }) => {
    assert.equal((await post(body)).status, 409);
  }, { stale: true });
});
