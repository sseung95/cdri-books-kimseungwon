import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Book } from "@/types/book";
import { BookThumbnail } from "./book-thumbnail";
import { DetailToggleButton } from "./detail-toggle-button";
import { LikeButton } from "./like-button";

interface BookSummaryProps {
  book: Book;
  isLiked: boolean;
  onToggle: () => void;
}

// 접힌 상태. 모바일: [썸네일 | 제목·저자·가격] 아래 줄에 버튼. desktop(960px) 이상: 한 줄
export function BookSummary({ book, isLiked, onToggle }: BookSummaryProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 p-4 desktop:flex desktop:gap-0 desktop:pl-12">
      <BookThumbnail
        src={book.thumbnail}
        alt={book.title}
        sizes="48px"
        className="h-17 w-12 desktop:mr-12"
      >
        <LikeButton isLiked={isLiked} className="top-0 right-0 size-4" />
      </BookThumbnail>

      <div className="flex min-w-0 flex-col gap-2 desktop:flex-1 desktop:flex-row desktop:items-center desktop:gap-5.5">
        <div className="flex min-w-0 flex-col gap-1 desktop:flex-1 desktop:flex-row desktop:items-center desktop:gap-4">
          <h3
            title={book.title}
            className="line-clamp-2 typo-title3 leading-6 desktop:truncate"
          >
            {book.title}
          </h3>
          <p className="truncate typo-body2 leading-5 text-text-secondary desktop:shrink-0">
            {book.authors.join(", ")}
          </p>
        </div>
        <p className="shrink-0 typo-title3">
          {formatPrice(book.salePrice ?? book.price)}
        </p>
      </div>

      <div className="col-span-2 flex gap-2 desktop:ml-14 desktop:shrink-0">
        <Button className="flex-1 desktop:w-28.75 desktop:flex-none">
          구매하기
        </Button>
        <DetailToggleButton
          isOpen={false}
          onClick={onToggle}
          className="flex-1 desktop:w-28.75 desktop:flex-none"
        />
      </div>
    </div>
  );
}
