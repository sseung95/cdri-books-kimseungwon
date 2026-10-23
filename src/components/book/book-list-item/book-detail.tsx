import { cn } from "@/lib/cn";
import type { Book } from "@/types/book";
import { BookThumbnail } from "./book-thumbnail";
import { BuyLink } from "./buy-link";
import { DetailToggleButton } from "./detail-toggle-button";
import { LikeButton } from "./like-button";
import { PriceValue } from "./price-value";

interface BookDetailProps {
  book: Book;
  isLiked: boolean;
  onToggle: () => void;
  onLikeToggle: () => void;
}

// 펼친 상태.
// 모바일: [썸네일 | 제목·저자] / 책 소개 / 가격 / [구매하기 | 상세보기]
// desktop(960px) 이상: [썸네일] [제목·저자, 책 소개] [상세보기 … 가격, 구매하기]
export function BookDetail({
  book,
  isLiked,
  onToggle,
  onLikeToggle,
}: BookDetailProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 p-4 desktop:flex desktop:gap-0 desktop:pt-6 desktop:pb-10 desktop:pl-13.5">
      <BookThumbnail
        src={book.thumbnail}
        alt={book.title}
        sizes="(min-width: 960px) 210px, 96px"
        className="h-34 w-24 desktop:mr-8 desktop:h-70 desktop:w-52.5"
      >
        <LikeButton
          isLiked={isLiked}
          onClick={onLikeToggle}
          className="top-1 right-1 size-5 desktop:top-2 desktop:right-2 desktop:size-6"
        />
      </BookThumbnail>

      {/* 모바일에서는 contents로 감싼 요소를 없애 자식들이 바로 그리드 칸에 놓이게 한다. */}
      <div className="contents desktop:flex desktop:w-90 desktop:flex-col desktop:pt-5">
        <div className="flex flex-col gap-1 self-center desktop:flex-row desktop:items-center desktop:gap-4 desktop:self-start">
          <h3 className="typo-title3 leading-6.5">{book.title}</h3>
          <p className="typo-body2 leading-5 text-text-secondary">
            {book.authors.join(", ")}
          </p>
        </div>
        <section className="col-span-2 desktop:mt-4">
          <h4 className="typo-body2-bold leading-6.5">책 소개</h4>
          {book.contents.trim() ? (
            <p className="mt-3 typo-small leading-4 whitespace-pre-line">
              {book.contents}
            </p>
          ) : (
            <p className="mt-3 typo-small leading-4 text-text-subtitle">
              책 소개가 없습니다.
            </p>
          )}
        </section>
      </div>

      {/* 모바일에서는 order로 [가격] 다음 줄에 [구매하기 | 상세보기]가 오게 한다. */}
      <div className="col-span-2 flex flex-wrap gap-2 desktop:ml-auto desktop:w-60 desktop:flex-col desktop:flex-nowrap desktop:items-end desktop:gap-0">
        <DetailToggleButton
          isOpen
          onClick={onToggle}
          className="order-3 mt-0.5 flex-1 desktop:order-1 desktop:w-28.75 desktop:flex-none"
        />
        <BookPrice
          price={book.price}
          salePrice={book.salePrice}
          className="order-1 w-full desktop:order-2 desktop:mt-auto"
        />
        <BuyLink
          url={book.url}
          className="order-2 flex-1 desktop:order-3 desktop:mt-7 desktop:w-full desktop:flex-none"
        />
      </div>
    </div>
  );
}

interface BookPriceProps {
  price: number | null;
  salePrice: number | null;
  className?: string;
}

// 원가·할인가를 항상 함께 보여주고, 값이 없으면 "-"로 표시한다.
function BookPrice({ price, salePrice, className }: BookPriceProps) {
  const isDiscounted = price !== null && salePrice !== null;

  return (
    // 라벨은 라벨끼리, 가격은 가격끼리 같은 열에 오도록 2열 그리드로 배치한다.
    <dl
      className={cn(
        "grid grid-cols-[auto_auto] items-center justify-end gap-2",
        className,
      )}
    >
      <div className="contents">
        <dt className="translate-y-px text-right typo-small text-text-subtitle">
          원가
        </dt>
        <dd
          className={cn(
            "text-right typo-title3 leading-6.5",
            isDiscounted && "font-light line-through",
          )}
        >
          <PriceValue price={price} />
        </dd>
      </div>
      <div className="contents">
        <dt className="translate-y-px text-right typo-small text-text-subtitle">
          할인가
        </dt>
        <dd className="text-right typo-title3 leading-6.5">
          <PriceValue price={salePrice} />
        </dd>
      </div>
    </dl>
  );
}
