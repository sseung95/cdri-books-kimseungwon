"use client";

import { useSearchParams } from "next/navigation";
import { parseTarget, type DetailTarget } from "../_lib/search-url";
import { DetailSearch } from "./detail-search";
import { SearchBar } from "./search-bar";
import { SearchResult } from "./search-result";

// URL의 검색어와 상세검색 조건을 읽어 검색창, 상세검색, 검색 결과에 함께 넘긴다.
export function SearchContentFromUrl() {
  const searchParams = useSearchParams();
  return (
    <SearchContent
      query={searchParams.get("query") ?? ""}
      target={parseTarget(searchParams.get("target"))}
    />
  );
}

interface SearchContentProps {
  query: string;
  /** 있으면 상세 검색, 없으면 전체 검색 */
  target?: DetailTarget;
}

export function SearchContent({ query, target }: SearchContentProps) {
  // 검색할 때마다 바뀌는 값. 검색창과 상세검색 입력을 URL 기준으로 다시 맞추는 데 쓴다.
  const searchKey = `${target ?? ""}:${query}`;

  return (
    <>
      <div className="mt-4 flex items-center gap-4">
        {/* 전체 검색과 상세 검색은 동시에 진행할 수 없다.
            상세 검색을 하면 검색창을, 전체 검색을 하면 상세검색 조건을 초기화한다. */}
        <SearchBar key={`bar-${searchKey}`} query={target ? "" : query} />
        <DetailSearch
          key={`detail-${searchKey}`}
          initialTarget={target}
          initialQuery={target ? query : ""}
        />
      </div>
      <SearchResult query={query} target={target} />
    </>
  );
}
