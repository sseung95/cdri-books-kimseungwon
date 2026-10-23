export type BookSearchSort = "accuracy" | "latest";
export type BookSearchTarget = "title" | "isbn" | "publisher" | "person";

export interface BookSearchParams {
  query: string;
  sort?: BookSearchSort;
  /** 1~50 */
  page?: number;
  /** 1~50 */
  size?: number;
  target?: BookSearchTarget;
}

export interface Book {
  title: string;
  contents: string;
  url: string;
  /** ISBN10, ISBN13이 공백으로 구분되어 온다. */
  isbn: string;
  /** ISO 8601 */
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  /** 가격 정보가 없으면 null */
  price: number | null;
  /** 할인가가 없으면 null */
  salePrice: number | null;
  thumbnail: string;
  status: string;
}

export interface BookSearchMeta {
  totalCount: number;
  pageableCount: number;
  isEnd: boolean;
}

export interface BookSearchResult {
  meta: BookSearchMeta;
  books: Book[];
}
