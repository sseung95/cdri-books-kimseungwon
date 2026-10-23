"use client";

import { useEffect } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";

interface ErrorPageProps {
  error: unknown;
  /** 해당 화면을 다시 불러와 다시 그린다. */
  retry: () => void;
}

// 화면을 그리다 예상하지 못한 오류가 났을 때 보여준다. (API 실패는 각 화면에서 따로 처리)
export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage
      title="ERROR"
      tone="error"
      message="문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
    >
      <Button onClick={() => retry()}>다시 시도</Button>
      <LinkButton href="/" variant="outline">
        메인 페이지로 이동
      </LinkButton>
    </StatusMessage>
  );
}
