import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** src/styles/typography.css의 typo-* 유틸리티와 동기화해야 한다. */
const twMerge = extendTailwindMerge<"typo">({
  extend: {
    classGroups: {
      typo: [
        {
          typo: [
            "title1",
            "title2",
            "title3",
            "body1",
            "body2",
            "body2-bold",
            "caption",
            "small",
          ],
        },
      ],
    },
    // typo-*가 뒤에 오면 앞의 글자 크기·행간·굵기 클래스를 대체한다.
    conflictingClassGroups: {
      typo: ["font-size", "leading", "font-weight"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
