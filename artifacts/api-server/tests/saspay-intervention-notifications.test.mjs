import test from "node:test";
import assert from "node:assert/strict";
import {
  createSasPayInterventionNotifier,
  normalizeSasPayAdminEmail,
} from "../.test-dist/src/lib/saspay-notifications.js";

test("the configured administrator email is normalized and invalid values are ignored", () => {
  assert.equal(normalizeSasPayAdminEmail("  ADMIN@example.com  "), "admin@example.com");
  assert.equal(normalizeSasPayAdminEmail("not-an-email"), undefined);
  assert.equal(normalizeSasPayAdminEmail(undefined), undefined);
});

test("intervention pushes reach only the affected customer and configured admin", async () => {
  const deliveries = [];
  const warnings = [];
  const notify = createSasPayInterventionNotifier({
    getAdminEmail: () => normalizeSasPayAdminEmail(" ADMIN@example.com "),
    findCustomerTokens: async (userId) => {
      assert.equal(userId, 12);
      return ["customer-token", "shared-token"];
    },
    findAdminRecipients: async (email) => {
      assert.equal(email, "admin@example.com");
      return { accountFound: true, tokens: ["admin-token", "shared-token"] };
    },
    send: async (...delivery) => deliveries.push(delivery),
    warn: (...warning) => warnings.push(warning),
  });

  await notify({ customerUserId: 12, subscriptionId: 99, reason: "configuration" });

  assert.equal(deliveries.length, 3);
  assert.deepEqual(
    deliveries.map(([tokens, title]) => [tokens, title]),
    [
      [["customer-token"], "Paiement à vérifier"],
      [["admin-token"], "Action requise : paiement"],
      [["shared-token"], "Paiement à vérifier"],
    ],
  );
  assert.deepEqual(
    deliveries.flatMap(([tokens]) => tokens).sort(),
    ["admin-token", "customer-token", "shared-token"],
  );
  assert.ok(deliveries.every((delivery) => delivery[3].type === "payment_intervention"));
  assert.equal(warnings.length, 0);
});

test("an unmatched provider transaction alerts only the configured administrator", async () => {
  const deliveries = [];
  const notify = createSasPayInterventionNotifier({
    getAdminEmail: () => "admin@example.com",
    findCustomerTokens: async () => {
      assert.fail("An unmatched payment must never be sent to an unrelated customer.");
    },
    findAdminRecipients: async (email) => {
      assert.equal(email, "admin@example.com");
      return { accountFound: true, tokens: ["admin-token"] };
    },
    send: async (...delivery) => deliveries.push(delivery),
    warn: () => {},
  });

  await notify({
    providerTransactionId: "txn-1",
    reason: "verification",
  });

  assert.equal(deliveries.length, 1);
  assert.deepEqual(deliveries[0][0], ["admin-token"]);
  assert.equal(deliveries[0][1], "Action requise : paiement");
  assert.equal(deliveries[0][3].providerTransactionId, "txn-1");
});

test("without a configured administrator, notifications are never broadcast to other users", async () => {
  const deliveries = [];
  const warnings = [];
  const notify = createSasPayInterventionNotifier({
    getAdminEmail: () => undefined,
    findCustomerTokens: async (userId) => {
      assert.equal(userId, 12);
      return ["customer-token"];
    },
    findAdminRecipients: async () => {
      assert.fail("No administrator lookup should occur without configuration.");
    },
    send: async (...delivery) => deliveries.push(delivery),
    warn: (...warning) => warnings.push(warning),
  });

  await notify({ customerUserId: 12, reason: "verification" });

  assert.equal(deliveries.length, 1);
  assert.deepEqual(deliveries[0][0], ["customer-token"]);
  assert.deepEqual(warnings.map(([reason]) => reason), ["admin_not_configured"]);
});

