"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { BookIcon } from "@/components/icons/book-icon";
import { cn } from "@/lib/cn";

interface BookThumbnailProps {
  src: string;
  alt: string;
  /** next/image가 화면 폭별로 알맞은 크기의 이미지를 고르는 기준 */
  sizes: string;
  className?: string;
  /** 이미지 위에 겹쳐 놓을 요소 (찜 버튼 등) */
  children?: ReactNode;
}

export function BookThumbnail({
  src,
  alt,
  sizes,
  className,
  children,
}: BookThumbnailProps) {
  // 주소는 있지만 불러오지 못한 이미지. src가 바뀌면 다시 시도한다.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasImage = src !== "" && failedSrc !== src;

  return (
    <div className={cn("relative shrink-0 bg-light-gray", className)}>
      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          onError={() => setFailedSrc(src)}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <BookIcon className="aspect-square h-auto w-2/5 text-ui-gray" />
        </div>
      )}
      {children}
    </div>
  );
}
