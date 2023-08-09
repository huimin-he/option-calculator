"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";
import { Chart, registerables } from "chart.js";
import FormattedNumberInput from "./FormattedInput";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Breadcrumb from "./BreadCrumbs";

Chart.register(...registerables);

const OptionTaxCalculator = () => {
  const [optionType, setOptionType] = useState("ISO");
  const [quantity, setQuantity] = useState("10,000");
  const [income, setIncome] = useState("80,000");
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
  // For simplicity, let's assume end of year tax is the same as today's tax
  let regularTax = getRegularTax(strToNumber(income), filingStatus);
  let endOfYearTax = Math.max(regularTax, amtTax); // this is likely an oversimplification
  let additionalTax = Math.max(endOfYearTax - regularTax, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    scales: {
      y: {
        display: false,
        // stacked: true,
        offset: false, // Enable the offset option
        ticks: {
          callback: function (value: number | string) {
            return `$${formatCurrency(Number(value))}`;
          },
          stepSize: 10000,
          maxTicksLimit: 3,
        },
      },
      x: {
        // barPercentage: 0.5, // Adjust as per your needs
        // categoryPercentage: 0.1, // Adjust as per your needs
        display: false,
        // beginAtZero: true,
        stacked: true, // Enable the stacked property for x-axis too
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "right",
        align: "start",
      },
      tooltip: {
        enabled: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        offset: 4,
        display: true,
        align: "center",
        anchor: "center",
        formatter: (value: any, context: any) => {
          return context.dataset.label;
        },
        color: "#FFFFFF",
        font: {
          size: 14,
        },
      },
    },
    layout: {
      // padding: {
      //   top: 20, // Set the top padding to create a margin
      //   bottom: 0,
      //   right: 20,
      // },
    },
  };

  const data = {
    labels: ["tax1", "tax2"],
    datasets: [
      {
        label: "AMT Tax",
        data: [additionalTax],
        stack: "Stack 0", // Add this line
        backgroundColor: "rgba(40,167,69,0.6)", // Green
      },
      {
        label: "Exercise Cost",
        data: [exerciseCost],
        stack: "Stack 0", // Add this line
        backgroundColor: "rgba(0,123,255,0.6)", // Blue
      },
    ],
  };

  return (
    <>
      <div className="bg-white">
        <Breadcrumb />
        <div className="py-4 mx-4 mt-4 text-2xl sm:mx-0 sm:text-3xl border-b mb-8 sm:mb-8 items-center justify-center">
          FY23 Employee Option ISO Tax
        </div>

        <div className="mx-6 border-b grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 sm:mx-0">
          <div className="sm:border-r space-y-10 mb-10 sm:pr-10">
            {/* <div className="text-2xl mt-4 sm:mt-4 sm:my-4">
              Option Terms and Income
            </div> */}
            <section className="space-y-10">
              <div className="space-y-6">
                <h2>Option Details</h2>
                <div className="flex space-x-4">
                  <FormattedNumberInput
                    value={quantity}
                    label="Exercise Quantity"
                    onValueChange={function (value: string): void {
                      setQuantity(value);
                    }}
                  />
                  <FormattedNumberInput
                    value={strikePrice}
                    isCurrency={true}
                    label="Strike Price"
                    onValueChange={function (value: string): void {
                      setStrikePrice(value);
                    }}
                  />
                </div>
                <div className="">
                  <FormattedNumberInput
                    value={valuePerShare}
                    isCurrency={true}
                    label="Per Share Value (409A)"
                    onValueChange={function (value: string): void {
                      setValuePerShare(value);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2>Personal Details</h2>
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
                    className="block px-2.5 pb-1 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    {"Filing Status"}
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="bg-white mb-10 rounded-lg flex">
            <div className="flex flex-col pr-4 space-y-6">
              <div className="bg-white border-gray-400 rounded-lg w-full">
                <p className="text-sm">Total Out-of-pocket</p>
                <p className="text-3xl">
                  <span className="text-sm">$ </span>
                  {formatCurrency(exerciseCost + additionalTax)}
                </p>
              </div>
              <div className="bg-white w-full">
                <p className="text-sm">Exercise Cost</p>
                <p className="text-xl">
                  <span className="text-sm">$ </span>
                  {formatCurrency(exerciseCost)}
                </p>
              </div>
              <div className="w-full">
                <p className="text-sm">AMT Tax</p>
                <p className="text-xl">
                  <span className="text-sm">$ </span>
                  {formatCurrency(additionalTax)}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-center items-center w-[300px] h-[400px] ml-5 -mt-20 -mr-16">
              <Bar
                className="h-full w-full"
                data={data}
                options={options}
                plugins={[ChartDataLabels]}
              />
            </div> */}
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
