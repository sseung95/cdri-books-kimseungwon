import type { Metadata } from "next";
import { Suspense } from "react";
import {
  SearchContent,
  SearchContentFromUrl,
} from "./_components/search-content";

export const metadata: Metadata = {
  title: "도서 검색",
};

export default function SearchPage() {
  return (
    <section>
      <h2 className="h-9 typo-title2">도서 검색</h2>
      {/* URL을 읽기 전(첫 HTML)에는 검색어가 없는 화면을 보여준다. */}
      <Suspense fallback={<SearchContent query="" />}>
        <SearchContentFromUrl />
      </Suspense>
    </section>
  );
}
