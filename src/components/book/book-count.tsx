interface BookCountProps {
  label: string;
  count: number;
}

export function BookCount({ label, count }: BookCountProps) {
  return (
    <p className="flex gap-4 typo-caption leading-6">
      {label}
      <span>
        총 <span className="text-primary">{count.toLocaleString("ko-KR")}</span>
        건
      </span>
    </p>
  );
}
