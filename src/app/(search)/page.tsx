import { SearchBar } from "./_components/search-bar";

export default function SearchPage() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="typo-title2">도서 검색</h2>
      <SearchBar />
    </section>
  );
}
