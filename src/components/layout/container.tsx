import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// 콘텐츠 폭 + 좌우 여백 16px
const SIZE_CLASS = {
  default: "max-w-248", // 960px
  wide: "max-w-408", // 1600px
};

interface ContainerProps extends ComponentProps<"div"> {
  size?: keyof typeof SIZE_CLASS;
}

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4", SIZE_CLASS[size], className)}
      {...props}
    />
  );
}
