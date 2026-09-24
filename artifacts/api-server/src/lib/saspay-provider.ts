import type {
  CheckoutSession,
  CheckoutSessionStatus,
  CreateCheckoutInput,
  PaymentProvider,
} from "./payment-provider.js";

const DEFAULT_API_URL = "https://api.saspay.me/api/v1";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(record: JsonRecord, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return undefined;
}

function findRecord(
  value: unknown,
  predicate: (record: JsonRecord) => boolean,
  depth = 0,
): JsonRecord | undefined {
  if (depth > 5) return undefined;
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findRecord(item, predicate, depth + 1);
      if (match) return match;
    }
    return undefined;
  }
  if (!isRecord(value)) return undefined;
  if (predicate(value)) return value;
  for (const child of Object.values(value)) {
    const match = findRecord(child, predicate, depth + 1);
    if (match) return match;
  }
  return undefined;
}

function readCheckoutId(record: JsonRecord): string | undefined {
  return firstString(record, [
    "id",
    "checkout_id",
    "checkoutId",
    "checkout_session_id",
    "checkoutSessionId",
    "session_id",
    "sessionId",
    "payment_id",
    "paymentId",
    "transaction_id",
    "transactionId",
    "uuid",
    "reference",
  ]);
}

function readCheckoutUrl(record: JsonRecord): string | undefined {
  return firstString(record, [
    "checkout_url",
    "checkoutUrl",
    "checkout_link",
    "checkoutLink",
    "payment_url",
    "paymentUrl",
    "payment_link",
    "paymentLink",
    "redirect_url",
    "redirectUrl",
    "link",
    "href",
    "url",
  ]);
}

function readCheckoutStatus(record: JsonRecord): string | undefined {
  return firstString(record, ["status", "payment_status", "paymentStatus", "state"]);
}

function findTransaction(value: unknown, depth = 0): JsonRecord | undefined {
  if (depth > 5) return undefined;
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findTransaction(item, depth + 1);
      if (match) return match;
    }
    return undefined;
  }
  if (!isRecord(value)) return undefined;

  const transaction = value.transaction;
  if (isRecord(transaction)) return transaction;
  if (typeof transaction === "string" && transaction.length > 0) {
    return { id: transaction };
  }
  if (firstString(value, ["transaction_id", "transactionId"])) {
    return {
      id: firstString(value, ["transaction_id", "transactionId"]),
      reference: firstString(value, ["reference", "transaction_reference", "transactionReference"]),
    };
  }

  for (const child of Object.values(value)) {
    const match = findTransaction(child, depth + 1);
    if (match) return match;
  }
  return undefined;
}

export class SasPayProviderError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SasPayProviderError";
    this.status = status;
  }
}

export function isSasPayEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.SAS_PAY_ENABLED === "true" && Boolean(env.SAS_PAY_API_KEY?.trim());
}

export class SasPayProvider implements PaymentProvider {
  readonly name = "SAS_PAY" as const;
  private readonly apiKey: string | undefined;
  private readonly apiUrl: string;

  constructor(private readonly env: NodeJS.ProcessEnv = process.env) {
    this.apiKey = env.SAS_PAY_API_KEY?.trim() || undefined;
    this.apiUrl = (env.SAS_PAY_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");
  }

  isConfigured(): boolean {
    return isSasPayEnabled(this.env);
  }

  async createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession> {
    if (!this.isConfigured() || !this.apiKey) {
      throw new SasPayProviderError("Le paiement SAS Pay est indisponible.", 503);
    }

    const response = await fetch(`${this.apiUrl}/checkout-sessions/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: input.amount,
        currency: input.currency,
        customer_email: input.customerEmail,
        customer_name: input.customerName,
        description: input.description,
        return_url: input.returnUrl,
        metadata: input.metadata,
      }),
    });

    let payload: unknown = {};
    try {
      payload = (await response.json()) as unknown;
    } catch {
      // The status below is enough to produce a safe provider error.
    }

    if (!response.ok) {
      throw new SasPayProviderError(
        `SAS Pay a refusé la session de paiement (${response.status}).`,
        response.status,
      );
    }

    const checkout = findRecord(
      payload,
      (record) => Boolean(readCheckoutId(record) && readCheckoutUrl(record)),
    );
    const id = checkout ? readCheckoutId(checkout) : undefined;
    const url = checkout ? readCheckoutUrl(checkout) : undefined;
    if (!id || !url) {
      throw new SasPayProviderError(
        "La réponse SAS Pay ne contient pas une session de checkout valide.",
        502,
      );
    }

    return {
      id,
      checkoutUrl: url,
      status: (checkout && readCheckoutStatus(checkout)) ?? "PENDING",
    };
  }

  async getCheckoutSession(checkoutId: string): Promise<CheckoutSessionStatus> {
    if (!this.isConfigured() || !this.apiKey) {
      throw new SasPayProviderError("Le paiement SAS Pay est indisponible.", 503);
    }

    const response = await fetch(
      `${this.apiUrl}/checkout-sessions/${encodeURIComponent(checkoutId)}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(10_000),
      },
    );

    let payload: unknown = {};
    try {
      payload = (await response.json()) as unknown;
    } catch {
      // The status below is enough to produce a safe provider error.
    }

    if (!response.ok) {
      throw new SasPayProviderError(
        `SAS Pay n'a pas pu vérifier la session de paiement (${response.status}).`,
        response.status,
      );
    }

    const checkout = findRecord(
      payload,
      (record) => Boolean(readCheckoutId(record) && readCheckoutStatus(record)),
    );
    const id = checkout ? readCheckoutId(checkout) : undefined;
    const status = checkout ? readCheckoutStatus(checkout) : undefined;
    if (!id || !status) {
      throw new SasPayProviderError(
        "La réponse SAS Pay ne contient pas une session de checkout valide.",
        502,
      );
    }

    const transaction = findTransaction(checkout);

    return {
      id,
      status,
      transactionId:
        transaction && typeof transaction.id === "string" ? transaction.id : undefined,
      transactionReference:
        transaction && typeof transaction.reference === "string"
          ? transaction.reference
          : undefined,
    };
  }
}