import assert from "node:assert/strict";
import test from "node:test";

import { estimateSasPayCustomerFees } from "../.test-dist/src/lib/saspay-fee-estimate.js";

function rate(countryCode, networkCode, feeChargeMode, percent, fixed = "0", floor = "0") {
  return {
    countryCode,
    currency: "XOF",
    networkCode,
    payin: {
      available: true,
      tiers: [
        {
          minAmount: "0.00",
          maxAmount: "500000.00",
          currency: "XOF",
          percent,
          fixed,
          floorAmount: floor,
          capAmount: null,
          feeChargeMode,
        },
      ],
    },
  };
}

test("the estimate includes customer-paid rate ranges and leaves merchant-deducted fees out of total", () => {
  const estimate = estimateSasPayCustomerFees("2000.00", "XOF", [
    rate("CI", "orange_ci", "ADD_ON", "2.500", "0.00", "50.00"),
    rate("BJ", "mtn_bj", "ADD_ON", "1.500", "2.00"),
    rate("BF", "orange_bf", "DEDUCTED", "3.000"),
    {
      ...rate("CM", "mtn_cm", "ADD_ON", "2.000"),
      currency: "XAF",
      payin: {
        available: true,
        tiers: [
          {
            minAmount: "0",
            maxAmount: null,
            currency: "XAF",
            percent: "2",
            fixed: "0",
            floorAmount: null,
            capAmount: null,
            feeChargeMode: "ADD_ON",
          },
        ],
      },
    },
  ]);

  assert.deepEqual(estimate, {
    minimumFee: "0.00",
    maximumFee: "50.00",
    totalMinimum: "2000.00",
    totalMaximum: "2050.00",
    feeChargeMode: "MIXED",
    networkCount: 3,
  });
});

test("fee estimates respect amount tiers, fixed fees, floors, and caps", () => {
  const estimate = estimateSasPayCustomerFees("20000.00", "XOF", [
    {
      ...rate("CI", "orange_ci", "ADD_ON", "2.500", "0.00", "50.00"),
      payin: {
        available: true,
        tiers: [
          {
            minAmount: "10000",
            maxAmount: null,
            currency: "XOF",
            percent: "2.5",
            fixed: "0",
            floorAmount: "50",
            capAmount: "400",
            feeChargeMode: "ADD_ON",
          },
        ],
      },
    },
    {
      ...rate("BJ", "mtn_bj", "ADD_ON", "3.000", "5.00"),
      payin: {
        available: true,
        tiers: [
          {
            minAmount: "0",
            maxAmount: "19999",
            currency: "XOF",
            percent: "3",
            fixed: "5",
            floorAmount: null,
            capAmount: null,
            feeChargeMode: "ADD_ON",
          },
        ],
      },
    },
  ]);

  assert.equal(estimate?.minimumFee, "400.00");
  assert.equal(estimate?.maximumFee, "400.00");
  assert.equal(estimate?.totalMinimum, "20400.00");
  assert.equal(estimate?.totalMaximum, "20400.00");
  assert.equal(estimate?.networkCount, 1);
});

test("the estimate is unavailable instead of guessing when fee mode or eligible rates are missing", () => {
  const missingMode = rate("CI", "orange_ci", "ADD_ON", "2.5");
  missingMode.payin.tiers[0].feeChargeMode = undefined;
  assert.equal(
    estimateSasPayCustomerFees("2000.00", "XOF", [missingMode]),
    null,
  );
  const outsideAmountTier = rate("CI", "orange_ci", "ADD_ON", "2.5");
  outsideAmountTier.payin.tiers[0].minAmount = "2500.00";
  assert.equal(
    estimateSasPayCustomerFees("2000.00", "XOF", [outsideAmountTier]),
    null,
  );
  const differentCurrency = rate("CI", "orange_ci", "ADD_ON", "2.5");
  differentCurrency.currency = "XAF";
  differentCurrency.payin.tiers[0].currency = "XAF";
  assert.equal(
    estimateSasPayCustomerFees("2000.00", "XOF", [differentCurrency]),
    null,
  );
  const missingNetworkTier = rate("BF", "orange_bf", "ADD_ON", "2.5");
  missingNetworkTier.payin.tiers = [];
  assert.equal(
    estimateSasPayCustomerFees("2000.00", "XOF", [
      rate("CI", "orange_ci", "ADD_ON", "2.5"),
      missingNetworkTier,
    ]),
    null,
  );
});
