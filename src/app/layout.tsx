import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: {
    default: "CERTICOS BOOKS",
    // 하위 페이지는 "도서 검색 | CERTICOS BOOKS" 형태가 된다.
    template: "%s | CERTICOS BOOKS",
  },
  description: "카카오 책 검색 API로 도서를 검색하고 찜할 수 있는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body>
        <QueryProvider>
          {/* 키보드 사용자가 헤더를 건너뛰고 본문으로 가는 링크. Tab으로 포커스될 때만 보인다. */}
          <a
            href="#main"
            className="sr-only rounded-lg bg-primary px-4 py-2 typo-body2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
          >
            본문으로 바로가기
          </a>
          <Header />
          {/* tabIndex={-1}: 링크로 이동했을 때 본문에 포커스가 옮겨가도록 한다. */}
          <main id="main" tabIndex={-1} className="pt-20 pb-20 outline-none">
            <Container>{children}</Container>
          </main>
          <ScrollToTopButton />
        </QueryProvider>
      </body>
    </html>
  );
}
