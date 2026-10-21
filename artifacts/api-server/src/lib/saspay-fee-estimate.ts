import type { SasPayPayinRate } from "./payment-provider.js";

export type SasPayFeeEstimate = {
  minimumFee: string;
  maximumFee: string;
  totalMinimum: string;
  totalMaximum: string;
  feeChargeMode: "ADD_ON" | "DEDUCTED" | "MIXED";
  networkCount: number;
};

function decimal(value: string | null | undefined): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function amountString(value: number): string {
  return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
}

export function estimateSasPayCustomerFees(
  amount: string | null | undefined,
  currency: string | null | undefined,
  rates: SasPayPayinRate[] | null | undefined,
): SasPayFeeEstimate | null {
  const baseAmount = decimal(amount ?? undefined);
  if (baseAmount === undefined || !currency || !rates?.length) return null;

  const availableRates = rates.filter(
    (rate) =>
      rate.currency.toUpperCase() === currency.toUpperCase() && rate.payin.available,
  );
  if (!availableRates.length) return null;

  const tierCoversAmount = (tier: SasPayPayinRate["payin"]["tiers"][number]) => {
    const minimum = decimal(tier.minAmount);
    const maximum = tier.maxAmount === null ? undefined : decimal(tier.maxAmount);
    return (
      tier.currency.toUpperCase() === currency.toUpperCase() &&
      minimum !== undefined &&
      (maximum === undefined && tier.maxAmount !== null
        ? false
        : baseAmount >= minimum && (maximum === undefined || baseAmount <= maximum))
    );
  };
  if (
    availableRates.some(
      (rate) => !rate.payin.tiers.some(tierCoversAmount),
    )
  ) {
    return null;
  }

  const applicableTiers = availableRates
    .flatMap((rate) =>
      rate.payin.tiers.filter(tierCoversAmount),
    );
  if (!applicableTiers.length) return null;

  /*
   * Do not report a partial fee range when any available network has no
   * published tier for this plan amount. SAS Pay still shows its exact total
   * on the hosted payment page in that case.
   */
  const modes = new Set<"ADD_ON" | "DEDUCTED">();
  for (const tier of applicableTiers) {
    if (tier.feeChargeMode !== "ADD_ON" && tier.feeChargeMode !== "DEDUCTED") {
      return null;
    }
    modes.add(tier.feeChargeMode);
  }
  const fees = applicableTiers.map((tier) => {
    const percent = decimal(tier.percent);
    const fixed = decimal(tier.fixed);
    const floor = decimal(tier.floorAmount ?? "0");
    const cap =
      tier.capAmount === null ? undefined : decimal(tier.capAmount);
    if (
      percent === undefined ||
      fixed === undefined ||
      floor === undefined ||
      (tier.capAmount !== null && cap === undefined)
    ) {
      return null;
    }

    let fee = Math.max((baseAmount * percent) / 100 + fixed, floor);
    if (cap !== undefined) fee = Math.min(fee, cap);
    return tier.feeChargeMode === "ADD_ON" ? amountString(fee) : "0.00";
  });
  if (fees.some((fee) => fee === null)) return null;

  const numericFees = fees.map((fee) => Number(fee));
  const minimumFee = Math.min(...numericFees);
  const maximumFee = Math.max(...numericFees);
  const networkCount = new Set(
    availableRates.map((rate) => `${rate.countryCode}:${rate.networkCode}`),
  ).size;

  return {
    minimumFee: amountString(minimumFee),
    maximumFee: amountString(maximumFee),
    totalMinimum: amountString(baseAmount + minimumFee),
    totalMaximum: amountString(baseAmount + maximumFee),
    feeChargeMode: modes.size === 1 ? [...modes][0] : "MIXED",
    networkCount,
  };
}
