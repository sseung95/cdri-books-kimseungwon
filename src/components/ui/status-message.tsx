import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TONE_CLASS = {
  muted: "text-ui-gray",
  error: "text-red",
};

interface StatusMessageProps {
  /** 크게 보여줄 상태 표시 (예: 404) */
  title: string;
  message: string;
  /** muted: 안내성 상태(404 등), error: 오류 */
  tone?: keyof typeof TONE_CLASS;
  /** 안내 아래에 둘 버튼 등 */
  children?: ReactNode;
}

/** 404, 오류처럼 페이지 전체 상태를 알리는 안내 */
export function StatusMessage({
  title,
  message,
  tone = "muted",
  children,
}: StatusMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-30 text-center">
      <p
        className={cn("mb-4 text-8xl font-bold md:text-9xl", TONE_CLASS[tone])}
      >
        {title}
      </p>
      <p className="typo-caption text-text-secondary">{message}</p>
      {children && <div className="mt-4 flex gap-2">{children}</div>}
    </div>
  );
}
