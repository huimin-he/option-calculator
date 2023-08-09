// pages/financial/index.js
import Breadcrumb from "@/components/BreadCrumbs";
import Link from "next/link";

export default function FinancialIndex() {
  return (
    <div>
      <Breadcrumb />
      <h1>Financial Calculators</h1>
      <ul>
        <li>
          <Link href="/financial/loan">
            <div>Loan Calculator</div>
          </Link>
        </li>
        <li>
          <Link href="/financial/mortgage">
            <div>Mortgage Calculator</div>
          </Link>
        </li>
        <li>
          <Link href="/financial/employee_option">
            <div>Employee Option</div>
          </Link>
        </li>
        {/* Add links for more calculators as needed */}
      </ul>
    </div>
  );
}
