import OptionTaxCalculator from "@/components/Calculator";
import SEOArticle from "@/components/SEOArtichle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-14 ">
      <OptionTaxCalculator />
      <div className="sm:py-10"></div>
      <SEOArticle />
    </main>
  );
}
