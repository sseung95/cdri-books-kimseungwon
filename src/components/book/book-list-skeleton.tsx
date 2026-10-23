import { cn } from "@/lib/cn";

interface BookListSkeletonProps {
  /** 보여줄 행 수 */
  rows?: number;
}

/** 접힌 리스트 아이템(BookSummary)과 같은 배치의 로딩 자리 표시 */
export function BookListSkeleton({ rows = 5 }: BookListSkeletonProps) {
  return (
    <ul aria-hidden>
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border-b border-gray p-4 desktop:flex desktop:gap-0 desktop:pl-12"
        >
          <Bone className="h-17 w-12 desktop:mr-12" />
          <div className="flex flex-col gap-2 desktop:flex-1 desktop:flex-row desktop:items-center desktop:gap-5.5">
            <div className="flex flex-col gap-1 desktop:flex-1 desktop:flex-row desktop:items-center desktop:gap-4">
              <Bone className="h-5 w-3/4 desktop:w-48" />
              <Bone className="h-4 w-1/3 desktop:w-20" />
            </div>
            <Bone className="h-5 w-20" />
          </div>
          <div className="col-span-2 flex gap-2 desktop:ml-14">
            <Bone className="h-12 flex-1 rounded-lg desktop:w-28.75 desktop:flex-none" />
            <Bone className="h-12 flex-1 rounded-lg desktop:w-28.75 desktop:flex-none" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded bg-light-gray motion-safe:animate-pulse",
        className,
      )}
    />
  );
}
