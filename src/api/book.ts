import { kakaoClient } from "@/api/kakao-client";
import type { Book, BookSearchParams, BookSearchResult } from "@/types/book";

/**
 * 카카오 책 검색 API 응답 형식
 * https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
 */
interface KakaoBook extends Omit<Book, "price" | "salePrice"> {
  /** 가격 정보가 없으면 0 */
  price: number;
  /** 할인가가 없으면 -1 */
  sale_price: number;
}

interface KakaoBookSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoBook[];
}

function toBook({ price, sale_price, ...book }: KakaoBook): Book {
  return {
    ...book,
    price: price > 0 ? price : null,
    salePrice: sale_price > 0 ? sale_price : null,
  };
}

/**
 * @param signal 요청 취소용. 검색어가 바뀌어 필요 없어진 요청을 React Query가 취소한다.
 */
export async function searchBooks(
  params: BookSearchParams,
  signal?: AbortSignal,
): Promise<BookSearchResult> {
  const { data } = await kakaoClient.get<KakaoBookSearchResponse>(
    "/v3/search/book",
    { params, signal },
  );

  return {
    meta: {
      totalCount: data.meta.total_count,
      pageableCount: data.meta.pageable_count,
      isEnd: data.meta.is_end,
    },
    books: data.documents.map(toBook),
  };
}
