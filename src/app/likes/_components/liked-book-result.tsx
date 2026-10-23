"use client";

import { useState } from "react";
import { BookResult } from "@/components/book/book-result";
import { BookResultSkeleton } from "@/components/book/book-result-skeleton";
import { InfiniteScrollTrigger } from "@/components/ui/infinite-scroll-trigger";
import { useIsClient } from "@/hooks/use-is-client";
import { useLikedBooks } from "@/hooks/use-liked-books";

const PAGE_SIZE = 10;

export function LikedBookResult() {
  const { likedBooks } = useLikedBooks();
  const isClient = useIsClient();
  // 찜 목록은 이미 모두 저장되어 있어서, 보여줄 개수만 늘려 가며 무한 스크롤한다.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 서버에는 localStorage가 없어 첫 화면에서 빈 목록이 잠깐 보이지 않도록 자리 표시를 먼저 보여준다.
  if (!isClient) {
    return <BookResultSkeleton />;
  }

  const hasMore = visibleCount < likedBooks.length;

  return (
    <>
      <BookResult
        label="찜한 책"
        books={likedBooks.slice(0, visibleCount)}
        count={likedBooks.length}
        emptyMessage="찜한 책이 없습니다."
      />
      {hasMore && (
        // 보여주는 개수가 바뀔 때마다 다시 감지해서, 목록이 짧아 감지 요소가 계속 보여도 이어서 늘린다.
        <InfiniteScrollTrigger
          key={visibleCount}
          onIntersect={() => setVisibleCount((count) => count + PAGE_SIZE)}
        />
      )}
    </>
  );
}
