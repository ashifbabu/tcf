import dynamic from "next/dynamic";

  const FlightSearchForm = dynamic(
    () => import("@/components/search/FlightSearchForm"),
    { ssr: false } // Disable server-side rendering for performance
  );

  const SearchContent = dynamic(
    () => import("@/components/search/content/SearchContent"),
    { ssr: false }
  );

export default function Home() {
  return (
    <div className="flex-1">
      <FlightSearchForm />
      <SearchContent />
    </div>
  );
}
