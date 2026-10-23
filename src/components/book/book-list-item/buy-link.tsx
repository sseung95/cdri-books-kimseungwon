import { LinkButton } from "@/components/ui/button";

interface BuyLinkProps {
  url: string;
  className?: string;
}

export function BuyLink({ url, className }: BuyLinkProps) {
  return (
    <LinkButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      구매하기
    </LinkButton>
  );
}
