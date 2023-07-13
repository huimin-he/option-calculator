import OptionTaxCalculator from "@/components/Calculator";
import SEOArticle from "@/components/SEOArtichle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-14">
      <div className="flex flex-col items-center justify-center">
        <OptionTaxCalculator />
        <SEOArticle />
      </div>
    </main>
  );
}
