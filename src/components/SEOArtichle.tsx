import React from "react";
import "tailwindcss/tailwind.css";
import "@tailwindcss/typography";

const SEOArticle = () => (
  <div className="prose lg:prose-sm p-4 pt-10 sm:pt-20">
    <h1 className="text-2xl sm:text-3xl">
      Understanding Employee Stock Options and Tax Implications
    </h1>

    <h2>1. Key Definitions</h2>
    <ul>
      <li>
        <strong>ISO (Incentive Stock Option)</strong>: A type of employee stock
        option with a tax benefit, provided it meets certain legal requirements.
      </li>
      <li>
        <strong>NSO (Non-Qualified Stock Option)</strong>
        {`: An employee stock
        option that doesn't meet specific criteria to qualify for ISO status,
        thus they are typically subject to income tax upon exercise.`}
      </li>
      <li>
        <strong>Strike Price (Exercise Price)</strong>: The fixed price at which
        an employee can purchase the stock option.
      </li>
      <li>
        <strong>FMV (Fair Market Value)</strong>
        {`: The current value of a
        company's share in the open market.`}
      </li>
      <li>
        <strong>Exercise Quantity</strong>: The number of shares an employee
        opts to purchase from their stock options.
      </li>
    </ul>

    <h2>2. AMT Calculation Steps using 2023 numbers</h2>
    <p>
      In the OptionTaxCalculator tool, we take the following steps to calculate
      the potential additional Alternative Minimum Tax (AMT) one might owe when
      exercising stock options:
    </p>

    <ol>
      <li>
        We start by calculating the <strong>exercise cost</strong>. This is
        computed by multiplying the exercise quantity (the number of shares you
        choose to buy) by the strike price (the predetermined price per share).
      </li>

      <li>
        Next, we calculate the <strong>preference item</strong> for AMT. This is
        computed by multiplying the exercise quantity by the difference between
        the Fair Market Value (FMV) per share and the strike price.
      </li>

      <li>
        Depending on your tax filing status (single or married), an{" "}
        <strong>AMT exemption</strong> amount is determined. For the year 2023,
        the exemption was $81,300 for single filers and $126,500 for married
        filers.
      </li>

      <li>
        We then compute the <strong>AMT Taxable Income (AMTI)</strong>. This is
        your income plus the preference item, less the AMT exemption.
      </li>

      <li>
        If the AMTI is more than zero, we apply the relevant{" "}
        <strong>AMT rates</strong> to calculate the AMT tax. If the AMTI is up
        to $220,700, a rate of 26% is applied. Any amount above $197,900 is
        taxed at 28%.
      </li>

      <li>
        Finally, we compare the AMT tax with your regular tax (based on your
        income and filing status). You are required to pay the larger of these
        two amounts.
      </li>
    </ol>

    <p>
      Please note that the specific numbers (AMT exemption, AMT rates, etc.) are
      for the year 2023 and should be updated as needed for other tax years.
    </p>

    <h2>3. Benefits of Yearly Exercising</h2>
    <p>
      Exercising your options each year can potentially help in reducing your
      AMT liability. This is because the AMT is computed based on a number of
      preference items, which can be strategically managed by planning the
      exercise of options.
    </p>

    <h2>4. Early Exercise Benefits</h2>
    <p>
      {`Exercising all options before vesting, known as "early exercise", can have
      significant tax benefits. Early exercising allows you to start the clock
      on long-term capital gains tax earlier, potentially reducing the overall
      tax you owe when you sell the shares.`}
    </p>
  </div>
);

export default SEOArticle;
