import { formatPrice } from "@/lib/format";

// 가격이 없으면 "-"로 표시하고, 스크린 리더에는 의미를 읽어준다.
export function PriceValue({ price }: { price: number | null }) {
  if (price === null) {
    return <span aria-label="가격 정보 없음">-</span>;
  }
  return formatPrice(price);
}
