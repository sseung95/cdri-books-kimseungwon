import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface DetailToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function DetailToggleButton({
  isOpen,
  onClick,
  className,
}: DetailToggleButtonProps) {
  return (
    <Button
      variant="secondary"
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn("gap-1.25 px-4", className)}
    >
      상세보기
      <ChevronDownIcon
        className={cn("mt-0.75 text-ui-gray", isOpen && "mt-.25 rotate-180")}
      />
    </Button>
  );
}
