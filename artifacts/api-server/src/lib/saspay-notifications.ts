export type SasPayInterventionReason = "configuration" | "verification";

export type SasPayInterventionInput = {
  customerUserId?: number;
  subscriptionId?: number;
  providerTransactionId?: string;
  reason: SasPayInterventionReason;
};

export type AdminPushRecipients = {
  accountFound: boolean;
  tokens: string[];
};

type PushSender = (
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, unknown>,
) => Promise<void>;

type NotificationDependencies = {
  getAdminEmail(): string | undefined;
  findCustomerTokens(userId: number): Promise<string[]>;
  findAdminRecipients(email: string): Promise<AdminPushRecipients>;
  send: PushSender;
  warn(
    reason: "admin_not_configured" | "admin_account_missing" | "admin_push_unregistered" | "delivery_failed",
    input: SasPayInterventionInput,
  ): void;
};

export function normalizeSasPayAdminEmail(email: string | undefined): string | undefined {
  const normalized = email?.trim().toLowerCase();
  return normalized && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
    ? normalized
    : undefined;
}

function notificationText(
  audience: "customer" | "admin" | "shared",
  reason: SasPayInterventionReason,
) {
  if (audience === "admin") {
    return {
      title: "Action requise : paiement",
      body:
        reason === "configuration"
          ? "La configuration ou la création d’un paiement SAS Pay a échoué. Vérifiez le service marchand."
          : "SAS Pay n’a pas pu confirmer le statut d’un paiement. Vérifiez-le avant toute nouvelle tentative.",
    };
  }

  if (audience === "shared") {
    return {
      title: "Paiement à vérifier",
      body: "Un paiement de votre compte nécessite une vérification avant de réessayer.",
    };
  }

  return {
    title: "Paiement à vérifier",
    body:
      reason === "configuration"
        ? "Le paiement ne peut pas aboutir pour le moment. Vérifiez son état avant de recommencer."
        : "La confirmation du paiement est momentanément indisponible. Consultez votre abonnement avant de réessayer.",
  };
}

/** Routes notices only to the affected customer and configured administrator. */
export function createSasPayInterventionNotifier(dependencies: NotificationDependencies) {
  return async (input: SasPayInterventionInput): Promise<void> => {
    try {
      const adminEmail = dependencies.getAdminEmail();
      const [customerTokens, adminRecipients] = await Promise.all([
        input.customerUserId
          ? dependencies.findCustomerTokens(input.customerUserId)
          : Promise.resolve([]),
        adminEmail
          ? dependencies.findAdminRecipients(adminEmail)
          : Promise.resolve({ accountFound: false, tokens: [] }),
      ]);

      if (!adminEmail) {
        dependencies.warn("admin_not_configured", input);
      } else if (!adminRecipients.accountFound) {
        dependencies.warn("admin_account_missing", input);
      } else if (adminRecipients.tokens.length === 0) {
        dependencies.warn("admin_push_unregistered", input);
      }

      const customerSet = new Set(customerTokens);
      const adminSet = new Set(adminRecipients.tokens);
      const shared = [...customerSet].filter((token) => adminSet.has(token));
      const customerOnly = [...customerSet].filter((token) => !adminSet.has(token));
      const adminOnly = [...adminSet].filter((token) => !customerSet.has(token));
      const data = {
        type: "payment_intervention",
        reason: input.reason,
        ...(input.subscriptionId ? { subscriptionId: String(input.subscriptionId) } : {}),
        ...(input.providerTransactionId
          ? { providerTransactionId: input.providerTransactionId }
          : {}),
      };
      const customer = notificationText("customer", input.reason);
      const admin = notificationText("admin", input.reason);
      const sameAccount = notificationText("shared", input.reason);
      const deliveries: Promise<void>[] = [];

      if (customerOnly.length) {
        deliveries.push(dependencies.send(customerOnly, customer.title, customer.body, data));
      }
      if (adminOnly.length) {
        deliveries.push(
          dependencies.send(adminOnly, admin.title, admin.body, {
            ...data,
            audience: "admin",
          }),
        );
      }
      if (shared.length) {
        deliveries.push(
          dependencies.send(shared, sameAccount.title, sameAccount.body, data),
        );
      }
      await Promise.all(deliveries);
    } catch {
      // Alert failures must never block payment creation, reconciliation, or webhooks.
      // The route's reporter logs only IDs, never customer/admin email addresses.
      dependencies.warn("delivery_failed", input);
    }
  };
}
