import Image from "next/image";

interface BookEmptyProps {
  message: string;
}

export function BookEmpty({ message }: BookEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-30">
      <Image src="/images/empty-book.png" alt="" width={80} height={82} />
      <p className="typo-caption text-text-secondary">{message}</p>
    </div>
  );
}
