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
  metadataBase: new URL("https://windhero.app"),
  title: {
    default: "WindHero — Master the Wind",
    template: "%s · WindHero",
  },
  description:
    "WindHero is a modern sailing academy and exploration community. Learn to read the wind, plot real voyages, and develop the captain's mind.",
  openGraph: {
    title: "WindHero — Master the Wind",
    description:
      "A modern sailing academy and exploration community. Learn the wind, the routes, and the captain's mind.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WindHero — Master the Wind",
    description:
      "A modern sailing academy and exploration community for those who chase the wind.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
