import type {
  CheckoutSession,
  CheckoutSessionStatus,
  CreateCheckoutInput,
  PaymentProvider,
  SasPayPayinFeeTier,
  SasPayPayinRate,
} from "./payment-provider.js";
import { getSasPayApiKey } from "./saspay-config.js";

const DEFAULT_API_URL = "https://api.saspay.me/api/v1";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readNumericString(
  record: JsonRecord,
  keys: readonly string[],
): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (
      typeof value === "string" &&
      value.trim() &&
      Number.isFinite(Number(value)) &&
      Number(value) >= 0
    ) {
      return value;
    }
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
      return String(value);
    }
  }
  return undefined;
}

function readOptionalNumericString(
  record: JsonRecord,
  keys: readonly string[],
): string | null {
  const key = keys.find((candidate) => candidate in record);
  if (!key || record[key] === null || record[key] === "") return null;
  const rawValue = record[key];
  if (
    (typeof rawValue === "number" && Number.isFinite(rawValue) && rawValue < 0) ||
    (typeof rawValue === "string" &&
      rawValue.trim() !== "" &&
      Number.isFinite(Number(rawValue)) &&
      Number(rawValue) < 0)
  ) {
    return null;
  }
  const value = readNumericString(record, keys);
  if (value === undefined) {
    if (typeof rawValue === "string") {
      const trimmed = rawValue.trim();
      if (/^(?:null|none|n\/a|not applicable|unavailable|-)$/i.test(trimmed)) {
        return null;
      }
      const amountWithCurrency = trimmed.match(
        /^(\d+(?:[.,]\d+)?)(?:\s*(?:XOF|XAF|FCFA|CFA|F\s*CFA))$/i,
      );
      if (amountWithCurrency) return amountWithCurrency[1].replace(",", ".");
    }
    const valueType = Array.isArray(rawValue)
      ? "array"
      : rawValue === null
        ? "null"
        : typeof rawValue;
    throw new SasPayProviderError(
      `Le champ ${key} des tarifs SAS Pay n’est pas numérique (type ${valueType}).`,
      502,
    );
  }
  return value;
}

function parsePayinFeeTier(value: unknown, rateCurrency: string): SasPayPayinFeeTier {
  if (!isRecord(value)) {
    throw new SasPayProviderError("SAS Pay a retourné des tarifs inexploitables.", 502);
  }
  const minAmount = readNumericString(value, ["min_amount", "minAmount"]);
  const percent = readNumericString(value, ["percent"]);
  const fixed = readNumericString(value, ["fixed"]);
  const maxAmount = readOptionalNumericString(value, ["max_amount", "maxAmount"]);
  const floorAmount = readOptionalNumericString(value, ["floor_amount", "floorAmount"]);
  const capAmount = readOptionalNumericString(value, ["cap_amount", "capAmount"]);
  const feeMode = firstString(value, ["fee_charge_mode", "feeChargeMode"]);
  const currency = firstString(value, ["currency"]) ?? rateCurrency;

  if (
    minAmount === undefined ||
    percent === undefined ||
    fixed === undefined ||
    !currency ||
    (feeMode !== "ADD_ON" && feeMode !== "DEDUCTED")
  ) {
    const fieldShape = (keys: string[]) => {
      const key = keys.find((candidate) => candidate in value);
      if (!key) return `${keys[0]}:missing`;
      const fieldValue = value[key];
      if (typeof fieldValue === "string") {
        if (!fieldValue.trim()) return `${key}:empty`;
        return Number.isFinite(Number(fieldValue)) ? `${key}:numeric-string` : `${key}:other-string`;
      }
      if (typeof fieldValue === "number") {
        return Number.isFinite(fieldValue) && fieldValue >= 0
          ? `${key}:number`
          : `${key}:negative-or-invalid-number`;
      }
      return `${key}:${fieldValue === null ? "null" : Array.isArray(fieldValue) ? "array" : typeof fieldValue}`;
    };
    const invalidFields = [
      ...(minAmount === undefined ? [fieldShape(["min_amount", "minAmount"])] : []),
      ...(percent === undefined ? [fieldShape(["percent"])] : []),
      ...(fixed === undefined ? [fieldShape(["fixed"])] : []),
      ...(!currency ? [fieldShape(["currency"])] : []),
      ...(feeMode !== "ADD_ON" && feeMode !== "DEDUCTED"
        ? [fieldShape(["fee_charge_mode", "feeChargeMode"])]
        : []),
    ];
    throw new SasPayProviderError(
      `SAS Pay a retourné des tarifs incomplets (${invalidFields.join(", ")}).`,
      502,
    );
  }

  return {
    minAmount,
    maxAmount,
    currency,
    percent,
    fixed,
    floorAmount,
    capAmount,
    feeChargeMode: feeMode,
  };
}

