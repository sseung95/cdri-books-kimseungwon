import { HeartFillIcon } from "@/components/icons/heart-fill-icon";
import { HeartIcon } from "@/components/icons/heart-icon";
import { cn } from "@/lib/cn";

interface LikeButtonProps {
  isLiked: boolean;
  onClick?: () => void;
  className?: string;
}

export function LikeButton({ isLiked, onClick, className }: LikeButtonProps) {
  const Icon = isLiked ? HeartFillIcon : HeartIcon;

  return (
    <button
      type="button"
      aria-pressed={isLiked}
      aria-label={isLiked ? "찜 해제" : "찜하기"}
      onClick={onClick}
      className={cn("absolute", className)}
    >
      <Icon className={cn("size-full", isLiked ? "text-red" : "text-gray")} />
    </button>
  );
}
