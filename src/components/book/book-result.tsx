import type { Book } from "@/types/book";
import { BookCount } from "./book-count";
import { BookEmpty } from "./book-empty";
import { BookList } from "./book-list";

interface BookResultProps {
  label: string;
  books: Book[];
  /** 전체 건수. 목록을 나눠 불러올 때처럼 books 길이와 다르면 넘긴다. */
  count?: number;
  emptyMessage: string;
}

export function BookResult({
  label,
  books,
  count = books.length,
  emptyMessage,
}: BookResultProps) {
  return (
    <div className="mt-6">
      <BookCount label={label} count={count} />
      {books.length > 0 ? (
        <div className="mt-9">
          <BookList books={books} />
        </div>
      ) : (
        <BookEmpty message={emptyMessage} />
      )}
    </div>
  );
}
