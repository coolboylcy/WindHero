import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.windhero.app" },
    ],
  },
  async redirects() {
    return [
      // 老的 RYA 单体页迁移至三体系对比页（保留 SEO 入站链接）
      { source: "/rya", destination: "/certifications", permanent: true },
    ];
  },
};

export default nextConfig;
