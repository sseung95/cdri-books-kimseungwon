"use client";

import { useSearchParams } from "next/navigation";
import { SearchBar } from "./search-bar";
import { SearchResult } from "./search-result";

// URL의 검색어를 읽어 검색창과 검색 결과에 함께 넘긴다.
export function SearchContentFromUrl() {
  const query = useSearchParams().get("query") ?? "";
  return <SearchContent query={query} />;
}

export function SearchContent({ query }: { query: string }) {
  return (
    <>
      <div className="mt-4">
        <SearchBar query={query} />
      </div>
      <SearchResult query={query} />
    </>
  );
}
