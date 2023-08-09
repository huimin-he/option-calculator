import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="py-10 w-full flex items-center justify-center bg-gray-100">
        <div className="w-full px-6 sm:w-1/2 flex items-center justify-center ">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
