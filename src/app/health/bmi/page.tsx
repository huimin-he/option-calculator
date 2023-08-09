"use client";

import React, { useState } from "react";
import FormattedNumberInput from "@/components/FormattedInput";
import Breadcrumb from "@/components/BreadCrumbs";

const BMICalculator = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const weightNumber = strToNumber(weight);
  const heightNumber = strToNumber(height);

  const bmi = weightNumber / Math.pow(heightNumber / 100, 2);
  const healthiness = getHealthiness(bmi);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center sm:p-6">
        <div className="bg-white">
          <Breadcrumb className="" />
          <div className="py-4 mx-4 mt-1 sm:mt-4 text-2xl sm:mx-0 sm:text-3xl border-b mb-8 sm:mb-8 items-center justify-center">
            BMI Calculator
          </div>

          <div className="mx-6 border-b grid grid-cols-1 sm:mx-0  sm:grid-cols-2 gap-6 sm:gap-10">
            <div className="sm:border-r space-y-10 mb-10 sm:pr-10">
              <section className="space-y-10">
                <div className="space-y-6">
                  <h2>Enter your details</h2>
                  <FormattedNumberInput
                    value={weight}
                    label="Weight (kg)"
                    onValueChange={setWeight}
                  />
                  <FormattedNumberInput
                    value={height}
                    label="Height (cm)"
                    onValueChange={setHeight}
                  />
                </div>
              </section>
            </div>

            <div className="bg-white mb-10 flex">
              <div className="flex flex-col pr-4 space-y-10">
                <div className="bg-white border-gray-400 rounded-lg w-full space-y-4">
                  <div>
                    <p className="text-sm">Your Body Mass Index (BMI)</p>
                    <p className={`text-3xl ${getColorCode(bmi)}`}>
                      {formatNumber(bmi)}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm`}>Healthiness </p>
                    <p className={`text-xl ${getColorCode(bmi)}`}>
                      {healthiness}
                    </p>
                  </div>
                </div>
                <div className="bg-white border-gray-400 rounded-lg w-full space-y-4">
                  <h1 className="text-lg">BMI Classifications</h1>
                  <ul className="space-y-2 text-sm">
                    <li className="text-blue-600">Underweight: Below 18.5</li>
                    <li className="text-green-600">Normal weight: 18.5-24.9</li>
                    <li className="text-yellow-600">Overweight: 25-29.9</li>
                    <li className="text-red-600">Obesity: 30 and above</li>
                  </ul>
                </div>
              </div>
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

function formatNumber(num: number) {
  return num.toFixed(2);
}

function getHealthiness(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 24.9) return "Normal";
  if (bmi >= 25 && bmi < 29.9) return "Overweight";
  return "Obesity";
}

function getColorCode(bmi: number) {
  if (bmi < 18.5) return "text-blue-600";
  if (bmi >= 18.5 && bmi < 24.9) return "text-green-600";
  if (bmi >= 25 && bmi < 29.9) return "text-yellow-600";
  return "text-red-600";
}

export default BMICalculator;
