import { kakaoClient } from "@/api/kakao-client";
import type { Book, BookSearchParams, BookSearchResult } from "@/types/book";

// 카카오 책 검색 API 응답 형식
// https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
interface KakaoBook extends Omit<Book, "salePrice"> {
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

function toBook({ sale_price, ...book }: KakaoBook): Book {
  return { ...book, salePrice: sale_price < 0 ? null : sale_price };
}

export async function searchBooks(
  params: BookSearchParams,
): Promise<BookSearchResult> {
  const { data } = await kakaoClient.get<KakaoBookSearchResponse>(
    "/v3/search/book",
    { params },
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
