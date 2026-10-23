import type { ComponentProps } from "react";

/** 위쪽 화살표는 rotate-180으로 돌려서 쓴다. */
export function ChevronDownIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 -3 14 14"
      fill="none"
      aria-hidden
      {...props}
    >
      <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill="currentColor" />
    </svg>
  );
}
