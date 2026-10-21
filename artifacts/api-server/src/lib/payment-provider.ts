export type PaymentProviderName = "SAS_PAY";

export type CreateCheckoutInput = {
  amount: string;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  returnUrl?: string;
  metadata: Record<string, string>;
};

export type CheckoutSession = {
  id: string;
  checkoutUrl: string;
  status: string;
};

export type CheckoutSessionStatus = {
  id: string;
  status: string;
  transactionId?: string;
  transactionReference?: string;
};

export type SasPayPayinFeeTier = {
  minAmount: string;
  maxAmount: string | null;
  currency: string;
  percent: string;
  fixed: string;
  floorAmount: string | null;
  capAmount: string | null;
  feeChargeMode?: "ADD_ON" | "DEDUCTED";
};

export type SasPayPayinRate = {
  countryCode: string;
  currency: string;
  networkCode: string;
  payin: {
    available: boolean;
    tiers: SasPayPayinFeeTier[];
  };
};

export interface PaymentProvider {
  readonly name: PaymentProviderName;
  isConfigured(): boolean;
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  getCheckoutSession?(checkoutId: string): Promise<CheckoutSessionStatus>;
  getMyPayinRates?(): Promise<SasPayPayinRate[]>;
}

// A credential or scope error from the merchant provider is not evidence that
// the user's app session expired. Never let an upstream 401 log the user out.
export function toPublicPaymentProviderStatus(status: number): number {
  return status === 401 || status === 403 || status >= 500 ? 502 : status;
}