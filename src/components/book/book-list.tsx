import type { Book } from "@/types/book";
import { BookListItem } from "./book-list-item/book-list-item";

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        // isbn은 잡지 호(號)끼리 겹치는 경우가 있어 bookId가 담긴 url로 구분한다.
        <BookListItem key={book.url} book={book} />
      ))}
    </ul>
  );
}
