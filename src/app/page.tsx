import OptionTaxCalculator from "@/components/Calculator";
import SEOArticle from "@/components/SEOArtichle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center sm:p-6">
      <OptionTaxCalculator />
      <SEOArticle />
    </main>
  );
}
