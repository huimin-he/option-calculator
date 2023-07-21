"use client";
import Breadcrumb from "@/components/BreadCrumbs";
import React, { useState } from "react";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");

  // Implement your mortgage calculation logic here
  // and set the results in states

  return (
    <>
      <div className="pt-5">
        <Breadcrumb />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-14">
        <div className=" dark:bg-gray-900">
          <div className="bg-slate-100 px-5">
            <section className="flex flex-col">
              <div className="text-3xl sm:text-3xl font-bold sm:mt-4 sm:my-4">
                Input
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Floating outlined
                </label>
              </div>

              <div>
                <label
                  htmlFor="homePrice"
                  className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Home Price
                </label>
                <input
                  type="number"
                  id="homePrice"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="interestRate"
                  className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Interest Rate
                </label>
                <input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="loanTerm"
                  className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loan Term (years)
                </label>
                <input
                  type="number"
                  id="loanTerm"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="downPayment"
                  className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Down Payment
                </label>
                <input
                  type="number"
                  id="downPayment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </section>
          </div>

          <div className="bg-slate-100 px-3 py-3">
            <div className="text-3xl sm:text-3xl font-bold sm:mt-4 sm:px-2 sm:my-4">
              Result
            </div>
            <div className="flex flex-col sm:w-full pr-4">
              {/* Display your results here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageCalculator;
