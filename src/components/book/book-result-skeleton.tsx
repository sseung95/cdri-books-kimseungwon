import { BookListSkeleton } from "./book-list-skeleton";

interface BookResultSkeletonProps {
  /** 스크린 리더에 읽어줄 안내 */
  message?: string;
}

// BookResult(결과 수 + 목록)와 같은 배치의 로딩 자리 표시
export function BookResultSkeleton({
  message = "불러오는 중입니다",
}: BookResultSkeletonProps) {
  return (
    <div role="status" className="mt-6">
      <span className="sr-only">{message}</span>
      <div className="h-6 w-40 rounded bg-light-gray motion-safe:animate-pulse" />
      <div className="mt-9">
        <BookListSkeleton />
      </div>
    </div>
  );
}
