"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { cn } from "@/lib/cn";

// 이만큼 내려가면 버튼을 보여준다.
const SHOW_AFTER = 400;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SHOW_AFTER);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // 동작 줄이기 설정을 켠 사용자에게는 애니메이션 없이 이동한다.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={scrollToTop}
      className={cn(
        "fixed right-4 bottom-4 z-20 flex size-12 items-center justify-center rounded-full border border-gray bg-white shadow-select transition md:right-8 md:bottom-8",
        "hover:bg-light-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      // 숨겨진 동안에는 Tab으로도 닿지 않게 한다.
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronDownIcon className="rotate-180 text-text-secondary" />
    </button>
  );
}
