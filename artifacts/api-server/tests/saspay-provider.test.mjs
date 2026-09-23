import assert from "node:assert/strict";
import test from "node:test";

import { SasPayProvider } from "../.test-dist/src/lib/saspay-provider.js";

test("SAS Pay creates a hosted checkout with the documented request shape", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ input: String(input), init });
    return new Response(
      JSON.stringify({
        id: "checkout-123",
        checkout_url: "https://pay.saspay.me/checkout/checkout-123",
        status: "PENDING",
      }),
      { status: 201, headers: { "content-type": "application/json" } },
    );
  };

  try {
    const provider = new SasPayProvider({
      SAS_PAY_ENABLED: "true",
      SAS_PAY_API_KEY: "sk_test_provider",
    });
    const checkout = await provider.createCheckout({
      amount: "2000.00",
      currency: "XOF",
      customerEmail: "client@example.com",
      customerName: "Awa Sossou",
      description: "Abonnement mensuel",
      returnUrl: "https://example.com/return",
      metadata: { subscription_id: "42" },
    });

    assert.deepEqual(checkout, {
      id: "checkout-123",
      checkoutUrl: "https://pay.saspay.me/checkout/checkout-123",
      status: "PENDING",
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].input, "https://api.saspay.me/api/v1/checkout-sessions/");
    assert.equal(requests[0].init.method, "POST");
    assert.equal(requests[0].init.headers.Authorization, "Bearer sk_test_provider");
    assert.deepEqual(JSON.parse(requests[0].init.body), {
      amount: "2000.00",
      currency: "XOF",
      customer_email: "client@example.com",
      customer_name: "Awa Sossou",
      description: "Abonnement mensuel",
      return_url: "https://example.com/return",
      metadata: { subscription_id: "42" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("SAS Pay resolves the transaction attached to a paid checkout session", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        id: "checkout-123",
        status: "PAID",
        transaction: {
          id: "transaction-123",
          reference: "TXN-2026-000456",
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );

  try {
    const provider = new SasPayProvider({
      SAS_PAY_ENABLED: "true",
      SAS_PAY_API_KEY: "sk_test_provider",
    });
    assert.deepEqual(await provider.getCheckoutSession("checkout-123"), {
      id: "checkout-123",
      status: "PAID",
      transactionId: "transaction-123",
      transactionReference: "TXN-2026-000456",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});