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
          <Header />
          <main className="pt-20 pb-20">
            <Container>{children}</Container>
          </main>
          <ScrollToTopButton />
        </QueryProvider>
      </body>
    </html>
  );
}
