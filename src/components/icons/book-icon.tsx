import type { ComponentProps } from "react";

export function BookIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M5 19.5V5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2.5Z" />
      <path d="M5 19.5A2 2 0 0 0 7 21h12v-4" />
      <path d="M9 7h6" />
    </svg>
  );
}
