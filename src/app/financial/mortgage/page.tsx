"use client";
import React, { useState } from "react";
import FormattedNumberInput from "@/components/FormattedInput";
import Breadcrumb from "@/components/BreadCrumbs";

const MortgageCalculator = () => {
  const [showOtherCost, setShowOtherCost] = useState(false);

  const [homePrice, setHomePrice] = useState("400,000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("7.03");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("1,500");
  const [PMIInsurance, setPMIInsurance] = useState("0");
  const [HOAFee, setHOAFee] = useState("0");

  const homePriceNumber = strToNumber(homePrice);
  const downPayment = homePriceNumber * (strToNumber(downPaymentPercent) / 100);
  const loanAmount = homePriceNumber - downPayment;
  const monthlyInterestRate = strToNumber(interestRate) / 1200; // Divide by 12 months and 100 to get a decimal
  const numberOfPayments = strToNumber(loanTerm) * 12;
  const monthlyPropertyTax =
    (homePriceNumber * (strToNumber(propertyTaxRate) / 100)) / 12;
  const monthlyHomeInsurance = strToNumber(homeInsurance) / 12;
  const monthlyPMIInsurance = strToNumber(PMIInsurance) / 12;
  const monthlyHOAFee = strToNumber(HOAFee);

  // Monthly mortgage payment calculation using the formula:
  // M = P [r(1+r)^n] / [(1+r)^n – 1]
  const monthlyMortgagePayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const monthlyTotalPayment =
    monthlyMortgagePayment +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyPMIInsurance +
    monthlyHOAFee;

  return (
    <>
      <div className="flex min-h-screen flex-col items-center sm:p-6">
        <div className="bg-white">
          <Breadcrumb className="" />
          <div className="py-4 mx-4 mt-1 sm:mt-4 text-2xl sm:mx-0 sm:text-3xl border-b mb-8 sm:mb-8 items-center justify-center">
            Mortgage Calculator
          </div>

          <div className="mx-6 border-b grid grid-cols-1 sm:mx-0  sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="sm:border-r space-y-10 mb-10 sm:pr-10">
              <section className="space-y-10">
                {/* Toggle button for showing Other Tax & Cost section */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOtherCost}
                    onChange={() => setShowOtherCost(!showOtherCost)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {showOtherCost
                      ? "Hide Other Tax & Cost"
                      : "Show Other Tax & Cost"}
                  </span>
                </label>

                <div className="space-y-6">
                  <h2>Loan Details</h2>
                  <FormattedNumberInput
                    value={homePrice}
                    isCurrency={true}
                    label="Home Price"
                    onValueChange={setHomePrice}
                  />
                  <FormattedNumberInput
                    value={downPaymentPercent}
                    label="Down Payment (%)"
                    onValueChange={setDownPaymentPercent}
                  />
                  <div className="flex space-x-6">
                    <FormattedNumberInput
                      value={loanTerm}
                      label="Loan Term (years)"
                      onValueChange={setLoanTerm}
                    />
                    <FormattedNumberInput
                      value={interestRate}
                      label="Interest Rate (%)"
                      onValueChange={setInterestRate}
                    />
                  </div>
                </div>

                {showOtherCost && (
                  <div className="space-y-6">
                    <h2>Other Tax & Cost</h2>
                    <FormattedNumberInput
                      value={propertyTaxRate}
                      label="Property Taxes (% yearly)"
                      onValueChange={setPropertyTaxRate}
                    />
                    <FormattedNumberInput
                      value={homeInsurance}
                      isCurrency={true}
                      label="Home Insurance (yearly)"
                      onValueChange={setHomeInsurance}
                    />
                    <FormattedNumberInput
                      value={PMIInsurance}
                      isCurrency={true}
                      label="PMI Insurance (yearly)"
                      onValueChange={setPMIInsurance}
                    />
                    <FormattedNumberInput
                      value={HOAFee}
                      isCurrency={true}
                      label="HOA Fee (monthly)"
                      onValueChange={setHOAFee}
                    />
                  </div>
                )}
              </section>
            </div>

            <div className="bg-white mb-10 rounded-lg flex">
              <div className="flex flex-col pr-4 space-y-6">
                <div className="bg-white border-gray-400 rounded-lg w-full">
                  <p className="text-sm">Monthly Total Out-of-pocket Payment</p>
                  <p className="text-3xl">
                    <span className="text-sm">$ </span>
                    {formatCurrency(monthlyTotalPayment)}
                  </p>
                </div>
                <div className="bg-white w-full">
                  <p className="text-sm">Monthly Mortgage Payment</p>
                  <p className="text-xl">
                    <span className="text-sm">$ </span>
                    {formatCurrency(monthlyMortgagePayment)}
                  </p>
                </div>
                {showOtherCost && (
                  <>
                    <div className="bg-white w-full">
                      <p className="text-sm">Monthly Property Tax</p>
                      <p className="text-xl">
                        <span className="text-sm">$ </span>
                        {formatCurrency(monthlyPropertyTax)}
                      </p>
                    </div>
                    <div className="bg-white w-full">
                      <p className="text-sm">Monthly Home Insurance</p>
                      <p className="text-xl">
                        <span className="text-sm">$ </span>
                        {formatCurrency(monthlyHomeInsurance)}
                      </p>
                    </div>
                    <div className="bg-white w-full">
                      <p className="text-sm">Monthly PMI Insurance</p>
                      <p className="text-xl">
                        <span className="text-sm">$ </span>
                        {formatCurrency(monthlyPMIInsurance)}
                      </p>
                    </div>
                    <div className="bg-white w-full">
                      <p className="text-sm">Monthly HOA Fee</p>
                      <p className="text-xl">
                        <span className="text-sm">$ </span>
                        {formatCurrency(monthlyHOAFee)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Function to convert formatted string to number for calculations
function strToNumber(str: string) {
  return Number(str.replace(/,/g, ""));
}

// Function to convert number to formatted currency string for display
function formatCurrency(num: number) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default MortgageCalculator;
