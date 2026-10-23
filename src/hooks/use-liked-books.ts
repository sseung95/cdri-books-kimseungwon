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

// 찜한 시점의 책 데이터를 그대로 저장한다. (이후 API 데이터와 달라질 수 있음)
const likedBooksStore = createLocalStorageStore<Book[]>(
  "liked-books",
  [],
  (value) => (Array.isArray(value) ? value.filter(isBook) : null),
);

export function useLikedBooks() {
  const likedBooks = useLocalStorageStore(likedBooksStore);

  // 책은 url(bookId 포함)로 구분한다. isbn은 잡지 호(號)끼리 겹치는 경우가 있다.
  const isLiked = (book: Book) =>
    likedBooks.some((liked) => liked.url === book.url);

  // 찜하지 않은 책이면 맨 앞에 추가하고, 찜한 책이면 해제한다.
  const toggle = (book: Book) => {
    const current = likedBooksStore.get();
    likedBooksStore.set(
      current.some((liked) => liked.url === book.url)
        ? current.filter((liked) => liked.url !== book.url)
        : [book, ...current],
    );
  };

  return { likedBooks, isLiked, toggle };
}
