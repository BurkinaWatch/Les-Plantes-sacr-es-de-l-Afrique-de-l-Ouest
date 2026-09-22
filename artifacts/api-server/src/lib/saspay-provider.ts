import type {
  CheckoutSession,
  CreateCheckoutInput,
  PaymentProvider,
} from "./payment-provider.js";

const DEFAULT_API_URL = "https://api.saspay.me/api/v1";

type SasPayCheckoutResponse = {
  id?: unknown;
  checkout_url?: unknown;
  status?: unknown;
};

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

    let payload: SasPayCheckoutResponse = {};
    try {
      payload = (await response.json()) as SasPayCheckoutResponse;
    } catch {
      // The status below is enough to produce a safe provider error.
    }

    if (!response.ok) {
      throw new SasPayProviderError(
        `SAS Pay a refusé la session de paiement (${response.status}).`,
        response.status,
      );
    }

    if (
      typeof payload.id !== "string" ||
      typeof payload.checkout_url !== "string" ||
      typeof payload.status !== "string"
    ) {
      throw new SasPayProviderError(
        "La réponse SAS Pay ne contient pas une session de checkout valide.",
        502,
      );
    }

    return {
      id: payload.id,
      checkoutUrl: payload.checkout_url,
      status: payload.status,
    };
  }
}