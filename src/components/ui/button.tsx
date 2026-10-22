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

interface ButtonProps extends ComponentProps<"button"> {
  variant?: keyof typeof VARIANT_CLASS;
  size?: keyof typeof SIZE_CLASS;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap [&_svg]:shrink-0",
        "rounded-lg transition enabled:hover:brightness-95",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
