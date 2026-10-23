import { SearchBar } from "./_components/search-bar";
import { SearchResult } from "./_components/search-result";

export default function SearchPage() {
  return (
    <section>
      <h2 className="h-9 typo-title2">도서 검색</h2>
      <div className="mt-4">
        <SearchBar />
      </div>
      {/* TODO: 검색창 연결 단계에서 URL의 검색어로 교체 */}
      <SearchResult query="하루키" />
    </section>
  );
}
