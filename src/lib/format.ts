export function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

/** 대표 저자만 보여준다. 예: ["김상협", "이연숙", "노동규"] → "김상협 외 2명" */
export function formatAuthors(authors: string[]) {
  const [first, ...rest] = authors;
  if (!first) return "";
  return rest.length > 0 ? `${first} 외 ${rest.length}명` : first;
}
