import Image from "next/image";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Book } from "@/types/book";

interface BookListItemProps {
  book: Book;
}

export function BookListItem({ book }: BookListItemProps) {
  return (
    // 모바일: [썸네일 | 제목·저자·가격] 아래 줄에 버튼. md 이상: 한 줄
    <li className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border-b border-gray p-4 lg:flex lg:gap-0 lg:pl-12">
      <div className="relative h-17 w-12 shrink-0 bg-light-gray lg:mr-12">
        {book.thumbnail && (
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            sizes="48px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-2 lg:flex-1 lg:flex-row lg:items-center lg:gap-5.5">
        <div className="flex min-w-0 flex-col gap-1 lg:flex-1 lg:flex-row lg:items-center lg:gap-4">
          <h3
            title={book.title}
            className="line-clamp-2 typo-title3 leading-6 lg:truncate"
          >
            {book.title}
          </h3>
          <p className="truncate typo-body2 leading-5 text-text-secondary lg:shrink-0">
            {book.authors.join(", ")}
          </p>
        </div>
        <p className="shrink-0 typo-title3">
          {formatPrice(book.salePrice ?? book.price)}
        </p>
      </div>

      <div className="col-span-2 flex gap-2 lg:ml-14 lg:shrink-0">
        <Button className="flex-1 lg:w-28.75 lg:flex-none">구매하기</Button>
        <Button
          variant="secondary"
          className="flex-1 gap-1.25 px-4 lg:w-28.75 lg:flex-none"
        >
          상세보기
          <ChevronDownIcon className="mt-0.75 text-ui-gray" />
        </Button>
      </div>
    </li>
  );
}
