import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createServer } from "node:http";
import express from "express";
import test from "node:test";
import { createSasPayTestWebhookHandler } from "../.test-dist/src/lib/saspay-webhook.js";

const SECRET = "isolated-webhook-test-secret";

async function withReceiver(callback) {
  let businessCalls = 0;
  const app = express();
  app.use(express.json({ verify(req, _res, body) { req.rawBody = body; } }));
  app.post("/webhook", createSasPayTestWebhookHandler(() => SECRET), (_req, res) => {
    businessCalls++;
    res.status(202).json({ nextHandler: true });
  });
  const server = createServer(app);
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const post = async ({
    event = "webhook.test", signed = true,
    timestamp = String(Math.floor(Date.now() / 1000)),
    tampered = false, headerEvent = event,
  } = {}) => {
    const body = JSON.stringify({ event, data: {} });
    const headers = { "Content-Type": "application/json", "X-Webhook-Event": headerEvent };
    if (signed) {
      headers["X-Webhook-Timestamp"] = timestamp;
      headers["X-Webhook-Signature"] = createHmac("sha256", SECRET).update(`${timestamp}.${body}`).digest("hex");
    }
    return fetch(`http://127.0.0.1:${server.address().port}/webhook`, {
      method: "POST", headers, body: tampered ? `${body} ` : body,
    });
  };
  try { await callback({ post, businessCalls: () => businessCalls }); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test("a signed non-financial SAS Pay test is acknowledged without entering payment processing", async () => {
  await withReceiver(async ({ post, businessCalls }) => {
    const response = await post();
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { received: true, test: true });
    assert.equal(businessCalls(), 0);
  });
});

test("unsigned, tampered or stale connectivity tests never bypass webhook authentication", async () => {
  await withReceiver(async ({ post, businessCalls }) => {
    for (const options of [
      { signed: false },
      { tampered: true },
      { timestamp: String(Math.floor(Date.now() / 1000) - 600) },
    ]) {
      assert.equal((await post(options)).status, 401);
    }
    assert.equal(businessCalls(), 0);
  });
});

test("transaction events continue to the original handler even if the event header says webhook.test", async () => {
  await withReceiver(async ({ post, businessCalls }) => {
    const response = await post({ event: "transaction.success", headerEvent: "webhook.test" });
    assert.equal(response.status, 202);
    assert.equal(businessCalls(), 1);
  });
});
