"use client";

import { BookResult } from "@/components/book/book-result";
import { useLikedBooks } from "@/hooks/use-liked-books";

export function LikedBookResult() {
  const { likedBooks } = useLikedBooks();

  return (
    <BookResult
      label="찜한 책"
      books={likedBooks}
      emptyMessage="찜한 책이 없습니다."
    />
  );
}
