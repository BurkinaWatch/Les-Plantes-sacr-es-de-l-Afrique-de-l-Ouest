---
name: SAS Pay preparation
description: Safety boundaries and rollout decisions for the SAS Pay integration.
---

SAS Pay credentials stay server-side. When the user explicitly authorizes direct-live rollout, do not require a sandbox account or test credentials; keep the activation flag explicit, preserve the approved prices, and reconcile each checkout against SAS Pay before activating it.

**Why:** The user explicitly authorized using the merchant's existing live SAS Pay credentials. Creating a checkout opens a payable session, but does not charge the customer unless they complete it.

**How to apply:** Keep merchant keys secret; enable live payment only in the intended runtime; accept payment state only after a valid signed webhook or backend verification; never simulate a payment or assume monthly/yearly recurring billing.

## Tarifs confirmés

L’utilisateur confirme conserver les tarifs : **2 000 XOF par mois** et
**20 000 XOF par an**.

**Why:** The user explicitly approved these prices for preparing real payments.

**How to apply:** Preserve these amounts unless the user asks to change them.
This approval is not permission to charge a test payment.

## Cohérence des environnements

Do not treat webhook delivery to production as confirmation that the preview
database has been updated.

**Why:** The web preview prefers the development API, but the live merchant webhook
may point to the production API and therefore a different database.

**How to apply:** Confirm a checkout in its owning database by querying SAS Pay
with the stored checkout-session ID. When webhook and checkout databases differ,
provide a user-triggered reconciliation path instead of trusting a cross-environment
webhook or marking a subscription active from the redirect.

The provisioned secrets use `SASPAY_*`, whereas the initial integration used
`SAS_PAY_*`. Preserve compatibility with both naming conventions.

**Why:** A naming mismatch can make existing credentials appear missing and can
also prevent valid webhooks from being accepted.

**How to apply:** Check secret existence for both forms before requesting new
credentials. Keep the explicit activation flag independent of credential
presence; recognizing a key must never enable real payments automatically.

## Estimations de frais avant le paiement

Use SAS Pay's authenticated `pricing/my-rates` data only for a clearly labelled
estimate. Live rates may include available networks with no tiers and negative
numeric sentinels for optional amount bounds. Compute a range only from published
tiers that cover the subscription amount; keep the account's configured fee mode
and leave the final exact total to SAS Pay's hosted confirmation page.

**Why:** The live rate data differs from the documentation examples, and fee
handling can vary by network. Treating incomplete rate tiers as a complete range
could mislead a customer.

**How to apply:** Keep the estimate and exact hosted amount distinct in the UI.
Skip networks with no matching tier, disclose the number of compatible published
rates used, and never override `fee_charge_mode` just to make a quote.

Webhook delivery is an at-least-once message flow: the unique event key must be recorded before business processing, and a duplicate must return successfully without re-running activation.

**Why:** Providers retry deliveries, so a valid duplicate is normal operational behavior rather than an error condition.

**How to apply:** Preserve the provider/event/transaction idempotency boundary when changing event handling or adding new payment states.

The documented `transaction.success` payload contains the transaction id, reference, status, amount, net amount, and currency, but not the checkout metadata or checkout-session id.

**Why:** The checkout request accepts metadata, while the official webhook example does not echo it. A webhook alone therefore cannot safely identify the local subscription attempt.

**How to apply:** Persist the checkout-session id and verify the known session through SAS Pay before activating an unmatched payment event; never guess the subscription from amount, customer, or event order alone.

Payment settlement must claim a pending attempt before activating its subscription.

**Why:** A webhook and a user-triggered checkout reconciliation can legitimately observe the same paid session at the same time.

**How to apply:** Make the payment-attempt transition conditional on `PENDING`; only the request that successfully changes that state may set the subscription active.

## Notifications de paiements nécessitant une intervention

L’utilisateur veut avertir à la fois le client concerné et le compte
administrateur, par notification ciblée et jamais par diffusion générale.
Garder l’adresse admin uniquement dans la configuration protégée, jamais dans
le code, le dépôt, les notifications ou les journaux.

**Why:** L’utilisateur a choisi les deux destinataires; les jetons Expo sont
rattachés aux comptes, mais le projet ne dispose pas d’un rôle administrateur
ni d’une boîte de réception dédiée.

**How to apply:** Cibler le client par son compte de paiement, cibler
l’administrateur uniquement par son compte explicitement configuré, et
signaler quand ce compte ou son jeton push n’est pas inscrit. Ne jamais
diffuser les détails d’un paiement aux autres utilisateurs.

A rejected session must recover through explicit sign-in, never by relaxing JWT
verification or automatically replaying checkout creation after login.

**Why:** A locally restored user can outlive its server-issued token, and replaying
a payment intent without another user action risks duplicate payable sessions.

**How to apply:** Offer a return to the subscription after sign-in, isolate its
cached status by session without using bearer tokens as cache keys, and require
an explicit action before starting another checkout.