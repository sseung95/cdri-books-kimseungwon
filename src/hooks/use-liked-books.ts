import {
  createLocalStorageStore,
  useLocalStorageStore,
} from "@/lib/local-storage-store";
import type { Book } from "@/types/book";

function isBook(value: unknown): value is Book {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Book).url === "string" &&
    typeof (value as Book).title === "string"
  );
}

/** 찜한 시점의 책 데이터를 그대로 저장한다. (이후 API 데이터와 달라질 수 있음) */
const likedBooksStore = createLocalStorageStore<Book[]>(
  "liked-books",
  [],
  (value) => (Array.isArray(value) ? value.filter(isBook) : null),
);

/** 책은 url(bookId 포함)로 구분한다. isbn은 잡지 호(號)끼리 겹치는 경우가 있다. */
function hasBook(books: Book[], book: Book) {
  return books.some((liked) => liked.url === book.url);
}

/** 찜하지 않은 책이면 맨 앞에 추가하고, 찜한 책이면 해제한다. */
function toggleLikedBook(book: Book) {
  const current = likedBooksStore.get();
  likedBooksStore.set(
    hasBook(current, book)
      ? current.filter((liked) => liked.url !== book.url)
      : [book, ...current],
  );
}

/** 찜 목록 전체 (찜 목록 페이지용) */
export function useLikedBooks() {
  return useLocalStorageStore(likedBooksStore);
}

/**
 * 책 한 권의 찜 여부 (리스트 아이템용).
 * 목록 전체가 아니라 이 책의 찜 여부만 구독해서, 다른 책을 찜해도 다시 그려지지 않는다.
 */
export function useBookLike(book: Book) {
  const isLiked = useLocalStorageStore(likedBooksStore, (books) =>
    hasBook(books, book),
  );
  return { isLiked, toggle: () => toggleLikedBook(book) };
}
