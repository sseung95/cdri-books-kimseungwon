"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
}

/**
 * 목록 끝에 두는 감지용 요소. 화면에 들어오면 onIntersect를 호출한다.
 * 다음 페이지를 불러온 뒤에도 여전히 보이는 경우를 위해, 쓰는 쪽에서 key를 바꿔 다시 감지하게 한다.
 */
export function InfiniteScrollTrigger({
  onIntersect,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef(onIntersect);
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersectRef.current();
      },
      // 끝에 닿기 조금 전에 미리 불러온다.
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} aria-hidden className="h-px" />;
}
