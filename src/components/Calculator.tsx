"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";
import { Chart, registerables } from "chart.js";
import FormattedNumberInput from "./FormattedInput";
import FloatingInput from "./FloatingInput";

Chart.register(...registerables);

const OptionTaxCalculator = () => {
  const [optionType, setOptionType] = useState("ISO");
  const [quantity, setQuantity] = useState("10,000");
  const [income, setIncome] = useState("150,000");
  const [strikePrice, setStrikePrice] = useState("5");
  const [valuePerShare, setValuePerShare] = useState("20");
  const [filingStatus, setFilingStatus] = useState("Single");
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based
  const year = date.getFullYear();

  const [exerciseDate, setExerciseDate] = useState(`${year}-${month}-${day}`);

  // TODO: implement the logic for tax calculations based on the inputs
  const AMT_EXEMPTION_SINGLE = 81300; // 2023 figure, update as needed
  const AMT_EXEMPTION_MARRIED = 126500; // 2023 figure, update as needed
  const AMT_RATE1 = 0.26; // 26% up to AMT income of $197,900 for 2021
  const AMT_RATE2 = 0.28; // 28% over $197,900 AMT income for 2021
  const AMT_RATE1_MAX = 220700; // for 2021, update as needed

  // ... rest of OptionTaxCalculator component ...

  const exerciseCost = strToNumber(quantity) * strToNumber(strikePrice);

  // The cost is the "preference item" for AMT calculation
  let preferenceItem =
    strToNumber(quantity) *
    (strToNumber(valuePerShare) - strToNumber(strikePrice));

  let amtExemption =
    filingStatus === "Single" ? AMT_EXEMPTION_SINGLE : AMT_EXEMPTION_MARRIED;

  // Compute AMT Taxable Income (AMTI)
  let amti = strToNumber(income) + preferenceItem - amtExemption;

  // AMT tax is the larger of AMT_RATE1 or AMT_RATE2 applied to the AMTI
  let amtTax = 0;
  if (amti > 0) {
    if (amti <= AMT_RATE1_MAX) {
      amtTax = amti * AMT_RATE1;
    } else {
      amtTax = AMT_RATE1_MAX * AMT_RATE1 + (amti - AMT_RATE1_MAX) * AMT_RATE2;
    }
  }

  // The tax to be paid today is the larger of the regular tax or AMT tax
  let todayTax = 0;

  // For simplicity, let's assume end of year tax is the same as today's tax
  let regularTax = getRegularTax(strToNumber(income), filingStatus);
  let endOfYearTax = Math.max(regularTax, amtTax); // this is likely an oversimplification
  let additionalTax = Math.max(endOfYearTax - regularTax, 0);

  // console.log("preferenceItem", preferenceItem);
  // console.log("amtExemption", amtExemption);
  // console.log("amti", amti);
  // console.log("amtTax", amtTax);
  // console.log("regularTax", regularTax);

  const options = {
    scales: {
      y: {
        offset: false, // Enable the offset option
        ticks: {
          callback: function (value: number | string) {
            return `$${formatCurrency(Number(value))}`;
          },
          stepSize: 10000,
          maxTicksLimit: 6,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend for this example
      },
    },
    layout: {
      padding: {
        top: 20, // Set the top padding to create a margin
        bottom: 0,
        right: 20,
      },
    },
  };

  const data = {
    labels: ["Exercise cost", "End of year tax"],
    datasets: [
      {
        label: "Tax",
        data: [exerciseCost, additionalTax],
      },
    ],
  };

  return (
    <>
      <div className="text-3xl sm:text-3xl font-bold sm:mt-4 sm:px-4 sm:my-4 items-center justify-center">
        FY 2023 Employee Option Tax Estimate
      </div>

      <div className="grid grid-cols-1 sm:flex gap-4">
        <div className="bg-slate-100 px-5 py-3 rounded-lg">
          <section className="space-y-1">
            <label
              htmlFor="default-input"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Option Details
            </label>

            {/* <div>
              <select
                value={optionType}
                onChange={(e) => setOptionType(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="ISO">ISO</option>
                <option value="NSO">NSO</option>
              </select>
            </div> */}

            <div>
              <FormattedNumberInput
                value={quantity}
                label="Exercise Quantity"
                onValueChange={function (value: string): void {
                  setQuantity(value);
                }}
              />
            </div>
            <div>
              <FormattedNumberInput
                value={strikePrice}
                isCurrency={true}
                label="Strike Price"
                onValueChange={function (value: string): void {
                  setStrikePrice(value);
                }}
              />
            </div>

            <div>
              <FormattedNumberInput
                value={valuePerShare}
                isCurrency={true}
                label="Per Share Value (409A)"
                onValueChange={function (value: string): void {
                  setValuePerShare(value);
                }}
              />
            </div>

            <label
              htmlFor="default-input"
              className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Personal Details
            </label>
            <FormattedNumberInput
              value={income}
              isCurrency={true}
              label="Taxable Income"
              onValueChange={function (value: string): void {
                setIncome(value);
              }}
            />
            <div className="relative">
              <select
                id="floating_outlined"
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
              <label
                htmlFor="floating_outlined"
                className="pointer-events-none absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4  left-1"
              >
                {"Filing Status"}
              </label>
            </div>

            {/* <div>
              <label
                htmlFor="default-input"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Exercising Date
              </label>
              <input
                id="default-input"
                type="date"
                value={exerciseDate}
                onChange={(e) => setExerciseDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div> */}
          </section>
        </div>

        <div className="bg-slate-100 px-3 py-3 rounded-lg">
          <div className="text-3xl sm:text-3xl font-bold sm:mt-4 sm:my-4">
            Option Tax Summary
          </div>
          <div className="flex w-full shrink-0">
            <Bar data={data} options={options} />
          </div>
          <div className="flex flex-col sm:w-full pr-4">
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-gray-700 font">
                Cost of your option exercise:
              </p>
              <p className="font-bold ">${formatCurrency(exerciseCost)} USD</p>
            </div>
            {/* <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-gray-700">
                Taxes withheld on the day of the exercise:
              </p>
              <p className="font-bold">${formatCurrency(todayTax)} USD</p>
            </div> */}
            <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
              <p className="text-gray-700">
                Additional AMT at the end of the calendar year:
              </p>
              <p className="font-bold">${formatCurrency(additionalTax)} USD</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type TaxBracket = {
  rate: number;
  income: number;
};

type TaxBrackets = {
  [filingStatus: string]: TaxBracket[];
};

function getRegularTax(income: number, filingStatus: string): number {
  const taxBrackets: TaxBrackets = {
    Single: [
      { rate: 0.1, income: 11000 },
      { rate: 0.12, income: 44725 },
      { rate: 0.22, income: 95375 },
      { rate: 0.24, income: 182100 },
      { rate: 0.32, income: 231250 },
      { rate: 0.35, income: 578125 },
      { rate: 0.37, income: Infinity },
    ],
    Married: [
      { rate: 0.1, income: 22000 },
      { rate: 0.12, income: 89450 },
      { rate: 0.22, income: 190750 },
      { rate: 0.24, income: 364200 },
      { rate: 0.32, income: 462500 },
      { rate: 0.35, income: 693750 },
      { rate: 0.37, income: Infinity },
    ],
  };

  const standardDeductions: Record<string, number> = {
    Single: 13850,
    Married: 27700,
  };

  const brackets: TaxBracket[] = taxBrackets[filingStatus];

  if (!brackets) {
    throw new Error(`Unknown filing status: ${filingStatus}`);
  }

  let tax = 0;
  let taxableIncome = income - standardDeductions[filingStatus];

  let lastBracketIncome = 0;

  for (let bracket of brackets) {
    if (taxableIncome <= bracket.income) {
      tax += (taxableIncome - lastBracketIncome) * bracket.rate;
      return tax;
    } else {
      tax += (bracket.income - lastBracketIncome) * bracket.rate;
      lastBracketIncome = bracket.income;
    }
  }

  // This point should never be reached due to the Infinity income in the last bracket,
  // but TypeScript doesn't know that, so return a default value
  return 0;
}

const formatCurrency = (num: number): string => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function strToNumber(str: string) {
  // Remove commas from the string
  // Convert the resulting string to a number
  return Number(str.replace(/,/g, ""));
}

export default OptionTaxCalculator;
