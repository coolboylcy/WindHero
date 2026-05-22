import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://windhero.vercel.app"),
  title: {
    default: "WindHero 逐风人 — 驾驭风的方向",
    template: "%s · WindHero 逐风人",
  },
  description:
    "WindHero 逐风人是一所现代航海学院与探索社区。学会读风、规划真实远航、建立船长的判断力——在变化的风里，依然掌控自己的方向。",
  keywords: [
    "WindHero",
    "逐风人",
    "现代航海",
    "航海学院",
    "帆船课程",
    "远航",
    "船长培训",
    "Sailing",
    "Master the Wind",
  ],
  openGraph: {
    title: "WindHero 逐风人 — 驾驭风的方向",
    description:
      "现代航海学院与探索社区。学会读风、规划航线、建立船长的判断力。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WindHero 逐风人 — Master the Wind",
    description: "为现代探索者准备的航海学院与社区。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="bg-ink text-sail min-h-full flex flex-col selection:bg-gold/30">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