function parseMyPayinRates(payload: unknown): SasPayPayinRate[] {
  const rateEntries = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.results)
      ? payload.results
      : isRecord(payload) && Array.isArray(payload.data)
        ? payload.data
        : undefined;
  if (!rateEntries) {
    throw new SasPayProviderError("SAS Pay a retourné un format de tarifs inattendu.", 502);
  }

  return rateEntries.flatMap((value) => {
    if (!isRecord(value) || !isRecord(value.payin)) {
      throw new SasPayProviderError("Les tarifs SAS Pay ne contiennent pas les informations de paiement attendues.", 502);
    }
    if (value.payin.available !== true) return [];

    const countryCode = firstString(value, ["country_code", "countryCode"]);
    const currency = firstString(value, ["currency"]);
    const networkCode = firstString(value, ["network_code", "networkCode"]);
    if (
      !countryCode ||
      !currency ||
      !networkCode ||
      !Array.isArray(value.payin.tiers)
    ) {
      throw new SasPayProviderError("SAS Pay a retourné des tarifs incomplets.", 502);
    }

    return [
      {
        countryCode,
        currency,
        networkCode,
        payin: {
          available: true,
          tiers: value.payin.tiers.map((tier) =>
            parsePayinFeeTier(tier, currency),
          ),
        },
      },
    ];
  });
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
  return env.SAS_PAY_ENABLED === "true" && Boolean(getSasPayApiKey(env));
}

export class SasPayProvider implements PaymentProvider {
  readonly name = "SAS_PAY" as const;
  private readonly apiKey: string | undefined;
  private readonly apiUrl: string;
  private payinRatesCache: {
    rates: SasPayPayinRate[];
    expiresAt: number;
  } | null = null;
  private payinRatesRequest: Promise<SasPayPayinRate[]> | null = null;

  constructor(private readonly env: NodeJS.ProcessEnv = process.env) {
    this.apiKey = getSasPayApiKey(env);
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
      signal: AbortSignal.timeout(15_000),
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

  async getMyPayinRates(): Promise<SasPayPayinRate[]> {
    if (!this.isConfigured() || !this.apiKey) {
      throw new SasPayProviderError("Le paiement SAS Pay est indisponible.", 503);
    }

    if (this.payinRatesCache && this.payinRatesCache.expiresAt > Date.now()) {
      return this.payinRatesCache.rates;
    }
    if (this.payinRatesRequest) return this.payinRatesRequest;

    this.payinRatesRequest = this.fetchMyPayinRates()
      .then((rates) => {
        this.payinRatesCache = { rates, expiresAt: Date.now() + 60_000 };
        return rates;
      })
      .finally(() => {
        this.payinRatesRequest = null;
      });
    return this.payinRatesRequest;
  }

  private async fetchMyPayinRates(): Promise<SasPayPayinRate[]> {
    const response = await fetch(`${this.apiUrl}/pricing/my-rates/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8_000),
    });

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new SasPayProviderError(
        "SAS Pay n’a pas renvoyé les tarifs de paiement.",
        response.status || 502,
      );
    }

    if (!response.ok) {
      throw new SasPayProviderError(
        `SAS Pay n’a pas pu fournir les tarifs (${response.status}).`,
        response.status,
      );
    }

    return parseMyPayinRates(payload);
  }
}