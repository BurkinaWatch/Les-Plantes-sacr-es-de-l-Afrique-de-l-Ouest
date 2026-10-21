import assert from "node:assert/strict";
import { test } from "node:test";

import { settlePaymentAttempt } from "../.test-dist/src/lib/payment-settlement.js";
import { evaluateTrialAccess } from "../.test-dist/src/lib/subscription-access.js";

const attempt = {
  id: 7,
  subscriptionId: 11,
  providerTransactionId: null,
  providerReference: null,
};

function createFakeDatabase({ attemptPending = true } = {}) {
  const state = {
    inTransaction: false,
    attemptStatus: attemptPending ? "PENDING" : "SUCCEEDED",
    subscription: {
      period: "MONTHLY",
      status: "PENDING",
      startsAt: null,
      expiresAt: null,
      providerTransactionId: null,
      providerReference: null,
    },
  };

  const operations = {
    async claimPendingAttempt(_id, update) {
      if (state.attemptStatus !== "PENDING") return false;
      state.attemptStatus = update.status;
      return true;
    },
    async getSubscriptionPeriod() {
      return state.subscription.period;
    },
    async activateSubscription(_id, update) {
      Object.assign(state.subscription, update);
    },
    async failSubscription(_id, updatedAt) {
      Object.assign(state.subscription, { status: "FAILED", updatedAt });
    },
  };

  return {
    state,
    database: {
      async transaction(callback) {
        state.inTransaction = true;
        try {
          return await callback(operations);
        } finally {
          state.inTransaction = false;
        }
      },
      ...operations,
    },
  };
}

test("a verified SAS Pay payment restores access after the trial expires", async () => {
  const now = new Date("2026-04-04T12:00:00.000Z");
  const { database, state } = createFakeDatabase();

  const result = await settlePaymentAttempt(
    database,
    attempt,
    "PAID",
    undefined,
    "SAS-REF-42",
    now,
  );

  assert.equal(result, "SUCCEEDED");
  assert.equal(state.inTransaction, false);
  assert.equal(state.attemptStatus, "SUCCEEDED");
  assert.equal(state.subscription.status, "ACTIVE");
  assert.equal(state.subscription.startsAt.toISOString(), now.toISOString());
  assert.equal(state.subscription.expiresAt.toISOString(), "2026-05-04T12:00:00.000Z");
  assert.equal(state.subscription.providerReference, "SAS-REF-42");

  const access = evaluateTrialAccess(
    new Date("2026-04-01T00:00:00.000Z"),
    state.subscription.status === "ACTIVE",
    now,
  );
  assert.equal(access.trialActive, false);
  assert.equal(access.hasAccess, true);
});

test("unpaid and repeated payment events do not grant access twice", async () => {
  const unpaid = createFakeDatabase();
  const pendingResult = await settlePaymentAttempt(
    unpaid.database,
    attempt,
    "PENDING",
    undefined,
    undefined,
    new Date("2026-04-04T12:00:00.000Z"),
  );
  assert.equal(pendingResult, "PENDING");
  assert.equal(unpaid.state.subscription.status, "PENDING");

  const repeated = createFakeDatabase({ attemptPending: false });
  const repeatedResult = await settlePaymentAttempt(
    repeated.database,
    attempt,
    "PAID",
    "transaction-42",
    undefined,
    new Date("2026-04-04T12:00:00.000Z"),
  );
  assert.equal(repeatedResult, "UNCHANGED");
  assert.equal(repeated.state.subscription.status, "PENDING");
});
