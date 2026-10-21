import { and, desc, eq, gt, isNull, lte, or, sql } from "drizzle-orm";

export const TRIAL_DURATION_MS = 3 * 24 * 60 * 60 * 1000;

export type TrialAccess = {
  trialStartedAt: Date;
  trialEndsAt: Date;
  trialActive: boolean;
  subscriptionActive: boolean;
  hasAccess: boolean;
};

export function evaluateTrialAccess(
  trialStartedAt: Date,
  subscriptionActive: boolean,
  now = new Date(),
): TrialAccess {
  const trialEndsAt = new Date(trialStartedAt.getTime() + TRIAL_DURATION_MS);
  const trialActive =
    now.getTime() >= trialStartedAt.getTime() &&
    now.getTime() < trialEndsAt.getTime();

  return {
    trialStartedAt,
    trialEndsAt,
    trialActive,
    subscriptionActive,
    hasAccess: subscriptionActive || trialActive,
  };
}

/**
 * Starts an existing account's trial atomically on its first authenticated
 * subscription-status request. New accounts set this timestamp at registration.
 */
export async function getTrialAccess(userId: number): Promise<TrialAccess | null> {
  const {
    db,
    subscriptionsTable,
    usersTable,
  } = await import("@workspace/db");

  let [user] = await db
    .update(usersTable)
    .set({
      trialStartedAt: sql`NOW()`,
    })
    .where(
      and(
        eq(usersTable.id, userId),
        isNull(usersTable.trialStartedAt),
      ),
    )
    .returning({ trialStartedAt: usersTable.trialStartedAt });

  if (!user) {
    [user] = await db
      .select({ trialStartedAt: usersTable.trialStartedAt })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);
  }

  if (!user?.trialStartedAt) return null;

  const now = new Date();
  const [activeSubscription] = await db
    .select({ id: subscriptionsTable.id })
    .from(subscriptionsTable)
    .where(
      and(
        eq(subscriptionsTable.userId, userId),
        eq(subscriptionsTable.status, "ACTIVE"),
        or(
          isNull(subscriptionsTable.startsAt),
          lte(subscriptionsTable.startsAt, now),
        ),
        or(
          isNull(subscriptionsTable.expiresAt),
          gt(subscriptionsTable.expiresAt, now),
        ),
      ),
    )
    .orderBy(desc(subscriptionsTable.createdAt))
    .limit(1);

  return evaluateTrialAccess(user.trialStartedAt, Boolean(activeSubscription), now);
}
