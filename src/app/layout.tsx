import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "CDRI Books",
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
        </QueryProvider>
      </body>
    </html>
  );
}
