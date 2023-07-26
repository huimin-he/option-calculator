"use client";

import React, { useState } from "react";
import FormattedNumberInput from "@/components/FormattedInput";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("400,000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("7.03");
  const [propertyTaxes, setPropertyTaxes] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("1,500");
  const [pmiInsurance, setPmiInsurance] = useState("0");
  const [hoaFee, setHoaFee] = useState("0");
  const [otherCosts, setOtherCosts] = useState("4,000");

  // Parse input values
  const P =
    strToNumber(homePrice) * (1 - strToNumber(downPaymentPercent) / 100); // Loan principal
  const r = strToNumber(interestRate) / 100 / 12; // Monthly interest rate
  const n = strToNumber(loanTerm) * 12; // Number of payments

  // Compute monthly mortgage payment using the formula: P*(r*(1+r)^n) / ((1+r)^n - 1)
  const monthlyMortgagePayment =
    (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  // Compute other monthly costs
  const monthlyPropertyTaxes =
    (strToNumber(homePrice) * strToNumber(propertyTaxes)) / 100 / 12;
  const monthlyHomeInsurance = strToNumber(homeInsurance) / 12;
  const monthlyPmiInsurance = strToNumber(pmiInsurance) / 12;
  const monthlyHoaFee = strToNumber(hoaFee) / 12;
  const monthlyOtherCosts = strToNumber(otherCosts) / 12;

  // Compute total monthly out-of-pocket
  const monthlyTotal =
    monthlyMortgagePayment +
    monthlyPropertyTaxes +
    monthlyHomeInsurance +
    monthlyPmiInsurance +
    monthlyHoaFee +
    monthlyOtherCosts;

  // Compute total mortgage payments and total interest
  const totalMortgagePayments = monthlyMortgagePayment * n;
  const totalInterest = totalMortgagePayments - P;

  // Compute mortgage payoff date
  const date = new Date();
  const payoffDate = new Date(
    date.setFullYear(date.getFullYear() + Number(loanTerm))
  );

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white shadow-lg rounded-lg py-10 px-10">
        <div className="bg-blue-600 rounded-t-lg text-center text-white py-4 px-4 text-2xl sm:text-3xl font-bold sm:px-4 sm:py-4 items-center justify-center -mx-10 -mt-10">
          Mortgage Calculator
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-24">
          {/* Add input fields for the different parameters */}
          <section className="space-y-10">
            <div className="space-y-3">
              <h2>Mortgage Details</h2>
              <FormattedNumberInput
                value={homePrice}
                isCurrency={true}
                label="Home Price"
                onValueChange={(value) => setHomePrice(value)}
              />
              <FormattedNumberInput
                value={downPaymentPercent}
                label="Down Payment Percentage"
                onValueChange={(value) => setDownPaymentPercent(value)}
              />
              <FormattedNumberInput
                value={loanTerm}
                label="Loan Term (Years)"
                onValueChange={(value) => setLoanTerm(value)}
              />
              <FormattedNumberInput
                value={interestRate}
                label="Interest Rate"
                onValueChange={(value) => setInterestRate(value)}
              />
            </div>

            <div className="space-y-3">
              <h2>Annual Costs</h2>
              <FormattedNumberInput
                value={propertyTaxes}
                label="Property Taxes (%)"
                onValueChange={(value) => setPropertyTaxes(value)}
              />
              <FormattedNumberInput
                value={homeInsurance}
                isCurrency={true}
                label="Home Insurance"
                onValueChange={(value) => setHomeInsurance(value)}
              />
              <FormattedNumberInput
                value={pmiInsurance}
                isCurrency={true}
                label="PMI Insurance"
                onValueChange={(value) => setPmiInsurance(value)}
              />
              <FormattedNumberInput
                value={hoaFee}
                isCurrency={true}
                label="HOA Fee"
                onValueChange={(value) => setHoaFee(value)}
              />
              <FormattedNumberInput
                value={otherCosts}
                isCurrency={true}
                label="Other Costs"
                onValueChange={(value) => setOtherCosts(value)}
              />
            </div>
          </section>

          {/* Display the computed values */}
          <div>
            <div className="font-bold text-lg sm:mt-4 sm:my-4">
              Mortgage Summary
            </div>
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-700 font">
                Monthly Mortgage Payment
              </p>
              <p className="text-lg font-bold ">
                ${monthlyMortgagePayment.toFixed(2)} USD
              </p>
            </div>
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-700 font">
                Total Monthly Out-of-Pocket
              </p>
              <p className="text-lg font-bold ">
                ${monthlyTotal.toFixed(2)} USD
              </p>
            </div>
            {/* <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-700 font">
                Total of 360 Mortgage Payments
              </p>
              <p className="text-lg font-bold ">
                ${totalMortgagePayments.toFixed(2)} USD
              </p>
            </div>
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-700 font">Total Interest</p>
              <p className="text-lg font-bold ">
                ${totalInterest.toFixed(2)} USD
              </p>
            </div> */}
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-sm text-gray-700 font">Mortgage Payoff Date</p>
              <p className="text-lg font-bold ">
                {payoffDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function strToNumber(str: string) {
  return Number(str.replace(/,/g, ""));
}

export default MortgageCalculator;
