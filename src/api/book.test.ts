import { beforeEach, describe, expect, it, vi } from "vitest";
import { searchBooks } from "./book";
import { kakaoClient } from "./kakao-client";

vi.mock("./kakao-client", () => ({ kakaoClient: { get: vi.fn() } }));

const kakaoBook = {
  title: "노르웨이의 숲",
  contents: "소개",
  url: "https://search.daum.net/search?w=bookpage&bookId=540378",
  isbn: "8937434482 9788937434488",
  datetime: "2017-08-07T00:00:00.000+09:00",
  authors: ["무라카미 하루키"],
  publisher: "민음사",
  translators: ["양억관"],
  price: 17000,
  sale_price: 15300,
  thumbnail: "https://search1.kakaocdn.net/thumb/sample.jpg",
  status: "정상판매",
};

function mockResponse(documents: object[]) {
  vi.mocked(kakaoClient.get).mockResolvedValue({
    data: {
      meta: { total_count: 21, pageable_count: 21, is_end: false },
      documents,
    },
  });
}

describe("searchBooks", () => {
  beforeEach(() => {
    vi.mocked(kakaoClient.get).mockReset();
  });

  it("카카오 응답을 camelCase로 바꾼다", async () => {
    mockResponse([kakaoBook]);

    const result = await searchBooks({ query: "하루키" });

    expect(result.meta).toEqual({
      totalCount: 21,
      pageableCount: 21,
      isEnd: false,
    });
    expect(result.books[0]).toMatchObject({
      title: "노르웨이의 숲",
      price: 17000,
      salePrice: 15300,
    });
    expect(result.books[0]).not.toHaveProperty("sale_price");
  });

  it("할인가 -1(없음)과 0은 null로 바꾼다", async () => {
    mockResponse([
      { ...kakaoBook, sale_price: -1 },
      { ...kakaoBook, sale_price: 0 },
    ]);

    const { books } = await searchBooks({ query: "하루키" });

    expect(books.map((book) => book.salePrice)).toEqual([null, null]);
  });

  it("가격 0(정보 없음)은 null로 바꾼다", async () => {
    mockResponse([{ ...kakaoBook, price: 0 }]);

    const { books } = await searchBooks({ query: "하루키" });

    expect(books[0].price).toBeNull();
  });

  it("검색 조건과 취소용 signal을 요청에 넘긴다", async () => {
    mockResponse([]);
    const controller = new AbortController();

    await searchBooks(
      { query: "하루키", target: "person", page: 2, size: 10 },
      controller.signal,
    );

    expect(kakaoClient.get).toHaveBeenCalledWith("/v3/search/book", {
      params: { query: "하루키", target: "person", page: 2, size: 10 },
      signal: controller.signal,
    });
  });
});
