"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const OptionTaxCalculator = () => {
  const [optionType, setOptionType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [income, setIncome] = useState(0);
  const [valuePerShare, setValuePerShare] = useState(0);
  const [filingStatus, setFilingStatus] = useState("Single");
  const [exerciseDate, setExerciseDate] = useState("");

  // TODO: implement the logic for tax calculations based on the inputs
  const AMT_EXEMPTION_SINGLE = 72900; // 2021 figure, update as needed
  const AMT_EXEMPTION_MARRIED = 113400; // 2021 figure, update as needed
  const AMT_RATE1 = 0.26; // 26% up to AMT income of $197,900 for 2021
  const AMT_RATE2 = 0.28; // 28% over $197,900 AMT income for 2021
  const AMT_RATE1_MAX = 197900; // for 2021, update as needed

  // ... rest of OptionTaxCalculator component ...

  // TODO: implement the logic for tax calculations based on the inputs
  const exerciseCost = quantity * valuePerShare;

  // The cost is the "preference item" for AMT calculation
  let preferenceItem = exerciseCost;

  let amtExemption =
    filingStatus === "single" ? AMT_EXEMPTION_SINGLE : AMT_EXEMPTION_MARRIED;

  // Compute AMT Taxable Income (AMTI)
  let amti = income + preferenceItem - amtExemption;

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
  let todayTax = Math.max(
    income * getRegularTaxRate(income, filingStatus),
    amtTax
  ); // assuming REGULAR_TAX_RATE is defined

  // For simplicity, let's assume end of year tax is the same as today's tax
  let endOfYearTax = todayTax; // this is likely an oversimplification

  const data = {
    labels: ["Exercise cost", "Today’s tax", "End of year tax"],
    datasets: [
      {
        data: [exerciseCost, todayTax, endOfYearTax],
      },
    ],
  };

  console.log("income, preferenceItem", income, preferenceItem);
  console.log("income + preferenceItem", income + preferenceItem);
  console.log(
    `quantity ${quantity}, income ${income}, preferenceItem ${preferenceItem}, amti ${amti}, amtTax ${amtTax}, todayTax ${todayTax}, EOYTax ${endOfYearTax}`
  );

  return (
    <div>
      <section>
        <Bar data={data} />
        <div>
          <div>Cost of your option exercise: ${exerciseCost}</div>
          <div>Taxes withheld on the day of the exercise: ${todayTax}</div>
          <div>
            Estimated AMT at the end of the calendar year: ${endOfYearTax}
          </div>
        </div>
      </section>

      <section>
        <div>
          <p>What is your option type?</p>
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
          >
            <option value="NSO">NSO</option>
            <option value="ISO">ISO</option>
          </select>
        </div>

        <div>
          <p>Exercise quantity:</p>
          <input
            // type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div>
          <p>What is your taxable income?</p>
          <input
            // type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />{" "}
          USD
        </div>

        <div>
          <p>Your company&apos;s per share value (FMV)</p>
          <input
            // type="number"
            value={valuePerShare}
            onChange={(e) => setValuePerShare(Number(e.target.value))}
          />
        </div>

        <div>
          <p>What is your filing status?</p>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        <div>
          <p>When are you planning on exercising?</p>
          <input
            type="date"
            value={exerciseDate}
            onChange={(e) => setExerciseDate(e.target.value)}
          />
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

export default OptionTaxCalculator;
