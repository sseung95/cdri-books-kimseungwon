"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import { BookDetail } from "./book-detail";
import { BookSummary } from "./book-summary";

interface BookListItemProps {
  book: Book;
  isLiked?: boolean;
}

export function BookListItem({ book, isLiked = false }: BookListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <li className="border-b border-gray">
      {isOpen ? (
        <BookDetail book={book} isLiked={isLiked} onToggle={toggle} />
      ) : (
        <BookSummary book={book} isLiked={isLiked} onToggle={toggle} />
      )}
    </li>
  );
}
