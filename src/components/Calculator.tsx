"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";
import { Chart, registerables } from "chart.js";
import FormattedNumberInput from "./FormattedInput";

Chart.register(...registerables);

const OptionTaxCalculator = () => {
  const [optionType, setOptionType] = useState("ISO");
  const [quantity, setQuantity] = useState("10,000");
  const [income, setIncome] = useState("150,000");
  const [strikePrice, setStrikePrice] = useState(5);
  const [valuePerShare, setValuePerShare] = useState(20);
  const [filingStatus, setFilingStatus] = useState("Single");
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based
  const year = date.getFullYear();

  const [exerciseDate, setExerciseDate] = useState(`${year}-${month}-${day}`);

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;

  //   // Remove any existing commas
  //   const noCommas = input.replace(/,/g, "");

  //   // Test if the new input includes only digits
  //   const regex = /^[0-9]+$/;
  //   if (input === "" || regex.test(noCommas)) {
  //     // Add new commas as thousand separators
  //     const formattedInput = Number(noCommas).toLocaleString();

  //     // Update the state with the formatted input
  //     setQuantity(formattedInput);
  //   }
  // };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const noCommas = input.replace(/,/g, "");

    // Test if the new input includes only digits
    const regex = /^[0-9]+$/;
    if (input === "" || regex.test(noCommas)) {
      let formattedInput = noCommas;

      // Only parse and format if not empty
      if (noCommas !== "") {
        formattedInput = new Intl.NumberFormat().format(parseInt(noCommas));
      }

      // Update the state with the formatted input
      setQuantity(formattedInput);
    }
  };

  // TODO: implement the logic for tax calculations based on the inputs
  const AMT_EXEMPTION_SINGLE = 72900; // 2021 figure, update as needed
  const AMT_EXEMPTION_MARRIED = 113400; // 2021 figure, update as needed
  const AMT_RATE1 = 0.26; // 26% up to AMT income of $197,900 for 2021
  const AMT_RATE2 = 0.28; // 28% over $197,900 AMT income for 2021
  const AMT_RATE1_MAX = 197900; // for 2021, update as needed

  // ... rest of OptionTaxCalculator component ...

  // TODO: implement the logic for tax calculations based on the inputs
  const exerciseCost = strToNumber(quantity) * strikePrice;

  // The cost is the "preference item" for AMT calculation
  let preferenceItem = strToNumber(quantity) * (valuePerShare - strikePrice);

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
  let regularTax =
    strToNumber(income) * getRegularTaxRate(strToNumber(income), filingStatus);
  let endOfYearTax = Math.max(regularTax, amtTax); // this is likely an oversimplification
  let additionalTax = Math.max(endOfYearTax - regularTax, 0);

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
    labels: ["Exercise cost", "Today’s tax", "End of year tax"],
    datasets: [
      {
        label: "Tax",
        data: [exerciseCost, todayTax, additionalTax],
      },
    ],
  };

  return (
    <div className="sm:w-1/2">
      <div className="text-3xl font-bold mt-4 px-4 my-4">
        Option Exercise Tax Estimate
      </div>
      <section className="flex flex-col sm:flex-row">
        <div className="flex w-full">
          <Bar data={data} options={options} />
        </div>
        <div className="flex flex-col w-full sm:w-1/3">
          <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
            <p className="text-gray-700 font">Cost of your option exercise:</p>
            <p className="font-bold ">${formatCurrency(exerciseCost)} USD</p>
          </div>
          <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
            <p className="text-gray-700">
              Taxes withheld on the day of the exercise:
            </p>
            <p className="font-bold">${formatCurrency(todayTax)} USD</p>
          </div>
          <div className="m-2 bg-white border border-gray-400 p-3 rounded-lg w-full">
            <p className="text-gray-700">
              Additional AMT at the end of the calendar year:
            </p>
            <p className="font-bold">${formatCurrency(additionalTax)} USD</p>
          </div>
        </div>
      </section>

      <section className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            What is your option type?
          </label>
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="ISO">ISO</option>
            <option value="NSO">NSO</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Exercise quantity:
          </label>
          <FormattedNumberInput
            value={quantity}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onValueChange={function (value: string): void {
              setQuantity(value);
            }}
          />
        </div>

        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            What is your taxable income in USD?
          </label>
          <FormattedNumberInput
            value={income}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onValueChange={function (value: string): void {
              setIncome(value);
            }}
          />
        </div>

        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Strike Price in USD (Exercise Cost)
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={strikePrice}
            onChange={(e) => setStrikePrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your company&apos;s per share value (FMV)
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={valuePerShare}
            onChange={(e) => setValuePerShare(Number(e.target.value))}
          />
        </div>

        <div>
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            What is your filing status?
          </label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        <div>
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              When are you planning on exercising?
            </label>
            <input
              id="default-input"
              type="date"
              value={exerciseDate}
              onChange={(e) => setExerciseDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface TaxBracket {
  rate: number;
  income: number;
}

interface TaxBrackets {
  [key: string]: TaxBracket[];
}

function getRegularTaxRate(income: number, filingStatus: string): number {
  const taxBrackets: TaxBrackets = {
    Single: [
      { rate: 0.1, income: 9950 },
      { rate: 0.12, income: 40525 },
      { rate: 0.22, income: 86375 },
      { rate: 0.24, income: 164925 },
      { rate: 0.32, income: 209425 },
      { rate: 0.35, income: 523600 },
      { rate: 0.37, income: Infinity },
    ],
    Married: [
      { rate: 0.1, income: 19900 },
      { rate: 0.12, income: 81050 },
      { rate: 0.22, income: 172750 },
      { rate: 0.24, income: 329850 },
      { rate: 0.32, income: 418850 },
      { rate: 0.35, income: 628300 },
      { rate: 0.37, income: Infinity },
    ],
  };

  const brackets: TaxBracket[] = taxBrackets[filingStatus];

  if (!brackets) {
    throw new Error(`Unknown filing status: ${filingStatus}`);
  }

  for (let bracket of brackets) {
    if (income <= bracket.income) {
      return bracket.rate;
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
  const noCommas = str.replace(/,/g, "");

  // Convert the resulting string to a number
  return Number(noCommas);
}

export default OptionTaxCalculator;
