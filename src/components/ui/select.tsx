"use client";

import { useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/cn";

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  "aria-label"?: string;
  className?: string;
}

export function Select<T extends string>({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useDismiss(containerRef, isOpen, () => setIsOpen(false));

  const selected = options.find((option) => option.value === value);
  // 펼친 목록에는 현재 선택된 항목을 제외하고 보여준다.
  const restOptions = options.filter((option) => option.value !== value);

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-full items-center justify-between border-b border-gray px-2 typo-body2-bold"
      >
        {selected?.label}
        <ChevronDownIcon className="text-ui-gray" />
      </button>
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-1.5 w-full bg-white shadow-select">
          {restOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full px-2 py-2 text-left typo-body2 text-text-subtitle hover:bg-light-gray"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
