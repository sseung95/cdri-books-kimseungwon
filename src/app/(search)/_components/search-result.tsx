"use client";

import { BookResult } from "@/components/book/book-result";
import { useBookSearch } from "@/queries/book";

interface SearchResultProps {
  query: string;
}

export function SearchResult({ query }: SearchResultProps) {
  const { data, isLoading, isError } = useBookSearch({ query });

  if (isLoading) {
    return <SearchMessage>검색 중입니다...</SearchMessage>;
  }
  if (isError) {
    return (
      <SearchMessage>
        검색 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </SearchMessage>
    );
  }

  const books = data?.pages.flatMap((page) => page.books) ?? [];
  const totalCount = data?.pages[0]?.meta.totalCount ?? 0;

  return (
    <BookResult
      label="도서 검색 결과"
      books={books}
      count={totalCount}
      emptyMessage="검색된 결과가 없습니다."
    />
  );
}

function SearchMessage({ children }: { children: string }) {
  return (
    <p className="py-30 text-center typo-caption text-text-secondary">
      {children}
    </p>
  );
}
