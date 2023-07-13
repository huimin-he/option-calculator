import OptionTaxCalculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-14">
      <div className="flex flex-col items-center justify-center">
        <OptionTaxCalculator />
      </div>
    </main>
  );
}
