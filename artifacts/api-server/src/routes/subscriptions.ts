import { createHash } from "node:crypto";
import { Router } from "express";
import { and, desc, eq, or } from "drizzle-orm";
import { z } from "zod";
import {
  db,
  paymentAttemptsTable,
  paymentEventsTable,
  pool,
  subscriptionPlansTable,
  subscriptionsTable,
} from "@workspace/db";
import { requireActiveUserJwt } from "../lib/auth-middleware.js";
import { logger } from "../lib/logger.js";
import { SasPayProvider, SasPayProviderError } from "../lib/saspay-provider.js";
import { getSasPayWebhookSecret } from "../lib/saspay-config.js";
import { estimateSasPayCustomerFees } from "../lib/saspay-fee-estimate.js";
import {
  createSasPayInterventionNotifier,
  normalizeSasPayAdminEmail,
} from "../lib/saspay-notifications.js";
import { toPublicPaymentProviderStatus, type PaymentProvider } from "../lib/payment-provider.js";
import {
  createSasPayTestWebhookHandler,
  recordIdempotentWebhookEvent,
  verifySasPayWebhook,
} from "../lib/saspay-webhook.js";
import { sendExpoPushNotification } from "./push-tokens.js";

const provider = new SasPayProvider();
const notifySasPayIntervention = createSasPayInterventionNotifier({
  getAdminEmail: () => normalizeSasPayAdminEmail(process.env.SAS_PAY_ADMIN_EMAIL),
  findCustomerTokens: async (userId) => {
    const result = await pool.query<{ token: string }>(
      "SELECT token FROM push_tokens WHERE user_id = $1",
      [userId],
    );
    return result.rows.map(({ token }) => token);
  },
  findAdminRecipients: async (email) => {
    const result = await pool.query<{ userId: number; token: string | null }>(
      `SELECT users.id AS "userId", push_tokens.token
       FROM users
       LEFT JOIN push_tokens ON push_tokens.user_id = users.id
       WHERE LOWER(BTRIM(users.username)) = $1`,
      [email],
    );
    return {
      accountFound: result.rows.length > 0,
      tokens: result.rows.flatMap(({ token }) => (token ? [token] : [])),
    };
  },
  send: sendExpoPushNotification,
  warn: (reason, input) =>
    logger.warn(
      { customerUserId: input.customerUserId, subscriptionId: input.subscriptionId, reason },
      "SAS Pay intervention notification",
    ),
});

const createPaymentSchema = z
  .object({
    planCode: z.enum(["MONTHLY", "YEARLY"]),
    customerEmail: z.string().trim().email(),
    customerName: z.string().trim().min(1).max(120),
    returnUrl: z.string().url().optional(),
  })
  .strict();

function addPeriod(date: Date, period: string): Date {
  const result = new Date(date);
  if (period === "YEARLY") {
    result.setUTCFullYear(result.getUTCFullYear() + 1);
  } else {
    result.setUTCMonth(result.getUTCMonth() + 1);
  }
  return result;
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === "string" && value.length > 0);
}

function isSuccessfulPayment(status: string): boolean {
  return ["SUCCESS", "SUCCEEDED", "PAID", "COMPLETED"].includes(status.toUpperCase());
}

function isFailedPayment(status: string): boolean {
  return ["FAILED", "CANCELLED", "CANCELED", "EXPIRED", "DECLINED"].includes(
    status.toUpperCase(),
  );
}

type PaymentAttemptRow = typeof paymentAttemptsTable.$inferSelect;
type PaymentTransition = "SUCCEEDED" | "FAILED" | "PENDING" | "UNCHANGED";

async function settlePaymentAttempt(
  database: typeof db,
  attempt: PaymentAttemptRow,
  status: string,
  transactionId?: string,
  reference?: string,
): Promise<PaymentTransition> {
  const nextStatus = isSuccessfulPayment(status)
    ? "SUCCEEDED"
    : isFailedPayment(status)
      ? "FAILED"
      : "PENDING";
  const [claimedAttempt] = await database
    .update(paymentAttemptsTable)
    .set({
      status: nextStatus,
      providerTransactionId: transactionId ?? attempt.providerTransactionId,
      providerReference: reference ?? attempt.providerReference,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(paymentAttemptsTable.id, attempt.id),
        eq(paymentAttemptsTable.status, "PENDING"),
      ),
    )
    .returning({ id: paymentAttemptsTable.id });

  // A webhook and a reconciliation request can arrive together. Only the
  // request that changes PENDING may apply the subscription transition.
  if (!claimedAttempt) return "UNCHANGED";

  if (nextStatus === "SUCCEEDED") {
    const [subscription] = await database
      .select({
        period: subscriptionsTable.period,
      })
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.id, attempt.subscriptionId))
      .limit(1);
    const startsAt = new Date();
    await database
      .update(subscriptionsTable)
      .set({
        status: "ACTIVE",
        startsAt,
        expiresAt: addPeriod(startsAt, subscription?.period ?? "MONTHLY"),
        providerTransactionId: transactionId ?? attempt.providerTransactionId,
        providerReference: reference ?? attempt.providerReference,
        updatedAt: startsAt,
      })
      .where(eq(subscriptionsTable.id, attempt.subscriptionId));
  } else if (nextStatus === "FAILED") {
    await database
      .update(subscriptionsTable)
      .set({ status: "FAILED", updatedAt: new Date() })
      .where(eq(subscriptionsTable.id, attempt.subscriptionId));
  }

  return nextStatus;
}

