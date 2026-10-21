import assert from "node:assert/strict";
import { createServer } from "node:http";
import express from "express";
import { test } from "node:test";

import {
  createRequireTrialOrActiveSubscription,
} from "../.test-dist/src/lib/auth-middleware.js";
import {
  evaluateTrialAccess,
  TRIAL_DURATION_MS,
} from "../.test-dist/src/lib/subscription-access.js";

const trialStartedAt = new Date("2026-01-01T00:00:00.000Z");

test("the free trial is active until exactly 72 hours after it starts", () => {
  const oneMillisecondBeforeExpiry = new Date(
    trialStartedAt.getTime() + TRIAL_DURATION_MS - 1,
  );
  const expiry = new Date(trialStartedAt.getTime() + TRIAL_DURATION_MS);

  assert.equal(
    evaluateTrialAccess(trialStartedAt, false, oneMillisecondBeforeExpiry).hasAccess,
    true,
  );
  assert.equal(evaluateTrialAccess(trialStartedAt, false, expiry).trialActive, false);
  assert.equal(evaluateTrialAccess(trialStartedAt, false, expiry).hasAccess, false);
});

test("an active subscription preserves access after the trial expires", () => {
  const afterExpiry = new Date(trialStartedAt.getTime() + TRIAL_DURATION_MS + 1);
  const access = evaluateTrialAccess(trialStartedAt, true, afterExpiry);

  assert.equal(access.trialActive, false);
  assert.equal(access.subscriptionActive, true);
  assert.equal(access.hasAccess, true);
});

async function requestProtectedRoute(access) {
  let reachedProtectedHandler = false;
  const app = express();
  const authenticate = (req, _res, next) => {
    req.user = { id: 42, username: "trial-user" };
    next();
  };
  const guard = createRequireTrialOrActiveSubscription(
    async () => access,
    authenticate,
  );
  app.get("/protected", guard, (_req, res) => {
    reachedProtectedHandler = true;
    res.json({ ok: true });
  });

  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/protected`);
    return {
      response,
      body: await response.json(),
      reachedProtectedHandler,
    };
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

test("expired trial without a subscription is blocked before protected work runs", async () => {
  const expiredAccess = evaluateTrialAccess(
    trialStartedAt,
    false,
    new Date(trialStartedAt.getTime() + TRIAL_DURATION_MS),
  );
  const result = await requestProtectedRoute(expiredAccess);

  assert.equal(result.response.status, 402);
  assert.equal(result.body.code, "SUBSCRIPTION_REQUIRED");
  assert.equal(result.reachedProtectedHandler, false);
});

test("a current trial is allowed through the paid-feature guard", async () => {
  const currentAccess = evaluateTrialAccess(
    trialStartedAt,
    false,
    new Date(trialStartedAt.getTime() + 60_000),
  );
  const result = await requestProtectedRoute(currentAccess);

  assert.equal(result.response.status, 200);
  assert.deepEqual(result.body, { ok: true });
  assert.equal(result.reachedProtectedHandler, true);
});
