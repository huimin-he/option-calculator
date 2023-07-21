import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/react";
import Breadcrumb from "@/components/BreadCrumbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculator",
  description: "Useful calculators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-slate-50">
          <NavBar />
          {children}
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}