export function createSubscriptionsRouter(
  database: typeof db = db,
  paymentProvider: PaymentProvider = provider,
): Router {
  const router = Router();

  router.get("/plans", async (_req, res) => {
    const ratesRequest =
      paymentProvider.isConfigured() && paymentProvider.getMyPayinRates
        ? paymentProvider.getMyPayinRates().catch((error: unknown) => {
            logger.warn(
              {
                status: error instanceof SasPayProviderError ? error.status : undefined,
                reason:
                  error instanceof SasPayProviderError
                    ? error.message
                    : "SAS Pay fee-rate request failed",
              },
              "SAS Pay fee estimates are unavailable",
            );
            return null;
          })
        : Promise.resolve(null);
    const plans = await database
      .select({
        code: subscriptionPlansTable.code,
        name: subscriptionPlansTable.name,
        description: subscriptionPlansTable.description,
        amount: subscriptionPlansTable.amount,
        currency: subscriptionPlansTable.currency,
        period: subscriptionPlansTable.period,
        active: subscriptionPlansTable.active,
      })
      .from(subscriptionPlansTable)
      .orderBy(subscriptionPlansTable.id);
    const rates = await ratesRequest;

    return res.json({
      plans: plans.map((plan) => ({
        ...plan,
        feeEstimate: rates
          ? estimateSasPayCustomerFees(plan.amount, plan.currency, rates)
          : null,
      })),
    });
  });

  router.get("/status", requireActiveUserJwt, async (req, res) => {
  const [subscription] = await database
    .select({
      id: subscriptionsTable.id,
      planCode: subscriptionPlansTable.code,
      planName: subscriptionPlansTable.name,
      period: subscriptionsTable.period,
      status: subscriptionsTable.status,
      startsAt: subscriptionsTable.startsAt,
      expiresAt: subscriptionsTable.expiresAt,
    })
    .from(subscriptionsTable)
    .innerJoin(
      subscriptionPlansTable,
      eq(subscriptionPlansTable.id, subscriptionsTable.planId),
    )
    .where(eq(subscriptionsTable.userId, req.user!.id))
    .orderBy(desc(subscriptionsTable.createdAt))
    .limit(1);

  return res.json({ subscription: subscription ?? null });
});

  router.post("/reconcile", requireActiveUserJwt, async (req, res) => {
  if (!paymentProvider.isConfigured() || !paymentProvider.getCheckoutSession) {
    void notifySasPayIntervention({
      customerUserId: req.user!.id,
      reason: "configuration",
    });
    return res.status(503).json({
      code: "PAYMENTS_NOT_CONFIGURED",
      error: "La vérification des paiements n'est pas encore disponible.",
    });
  }

  const pendingAttempts = await database
    .select()
    .from(paymentAttemptsTable)
    .where(
      and(
        eq(paymentAttemptsTable.userId, req.user!.id),
        eq(paymentAttemptsTable.provider, paymentProvider.name),
        eq(paymentAttemptsTable.status, "PENDING"),
      ),
    )
    .orderBy(desc(paymentAttemptsTable.createdAt));

  let activated = 0;
  let failed = 0;
  let interventionSubscriptionId: number | undefined;
  for (const attempt of pendingAttempts) {
    if (!attempt.providerCheckoutId) continue;

    try {
      const checkout = await paymentProvider.getCheckoutSession(attempt.providerCheckoutId);
      const checkoutStatus = checkout.status.toUpperCase();
      if (checkoutStatus === "PAID" && checkout.transactionId) {
        const transition = await settlePaymentAttempt(
          database,
          attempt,
          "SUCCESS",
          checkout.transactionId,
          checkout.transactionReference,
        );
        if (transition === "SUCCEEDED") activated += 1;
      } else if (["EXPIRED", "CANCELLED"].includes(checkoutStatus)) {
        const transition = await settlePaymentAttempt(database, attempt, "EXPIRED");
        if (transition === "FAILED") failed += 1;
      }
    } catch (error) {
      logger.warn(
        { err: error, checkoutId: attempt.providerCheckoutId, userId: req.user!.id },
        "Unable to reconcile a SAS Pay checkout session",
      );
      interventionSubscriptionId ??= attempt.subscriptionId;
    }
  }

  if (interventionSubscriptionId) {
    void notifySasPayIntervention({
      customerUserId: req.user!.id,
      subscriptionId: interventionSubscriptionId,
      reason: "verification",
    });
  }

  return res.json({
    checked: pendingAttempts.length,
    activated,
    failed,
  });
});

  router.post("/create-payment", requireActiveUserJwt, async (req, res) => {
  const parsed = createPaymentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Informations de paiement invalides." });
  }

  if (!paymentProvider.isConfigured()) {
    void notifySasPayIntervention({
      customerUserId: req.user!.id,
      reason: "configuration",
    });
    return res.status(503).json({
      code: "PAYMENTS_NOT_CONFIGURED",
      error: "Les paiements ne sont pas encore disponibles.",
    });
  }

  const [plan] = await database
    .select()
    .from(subscriptionPlansTable)
    .where(
      and(
        eq(subscriptionPlansTable.code, parsed.data.planCode),
        eq(subscriptionPlansTable.active, true),
      ),
    )
    .limit(1);

  if (!plan?.amount || !plan.currency) {
    void notifySasPayIntervention({
      customerUserId: req.user!.id,
      reason: "configuration",
    });
    return res.status(503).json({
      code: "PLAN_NOT_CONFIGURED",
      error: "Le prix de cet abonnement n'est pas encore configuré.",
    });
  }

  const [subscription] = await database
    .insert(subscriptionsTable)
    .values({
      userId: req.user!.id,
      planId: plan.id,
      provider: paymentProvider.name,
      period: plan.period,
      status: "PENDING",
    })
    .returning({ id: subscriptionsTable.id });

  if (!subscription) {
    return res.status(500).json({ error: "Impossible de créer la tentative de paiement." });
  }

  try {
    const checkout = await paymentProvider.createCheckout({
      amount: plan.amount,
      currency: plan.currency,
      customerEmail: parsed.data.customerEmail,
      customerName: parsed.data.customerName,
      description: plan.name,
      returnUrl: parsed.data.returnUrl,
      metadata: {
        subscription_id: String(subscription.id),
        plan_code: plan.code,
      },
    });

    await database
      .update(subscriptionsTable)
      .set({
        providerCheckoutId: checkout.id,
        updatedAt: new Date(),
      })
      .where(eq(subscriptionsTable.id, subscription.id));
    await database.insert(paymentAttemptsTable).values({
      userId: req.user!.id,
      subscriptionId: subscription.id,
      provider: paymentProvider.name,
      providerCheckoutId: checkout.id,
      status: "PENDING",
    });

    return res.status(201).json({
      subscriptionId: subscription.id,
      checkoutUrl: checkout.checkoutUrl,
      status: checkout.status,
    });
  } catch (error) {
    await db
      .update(subscriptionsTable)
      .set({ status: "FAILED", updatedAt: new Date() })
      .where(eq(subscriptionsTable.id, subscription.id));

    if (error instanceof SasPayProviderError) {
      void notifySasPayIntervention({
        customerUserId: req.user!.id,
        subscriptionId: subscription.id,
        reason: "configuration",
      });
      return res.status(toPublicPaymentProviderStatus(error.status)).json({
        code: "PAYMENT_PROVIDER_ERROR",
        error: error.message,
      });
    }

    logger.error({ err: error, userId: req.user!.id }, "Failed to create payment checkout");
    void notifySasPayIntervention({
      customerUserId: req.user!.id,
      subscriptionId: subscription.id,
      reason: "configuration",
    });
    return res.status(502).json({
      code: "PAYMENT_PROVIDER_ERROR",
      error: "Le service de paiement est temporairement indisponible.",
    });
  }
});

