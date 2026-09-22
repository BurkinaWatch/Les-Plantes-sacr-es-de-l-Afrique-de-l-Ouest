import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import {
  recordIdempotentWebhookEvent,
  verifySasPayWebhook,
} from "../.test-dist/src/lib/saspay-webhook.js";

const SECRET = "webhook-test-secret";
const NOW_MS = 1_700_000_000_000;
const BODY = Buffer.from(JSON.stringify({
  event: "transaction.updated",
  data: { id: "transaction-123", status: "SUCCESS" },
}));

function signatureFor(body, timestamp = String(NOW_MS / 1000)) {
  return createHmac("sha256", SECRET)
    .update(`${timestamp}.${body.toString("utf8")}`)
    .digest("hex");
}

test("SAS Pay webhook accepts the signed raw body and rejects mutations", () => {
  const timestamp = String(NOW_MS / 1000);
  const signature = signatureFor(BODY, timestamp);

  assert.equal(
    verifySasPayWebhook(BODY, `sha256=${signature}`, timestamp, SECRET, NOW_MS),
    true,
  );
  assert.equal(
    verifySasPayWebhook(
      Buffer.from(`${BODY.toString("utf8")} `),
      signature,
      timestamp,
      SECRET,
      NOW_MS,
    ),
    false,
  );
  assert.equal(
    verifySasPayWebhook(BODY, signature, String(NOW_MS / 1000 - 301), SECRET, NOW_MS),
    false,
  );
});

test("a duplicate payment event cannot trigger a second subscription activation", async () => {
  const insertedKeys = new Set();
  let activationCount = 0;

  async function handleWebhook() {
    const result = await recordIdempotentWebhookEvent(async () => {
      const key = "SAS_PAY:transaction.updated:transaction-123";
      if (insertedKeys.has(key)) return undefined;
      insertedKeys.add(key);
      return { id: 1 };
    });

    if (result.status === "new") {
      activationCount += 1;
      return "processed";
    }
    return "duplicate";
  }

  assert.equal(await handleWebhook(), "processed");
  assert.equal(await handleWebhook(), "duplicate");
  assert.equal(activationCount, 1);
});