import type { BookSearchTarget } from "@/types/book";

export const DETAIL_TARGETS = ["title", "person", "publisher"] as const;
export type DetailTarget = (typeof DETAIL_TARGETS)[number];

/** URL의 target 값이 상세검색 조건이 아니면(직접 고친 URL 등) 전체 검색으로 본다. */
export function parseTarget(value: string | null): DetailTarget | undefined {
  return DETAIL_TARGETS.find((target) => target === value);
}

/** 검색어가 비면 초기 화면(/)으로, target이 있으면 상세 검색으로 URL을 바꾼다. */
export function pushSearchUrl(query: string, target?: BookSearchTarget) {
  const params = new URLSearchParams();
  if (query) {
    params.set("query", query);
    if (target) params.set("target", target);
  }
  const search = params.toString();

  // router.push는 새 URL의 페이지 데이터를 서버에 먼저 요청해서 느리다.
  // 검색어는 클라이언트에서만 쓰므로 URL만 바꾼다. (useSearchParams는 바로 갱신된다)
  window.history.pushState(null, "", search ? `/?${search}` : "/");
}
