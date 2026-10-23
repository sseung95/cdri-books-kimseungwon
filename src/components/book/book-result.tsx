import type { Book } from "@/types/book";
import { BookCount } from "./book-count";
import { BookEmpty } from "./book-empty";
import { BookList } from "./book-list";

interface BookResultProps {
  label: string;
  books: Book[];
  emptyMessage: string;
}

export function BookResult({ label, books, emptyMessage }: BookResultProps) {
  return (
    <div className="mt-6">
      <BookCount label={label} count={books.length} />
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
