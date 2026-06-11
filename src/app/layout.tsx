import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  jsonLdScript,
  organizationLd,
  websiteLd,
} from "@/lib/seo/jsonld";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

/**
 * Fraunces ——
 * 变量字体，OPSZ / SOFT / WONK 三轴可控。
 * 关掉 WONK，让大字保持端庄；开启 SOFT 让圆角微暖，呼应"赤子之心"。
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://windhero.vercel.app"),
  title: {
    default: "WindHero 逐风人 — 驾驭风的方向",
    template: "%s · WindHero 逐风人",
  },
  description:
    "WindHero 逐风人整理中文航海理论课、RYA / ASA / IYT 认证对照、航海词典、案例复盘和出航前工具。",
  keywords: [
    "WindHero",
    "逐风人",
    "现代航海",
    "航海学院",
    "帆船课程",
    "RYA 认证",
    "ASA 认证",
    "IYT 认证",
    "Day Skipper",
    "Yachtmaster",
    "Bareboat Skipper",
    "Sea Survival",
    "VHF SRC",
    "中文 帆船 学校",
    "海图作业",
    "潮汐计算",
    "天气与航路",
    "六分仪 天文导航",
    "Sailing",
    "Master the Wind",
  ],
  authors: [{ name: "良辰", url: "https://windhero.vercel.app/about" }],
  creator: "良辰",
  publisher: "WindHero",
  openGraph: {
    title: "WindHero 逐风人 — 驾驭风的方向",
    description:
      "中文航海理论课、认证对照、航海词典、案例复盘和出航前工具。",
    siteName: "WindHero 逐风人",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: "https://windhero.vercel.app",
    images: [
      {
        url: "/images/generated/hero-ocean-training-v1.png",
        width: 1200,
        height: 630,
        alt: "WindHero 逐风人中文航海学院",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WindHero 逐风人 — Master the Wind",
    description: "中文航海理论课、认证对照和出航前工具。",
    creator: "@windhero",
    images: ["/images/generated/hero-ocean-training-v1.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${interTight.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="bg-paper text-ink min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:text-paper"
        >
          跳到正文
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteLd) }}
        />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
