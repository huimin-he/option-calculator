import OptionTaxCalculator from "@/components/Calculator";
import SEOArticle from "@/components/SEOArtichle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-4 sm:p-14 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center">
        <OptionTaxCalculator />
        <SEOArticle />
      </div>
    </main>
  );
}
