import type { Metadata } from "next";
import { LikedBookResult } from "./_components/liked-book-result";

export const metadata: Metadata = {
  title: "내가 찜한 책",
};

export default function LikesPage() {
  return (
    <section>
      <h2 className="h-9 typo-title2">내가 찜한 책</h2>
      <LikedBookResult />
    </section>
  );
}
