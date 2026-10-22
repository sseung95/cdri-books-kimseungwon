import { CloseIcon } from "@/components/icons/close-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { cn } from "@/lib/cn";
import { DetailSearch } from "./detail-search";

interface SearchBarProps {
  histories?: string[];
}

export function SearchBar({ histories = [] }: SearchBarProps) {
  const hasHistories = histories.length > 0;

  return (
    <div className="flex items-center gap-4">
      {/* 검색 기록 목록이 아래 콘텐츠를 밀지 않고 위에 겹치도록 높이를 고정한다. */}
      <div className="relative h-12.5 w-full md:w-120">
        <div
          className={cn(
            "absolute inset-x-0 top-0 z-10 overflow-hidden bg-light-gray",
            hasHistories ? "rounded-3xl" : "rounded-full",
          )}
        >
          <label className="flex h-12.5 items-center gap-2.75 px-2.5">
            <SearchIcon className="shrink-0 text-text-primary" />
            <input
              placeholder="검색어를 입력하세요"
              aria-label="도서 검색어"
              className="w-full bg-transparent typo-caption placeholder:text-text-subtitle"
            />
          </label>
          {hasHistories && (
            <ul className="pb-4">
              {histories.map((history) => (
                // 버튼 안에 버튼을 넣을 수 없어서, 삭제 버튼은 행 위에 겹쳐 둔다.
                <li key={history} className="relative">
                  <button
                    type="button"
                    className="w-full py-3 pr-14 pl-12.75 text-left typo-caption text-text-subtitle hover:bg-gray/40 focus-visible:bg-gray/40"
                  >
                    {history}
                  </button>
                  <button
                    type="button"
                    aria-label={`${history} 검색 기록 삭제`}
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
