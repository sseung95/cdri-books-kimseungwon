import { useInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "@/api/book";
import type { BookSearchParams } from "@/types/book";

const PAGE_SIZE = 10;

type BookSearchFilter = Omit<BookSearchParams, "page" | "size">;

export const bookKeys = {
  all: ["books"] as const,
  search: (filter: BookSearchFilter) =>
    [...bookKeys.all, "search", filter] as const,
};

export function useBookSearch(filter: BookSearchFilter) {
  return useInfiniteQuery({
    queryKey: bookKeys.search(filter),
    queryFn: ({ pageParam }) =>
      searchBooks({ ...filter, page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.meta.isEnd ? undefined : lastPageParam + 1,
    enabled: filter.query.trim().length > 0,
  });
}
