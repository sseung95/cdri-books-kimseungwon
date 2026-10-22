import Link from "next/link";
import { Container } from "@/components/layout/container";
import { NavLink } from "@/components/layout/nav-link";

const NAV_ITEMS = [
  { href: "/", label: "도서 검색" },
  { href: "/likes", label: "내가 찜한 책" },
];

export function Header() {
  return (
    <header>
      <Container size="wide" className="flex h-20 items-center">
        <Link href="/" className="typo-title3 md:typo-title1">
          CERTICOS BOOKS
        </Link>
        {/* 로고와 메뉴 간격: 시안 400px, 화면이 좁으면 줄어든다. */}
        <div aria-hidden className="min-w-4 flex-1 md:max-w-100" />
        <nav className="flex gap-4 md:gap-14">
          {NAV_ITEMS.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
