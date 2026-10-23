import type { Book } from "@/types/book";
import { BookListItem } from "./book-list-item/book-list-item";

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.isbn || book.url} book={book} />
      ))}
    </ul>
  );
}
