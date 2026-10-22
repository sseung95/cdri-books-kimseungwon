import Image from "next/image";
import { cn } from "@/lib/cn";

interface BookThumbnailProps {
  src: string;
  alt: string;
  /** next/image가 화면 폭별로 알맞은 크기의 이미지를 고르는 기준 */
  sizes: string;
  className?: string;
}

export function BookThumbnail({
  src,
  alt,
  sizes,
  className,
}: BookThumbnailProps) {
  return (
    <div className={cn("relative shrink-0 bg-light-gray", className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
    </div>
  );
}
