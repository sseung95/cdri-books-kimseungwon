"use client";

import { BookListSkeleton } from "@/components/book/book-list-skeleton";
import { BookResult } from "@/components/book/book-result";
import { Button } from "@/components/ui/button";
import { InfiniteScrollTrigger } from "@/components/ui/infinite-scroll-trigger";
import { useBookSearch } from "@/queries/book";

interface SearchResultProps {
  query: string;
}

export function SearchResult({ query }: SearchResultProps) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useBookSearch({ query });

  if (isLoading) {
    return (
      <div role="status" className="mt-6">
        <span className="sr-only">검색 중입니다</span>
        <div className="h-6 w-40 rounded bg-light-gray motion-safe:animate-pulse" />
        <div className="mt-9">
          <BookListSkeleton />
        </div>
      </div>
    );
  }
  // 다음 페이지만 실패한 경우는 아래에서 다시 시도 버튼으로 처리한다.
  if (isError && !isFetchNextPageError) {
    return (
      <SearchMessage>
        검색 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </SearchMessage>
    );
  }

  const books = data?.pages.flatMap((page) => page.books) ?? [];
  const totalCount = data?.pages[0]?.meta.totalCount ?? 0;

  return (
    <>
      <BookResult
        label="도서 검색 결과"
        books={books}
        count={totalCount}
        emptyMessage="검색된 결과가 없습니다."
      />
      {isFetchingNextPage && <BookListSkeleton rows={2} />}
      {isFetchNextPageError && (
        <div className="flex flex-col items-center gap-3 py-10">
          <p className="typo-body2 text-text-secondary">
            목록을 더 불러오지 못했습니다.
          </p>
          <Button variant="outline" size="sm" onClick={() => fetchNextPage()}>
            다시 시도
          </Button>
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && !isFetchNextPageError && (
        // 불러온 페이지 수가 바뀔 때마다 다시 감지해서, 목록이 짧아 감지 요소가 계속 보여도 이어서 불러온다.
        <InfiniteScrollTrigger
          key={data?.pages.length}
          onIntersect={() => fetchNextPage()}
        />
      )}
    </>
  );
}

function SearchMessage({ children }: { children: string }) {
  return (
    <p className="py-30 text-center typo-caption text-text-secondary">
      {children}
    </p>
  );
}
