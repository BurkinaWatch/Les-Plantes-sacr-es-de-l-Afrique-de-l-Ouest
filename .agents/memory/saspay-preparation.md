---
name: SAS Pay preparation
description: Safety boundaries and rollout decisions for the SAS Pay integration.
---

SAS Pay remains a server-only, opt-in integration. The application must keep plans inactive until pricing, currency, customer contact requirements, webhook configuration, and test credentials have been explicitly validated.

**Why:** A hosted checkout can create a real payable session, and the available user model does not contain a verified customer email. Enabling by default or inventing contact data would risk real or misdirected payments.

**How to apply:** Keep `SAS_PAY_ENABLED` false unless the rollout is intentional. Keep credentials in Replit Secrets, accept payment state only from a valid HMAC webhook or backend verification, and treat monthly/yearly renewals as separate payment intents until recurring billing is confirmed.

## Tarifs confirmés

L’utilisateur confirme conserver les tarifs : **2 000 XOF par mois** et
**20 000 XOF par an**.

**Why:** The user explicitly approved these prices for preparing real payments.

**How to apply:** Preserve these amounts unless the user asks to change them.
This approval is not permission to charge a test payment.

## Cohérence des environnements

Do not enable live payments in the preview merely to remove an availability
error when the merchant's webhook points to production.

**Why:** The web preview prefers the development API; a confirmation delivered
to a different environment may not find or activate the customer's subscription.

**How to apply:** Validate that checkout creation, database records, webhook
delivery and reconciliation belong to the same intended environment before
opening real payments. A healthy production webhook alone does not validate a
preview checkout.

The provisioned secrets use `SASPAY_*`, whereas the initial integration used
`SAS_PAY_*`. Preserve compatibility with both naming conventions.

**Why:** A naming mismatch can make existing credentials appear missing and can
also prevent valid webhooks from being accepted.

**How to apply:** Check secret existence for both forms before requesting new
credentials. Keep the explicit activation flag independent of credential
presence; recognizing a key must never enable real payments automatically.

Webhook delivery is an at-least-once message flow: the unique event key must be recorded before business processing, and a duplicate must return successfully without re-running activation.

**Why:** Providers retry deliveries, so a valid duplicate is normal operational behavior rather than an error condition.

**How to apply:** Preserve the provider/event/transaction idempotency boundary when changing event handling or adding new payment states.

The documented `transaction.success` payload contains the transaction id, reference, status, amount, net amount, and currency, but not the checkout metadata or checkout-session id.

**Why:** The checkout request accepts metadata, while the official webhook example does not echo it. A webhook alone therefore cannot safely identify the local subscription attempt.

**How to apply:** Persist the checkout-session id and verify the known session through SAS Pay before activating an unmatched payment event; never guess the subscription from amount, customer, or event order alone.

Payment settlement must claim a pending attempt before activating its subscription.

**Why:** A webhook and a user-triggered checkout reconciliation can legitimately observe the same paid session at the same time.

**How to apply:** Make the payment-attempt transition conditional on `PENDING`; only the request that successfully changes that state may set the subscription active.

A rejected session must recover through explicit sign-in, never by relaxing JWT
verification or automatically replaying checkout creation after login.

**Why:** A locally restored user can outlive its server-issued token, and replaying
a payment intent without another user action risks duplicate payable sessions.

**How to apply:** Offer a return to the subscription after sign-in, isolate its
cached status by session without using bearer tokens as cache keys, and require
an explicit action before starting another checkout.