router.post("/webhook", createSasPayTestWebhookHandler(() => getSasPayWebhookSecret(process.env)), async (req, res) => {
  const rawBody = req.rawBody;
  const valid = verifySasPayWebhook(
    rawBody ?? Buffer.from(""),
    req.header("X-Webhook-Signature"),
    req.header("X-Webhook-Timestamp"),
    getSasPayWebhookSecret(process.env),
  );
  if (!valid || !rawBody) {
    return res.status(401).json({ error: "Signature webhook invalide." });
  }

  const body = asRecord(req.body);
  const data = asRecord(body.data);
  const eventType = firstString(
    req.header("X-Webhook-Event"),
    body.event,
    body.event_type,
    "transaction.updated",
  )!;
  const transactionId = firstString(
    data.transaction_id,
    data.transactionId,
    data.id,
    body.transaction_id,
    body.transactionId,
  );
  const reference = firstString(data.reference, data.external_reference, body.reference);
  const checkoutId = firstString(
    data.checkout_session_id,
    data.checkoutSessionId,
    data.checkout_id,
    data.checkoutId,
    body.checkout_session_id,
    body.checkoutSessionId,
    body.checkout_id,
    body.checkoutId,
  );
  const status = firstString(data.status, body.status, eventType) ?? eventType;
  if (!transactionId) {
    return res.status(400).json({ error: "Événement webhook incomplet." });
  }

  const payload = body;
  const payloadHash = createHash("sha256").update(rawBody).digest("hex");
  const eventResult = await recordIdempotentWebhookEvent(async () => {
    const [event] = await database
      .insert(paymentEventsTable)
      .values({
        provider: paymentProvider.name,
        eventType,
        providerTransactionId: transactionId,
        providerReference: reference,
        payloadHash,
        payload,
        processingStatus: "RECEIVED",
      })
      .onConflictDoNothing({
        target: [
          paymentEventsTable.provider,
          paymentEventsTable.eventType,
          paymentEventsTable.providerTransactionId,
        ],
      })
      .returning({ id: paymentEventsTable.id });
    return event;
  });

  if (eventResult.status === "duplicate") {
    return res.status(200).json({ received: true, duplicate: true });
  }
  const event = eventResult.event;

  try {
    const metadata = asRecord(data.metadata ?? body.metadata);
    const subscriptionId = Number(metadata.subscription_id);
    const conditions = [
      eq(paymentAttemptsTable.providerTransactionId, transactionId),
      ...(checkoutId ? [eq(paymentAttemptsTable.providerCheckoutId, checkoutId)] : []),
      ...(reference ? [eq(paymentAttemptsTable.providerReference, reference)] : []),
      ...(Number.isInteger(subscriptionId) && subscriptionId > 0
        ? [eq(paymentAttemptsTable.subscriptionId, subscriptionId)]
        : []),
    ];
    let [attempt] = await database
      .select()
      .from(paymentAttemptsTable)
      .where(or(...conditions))
      .orderBy(desc(paymentAttemptsTable.createdAt))
      .limit(1);

    // SAS Pay's documented transaction.success payload does not carry the
    // checkout metadata or checkout id. Resolve the transaction through the
    // checkout sessions created by this application before changing state.
    let verificationNeedsAttention = false;
    if (!attempt && paymentProvider.getCheckoutSession) {
      const pendingAttempts = await database
        .select()
        .from(paymentAttemptsTable)
        .where(
          and(
            eq(paymentAttemptsTable.provider, paymentProvider.name),
            eq(paymentAttemptsTable.status, "PENDING"),
          ),
        )
        .orderBy(desc(paymentAttemptsTable.createdAt));

      const matches = await Promise.all(
        pendingAttempts
          .filter((candidate) => Boolean(candidate.providerCheckoutId))
          .map(async (candidate) => {
            try {
              const checkout = await paymentProvider.getCheckoutSession!(
                candidate.providerCheckoutId!,
              );
              const checkoutStatus = checkout.status.toUpperCase();
              const transactionMatches =
                checkout.transactionId === transactionId ||
                (reference !== undefined && checkout.transactionReference === reference);
              return checkoutStatus === "PAID" && transactionMatches ? candidate : undefined;
            } catch (error) {
              verificationNeedsAttention = true;
              logger.warn(
                {
                  err: error,
                  checkoutId: candidate.providerCheckoutId,
                  transactionId,
                },
                "Unable to verify a SAS Pay checkout session",
              );
              return undefined;
            }
          }),
      );
      const matchedAttempt = matches.find(
        (candidate): candidate is NonNullable<(typeof matches)[number]> =>
          candidate !== undefined,
      );
      if (matchedAttempt) {
        attempt = matchedAttempt;
      }
    }

    if (attempt) {
      await settlePaymentAttempt(database, attempt, status, transactionId, reference);
    } else if (verificationNeedsAttention) {
      void notifySasPayIntervention({
        providerTransactionId: transactionId,
        reason: "verification",
      });
    }

    await database
      .update(paymentEventsTable)
      .set({ processingStatus: "PROCESSED", processedAt: new Date() })
      .where(eq(paymentEventsTable.id, event.id));
    return res.status(200).json({ received: true });
  } catch (error) {
    logger.error({ err: error, eventId: event.id }, "Failed to process SAS Pay webhook");
    await database
      .update(paymentEventsTable)
      .set({
        processingStatus: "FAILED",
        processingError: "Webhook processing failed",
      })
      .where(eq(paymentEventsTable.id, event.id));
    return res.status(500).json({ error: "Webhook non traité." });
  }
  });

  return router;
}

export default createSubscriptionsRouter();