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

export interface PaymentProvider {
  readonly name: PaymentProviderName;
  isConfigured(): boolean;
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  getCheckoutSession?(checkoutId: string): Promise<CheckoutSessionStatus>;
}