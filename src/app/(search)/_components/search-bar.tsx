"use client";

import { useRef, useState, type FocusEvent, type SubmitEvent } from "react";
import { CloseIcon } from "@/components/icons/close-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { useDismiss } from "@/hooks/use-dismiss";
import { useSearchHistory } from "@/hooks/use-search-history";
import { cn } from "@/lib/cn";
import { DetailSearch } from "./detail-search";

interface SearchBarProps {
  /** 현재 URL의 검색어. 입력창의 초기값이 된다. */
  query: string;
}

export function SearchBar({ query }: SearchBarProps) {
  const { histories, add, remove } = useSearchHistory();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  useDismiss(boxRef, isHistoryOpen, () => setIsHistoryOpen(false));

  const showHistories = isHistoryOpen && histories.length > 0;

  const search = (value: string) => {
    const nextQuery = value.trim();
    if (nextQuery) add(nextQuery);
    setIsHistoryOpen(false);

    // 빈 검색어는 검색 초기화로 보고 초기 화면으로 돌아간다.
    const url = nextQuery
      ? `/?${new URLSearchParams({ query: nextQuery })}`
      : "/";
    // router.push는 새 URL의 페이지 데이터를 서버에 먼저 요청해서 느리다.
    // 검색어는 클라이언트에서만 쓰므로 URL만 바꾼다. (useSearchParams는 바로 갱신된다)
    window.history.pushState(null, "", url);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("query");
    search(typeof value === "string" ? value : "");
  };

  // Tab 등으로 포커스가 검색창 밖으로 나가면 기록 목록을 닫는다.
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsHistoryOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* 검색 기록 목록이 아래 콘텐츠를 밀지 않고 위에 겹치도록 높이를 고정한다. */}
      <div className="relative h-12.5 w-full md:w-120">
        <div
          ref={boxRef}
          onBlur={handleBlur}
          className={cn(
            "absolute inset-x-0 top-0 z-10 overflow-hidden bg-light-gray",
            showHistories ? "rounded-3xl" : "rounded-full",
          )}
        >
          <form role="search" onSubmit={handleSubmit}>
            <label className="flex h-12.5 items-center gap-2.75 px-2.5">
              <SearchIcon className="shrink-0 text-text-primary" />
              <input
                // URL의 검색어가 바뀌면(뒤로가기 등) 입력값도 다시 맞춘다.
                key={query}
                name="query"
                defaultValue={query}
                placeholder="검색어를 입력하세요"
                aria-label="도서 검색어"
                autoComplete="off"
                onFocus={() => setIsHistoryOpen(true)}
                className="w-full bg-transparent typo-caption placeholder:text-text-subtitle"
              />
            </label>
          </form>
          {showHistories && (
            <ul aria-label="최근 검색어" className="pb-4">
              {histories.map((history) => (
                // 버튼 안에 버튼을 넣을 수 없어서, 삭제 버튼은 행 위에 겹쳐 둔다.
                <li key={history} className="relative">
                  <button
                    type="button"
                    onClick={() => search(history)}
                    className="w-full py-3 pr-14 pl-12.75 text-left typo-caption text-text-subtitle hover:bg-gray/40 focus-visible:bg-gray/40"
                  >
                    {history}
                  </button>
                  <button
                    type="button"
                    aria-label={`${history} 검색 기록 삭제`}
                    onClick={() => remove(history)}
                    className="absolute top-1/2 right-5 -translate-y-1/2 rounded-full p-1 hover:bg-gray focus-visible:bg-gray"
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <DetailSearch />
    </div>
  );
}
