"use client";

import { memo, useState } from "react";
import { useBookLike } from "@/hooks/use-liked-books";
import type { Book } from "@/types/book";
import { BookDetail } from "./book-detail";
import { BookSummary } from "./book-summary";

interface BookListItemProps {
  book: Book;
}

/**
 * 목록이 다시 그려질 때(무한 스크롤로 다음 페이지 추가 등) 같은 책이면 다시 그리지 않도록 memo로 감싼다.
 * React Query는 바뀌지 않은 데이터의 참조를 유지해서, 기존 책은 그대로 같은 객체로 넘어온다.
 */
export const BookListItem = memo(function BookListItem({
  book,
}: BookListItemProps) {
  const { isLiked, toggle: toggleLike } = useBookLike(book);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <li className="border-b border-gray">
      {isOpen ? (
        <BookDetail
          book={book}
          isLiked={isLiked}
          onToggle={toggle}
          onLikeToggle={toggleLike}
        />
      ) : (
        <BookSummary
          book={book}
          isLiked={isLiked}
          onToggle={toggle}
          onLikeToggle={toggleLike}
        />
      )}
    </li>
  );
});
