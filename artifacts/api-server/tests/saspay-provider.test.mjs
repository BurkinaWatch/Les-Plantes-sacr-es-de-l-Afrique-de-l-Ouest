import assert from "node:assert/strict";
import test from "node:test";

import { SasPayProvider, isSasPayEnabled } from "../.test-dist/src/lib/saspay-provider.js";
import { getSasPayApiKey, getSasPayWebhookSecret } from "../.test-dist/src/lib/saspay-config.js";
import { toPublicPaymentProviderStatus } from "../.test-dist/src/lib/payment-provider.js";

test("both existing secret naming conventions work without enabling payments implicitly", () => {
  const aliases = { SASPAY_API_KEY: "alias-test-key", SASPAY_WEBHOOK_SECRET: " alias-test-secret " };
  assert.equal(getSasPayApiKey(aliases), "alias-test-key");
  assert.equal(getSasPayWebhookSecret(aliases), " alias-test-secret ");
  assert.equal(isSasPayEnabled(aliases), false);
  assert.equal(isSasPayEnabled({ ...aliases, SAS_PAY_ENABLED: "false" }), false);
  assert.equal(isSasPayEnabled({ ...aliases, SAS_PAY_ENABLED: "true" }), true);
  assert.equal(isSasPayEnabled({ SAS_PAY_ENABLED: "true" }), false);
  assert.equal(getSasPayApiKey({ ...aliases, SAS_PAY_API_KEY: "canonical-test-key" }), "canonical-test-key");
  assert.equal(getSasPayWebhookSecret({ ...aliases, SAS_PAY_WEBHOOK_SECRET: "canonical-test-secret" }), "canonical-test-secret");
});

test("upstream merchant credential failures do not masquerade as customer sign-in failures", () => {
  assert.equal(toPublicPaymentProviderStatus(401), 502);
  assert.equal(toPublicPaymentProviderStatus(403), 502);
  assert.equal(toPublicPaymentProviderStatus(503), 502);
  assert.equal(toPublicPaymentProviderStatus(409), 409);
});

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
      SASPAY_API_KEY: "sk_test_provider",
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

test("SAS Pay accepts a wrapped hosted checkout response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: {
          checkout_session: {
            checkout_id: "checkout-wrapped-123",
            checkout_url: "https://pay.saspay.me/checkout/checkout-wrapped-123",
            state: "CREATED",
          },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );

  try {
    const provider = new SasPayProvider({
      SAS_PAY_ENABLED: "true",
      SAS_PAY_API_KEY: "sk_test_provider",
    });
    assert.deepEqual(
      await provider.createCheckout({
        amount: "2000.00",
        currency: "XOF",
        customerEmail: "client@example.com",
        customerName: "Awa Sossou",
        description: "Abonnement mensuel",
        metadata: { subscription_id: "42" },
      }),
      {
        id: "checkout-wrapped-123",
        checkoutUrl: "https://pay.saspay.me/checkout/checkout-wrapped-123",
        status: "CREATED",
      },
    );
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

test("SAS Pay reads current merchant pay-in fee tiers without creating a checkout", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ input: String(input), init });
    return new Response(
      JSON.stringify([
        {
          country_code: "CI",
          currency: "XOF",
          network_code: "orange_ci",
          payin: {
            available: true,
            tiers: [
              {
                min_amount: "0.00",
                max_amount: "500000.00",
                currency: "XOF",
                percent: "2.500",
                fixed: "0.00",
                floor_amount: -1,
                cap_amount: null,
                fee_charge_mode: "ADD_ON",
              },
            ],
          },
        },
        {
          country_code: "CM",
          currency: "XAF",
          network_code: "mtn_cm",
          payin: { available: true, tiers: [] },
        },
      ]),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  try {
    const provider = new SasPayProvider({
      SAS_PAY_ENABLED: "true",
      SAS_PAY_API_KEY: "sk_test_provider",
    });
    const [rates, concurrentRates] = await Promise.all([
      provider.getMyPayinRates(),
      provider.getMyPayinRates(),
    ]);

    assert.deepEqual(rates, concurrentRates);
    assert.equal(rates.length, 2);
    assert.equal(rates[0].payin.tiers[0].feeChargeMode, "ADD_ON");
    assert.equal(rates[0].payin.tiers[0].floorAmount, null);
    assert.equal(rates[1].payin.tiers.length, 0);
    assert.equal(requests.length, 1);
    assert.equal(
      requests[0].input,
      "https://api.saspay.me/api/v1/pricing/my-rates/",
    );
    assert.equal(requests[0].init.method, "GET");
    assert.equal(requests[0].init.headers.Authorization, "Bearer sk_test_provider");
  } finally {
    globalThis.fetch = originalFetch;
  }
});