import { BookResult } from "@/components/book/book-result";
import type { Book } from "@/types/book";

export default function LikesPage() {
  // TODO: 찜 로직 단계에서 저장된 찜 목록으로 교체
  const likedBooks: Book[] = [];

  return (
    <section>
      <h2 className="h-9 typo-title2">내가 찜한 책</h2>
      <BookResult
        label="찜한 책"
        books={likedBooks}
        emptyMessage="찜한 책이 없습니다."
      />
    </section>
  );
}
