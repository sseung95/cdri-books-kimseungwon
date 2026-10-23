import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const VARIANT_CLASS = {
  primary: "bg-primary text-white",
  secondary: "bg-light-gray text-text-secondary",
  outline: "border border-text-subtitle bg-white text-text-subtitle",
};

const SIZE_CLASS = {
  md: "h-12 px-7 py-4 typo-caption",
  sm: "h-9 p-2.5 typo-body2",
};

interface ButtonStyleProps {
  variant?: keyof typeof VARIANT_CLASS;
  size?: keyof typeof SIZE_CLASS;
  fullWidth?: boolean;
}

// Button과 LinkButton이 같은 모양을 쓰도록 공통 클래스를 만든다.
function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonStyleProps) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap [&_svg]:shrink-0",
    "rounded-lg transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && "w-full",
  );
}

interface ButtonProps extends ComponentProps<"button">, ButtonStyleProps {}

export function Button({
  variant,
  size,
  fullWidth,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        buttonClassName({ variant, size, fullWidth }),
        "enabled:hover:brightness-95",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

interface LinkButtonProps extends ComponentProps<"a">, ButtonStyleProps {}

// 버튼 모양의 링크. 페이지 이동은 <button>이 아니라 <a>로 한다.
export function LinkButton({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        buttonClassName({ variant, size, fullWidth }),
        "hover:brightness-95",
        className,
      )}
      {...props}
    />
  );
}
