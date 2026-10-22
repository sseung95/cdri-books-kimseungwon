"use client";

import { useId, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons/close-icon";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useDismiss } from "@/hooks/use-dismiss";
import type { BookSearchTarget } from "@/types/book";

const TARGET_OPTIONS: { value: BookSearchTarget; label: string }[] = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자명" },
  { value: "publisher", label: "출판사" },
];

export function DetailSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<BookSearchTarget>("title");
  const containerRef = useRef<HTMLDivElement>(null);
  const popupId = useId();

  const close = () => setIsOpen(false);
  useDismiss(containerRef, isOpen, close);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="outline"
        size="sm"
        aria-expanded={isOpen}
        aria-controls={popupId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        상세검색
      </Button>
      {isOpen && (
        <div
          id={popupId}
          role="dialog"
          aria-label="상세검색"
          className="absolute top-full right-0 z-10 mt-3.75 w-90 rounded-lg bg-white px-6 py-9 shadow-popup md:right-auto md:left-1/2 md:-translate-x-1/2"
        >
          <button
            type="button"
            aria-label="상세검색 닫기"
            onClick={close}
            className="absolute top-2 right-2 rounded-full p-1 hover:bg-light-gray"
          >
            <CloseIcon className="size-4.5 text-ui-gray" />
          </button>
          <div className="flex gap-1">
            <Select
              value={target}
              options={TARGET_OPTIONS}
              onChange={setTarget}
              aria-label="검색 조건"
              className="w-25 shrink-0"
            />
            <input
              placeholder="검색어 입력"
              aria-label="상세검색어"
              className="h-9 w-full border-b border-primary px-2 typo-body2 placeholder:text-text-subtitle"
            />
          </div>
          <Button size="sm" fullWidth className="mt-4">
            검색하기
          </Button>
        </div>
      )}
    </div>
  );
}
