"use client";

import { useState } from "react";
import { useBookLike } from "@/hooks/use-liked-books";
import type { Book } from "@/types/book";
import { BookDetail } from "./book-detail";
import { BookSummary } from "./book-summary";

interface BookListItemProps {
  book: Book;
}

export function BookListItem({ book }: BookListItemProps) {
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
}
