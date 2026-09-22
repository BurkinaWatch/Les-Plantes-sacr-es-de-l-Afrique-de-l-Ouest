---
name: SAS Pay preparation
description: Safety boundaries and rollout decisions for the SAS Pay integration.
---

SAS Pay remains a server-only, opt-in integration. The application must keep plans inactive until pricing, currency, customer contact requirements, webhook configuration, and test credentials have been explicitly validated.

**Why:** A hosted checkout can create a real payable session, and the available user model does not contain a verified customer email. Enabling by default or inventing contact data would risk real or misdirected payments.

**How to apply:** Keep `SAS_PAY_ENABLED` false unless the rollout is intentional. Keep credentials in Replit Secrets, accept payment state only from a valid HMAC webhook or backend verification, and treat monthly/yearly renewals as separate payment intents until recurring billing is confirmed.

Webhook delivery is an at-least-once message flow: the unique event key must be recorded before business processing, and a duplicate must return successfully without re-running activation.

**Why:** Providers retry deliveries, so a valid duplicate is normal operational behavior rather than an error condition.

**How to apply:** Preserve the provider/event/transaction idempotency boundary when changing event handling or adding new payment states.