export type PaymentAttemptForSettlement = {
  id: number;
  subscriptionId: number;
  providerTransactionId: string | null;
  providerReference: string | null;
};

type AttemptUpdate = {
  status: "SUCCEEDED" | "FAILED" | "PENDING";
  providerTransactionId: string | null;
  providerReference: string | null;
  updatedAt: Date;
};

type ActiveSubscriptionUpdate = {
  status: "ACTIVE";
  startsAt: Date;
  expiresAt: Date;
  providerTransactionId: string | null;
  providerReference: string | null;
  updatedAt: Date;
};

export interface PaymentSettlementOperations {
  claimPendingAttempt(attemptId: number, update: AttemptUpdate): Promise<boolean>;
  getSubscriptionPeriod(subscriptionId: number): Promise<string | undefined>;
  activateSubscription(
    subscriptionId: number,
    update: ActiveSubscriptionUpdate,
  ): Promise<void>;
  failSubscription(subscriptionId: number, updatedAt: Date): Promise<void>;
}

export interface PaymentSettlementStore extends PaymentSettlementOperations {
  transaction<T>(
    operation: (transaction: PaymentSettlementOperations) => Promise<T>,
  ): Promise<T>;
}

export type PaymentTransition = "SUCCEEDED" | "FAILED" | "PENDING" | "UNCHANGED";

function addPeriod(date: Date, period: string): Date {
  const result = new Date(date);
  if (period === "YEARLY") {
    result.setUTCFullYear(result.getUTCFullYear() + 1);
  } else {
    result.setUTCMonth(result.getUTCMonth() + 1);
  }
  return result;
}

function isSuccessfulPayment(status: string): boolean {
  return ["SUCCESS", "SUCCEEDED", "PAID", "COMPLETED"].includes(status.toUpperCase());
}

function isFailedPayment(status: string): boolean {
  return ["FAILED", "CANCELLED", "CANCELED", "EXPIRED", "DECLINED"].includes(
    status.toUpperCase(),
  );
}

/**
 * Apply payment-attempt and subscription changes atomically. Repeated events
 * only transition a still-pending payment attempt.
 */
export async function settlePaymentAttempt(
  store: PaymentSettlementStore,
  attempt: PaymentAttemptForSettlement,
  status: string,
  transactionId?: string,
  reference?: string,
  now = new Date(),
): Promise<PaymentTransition> {
  const nextStatus = isSuccessfulPayment(status)
    ? "SUCCEEDED"
    : isFailedPayment(status)
      ? "FAILED"
      : "PENDING";

  return store.transaction(async (transaction) => {
    const claimed = await transaction.claimPendingAttempt(attempt.id, {
      status: nextStatus,
      providerTransactionId: transactionId ?? attempt.providerTransactionId,
      providerReference: reference ?? attempt.providerReference,
      updatedAt: now,
    });

    if (!claimed) return "UNCHANGED";

    if (nextStatus === "SUCCEEDED") {
      const period = await transaction.getSubscriptionPeriod(attempt.subscriptionId);
      await transaction.activateSubscription(attempt.subscriptionId, {
        status: "ACTIVE",
        startsAt: now,
        expiresAt: addPeriod(now, period ?? "MONTHLY"),
        providerTransactionId: transactionId ?? attempt.providerTransactionId,
        providerReference: reference ?? attempt.providerReference,
        updatedAt: now,
      });
    } else if (nextStatus === "FAILED") {
      await transaction.failSubscription(attempt.subscriptionId, now);
    }

    return nextStatus;
  });
}
