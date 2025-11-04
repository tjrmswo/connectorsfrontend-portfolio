import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const DOMAIN_BUCKET = process.env.NEXT_PUBLIC_BUCKET_DOMAIN;
const DOMAIN_DEV = process.env.NEXT_PUBLIC_DEV_DOMAIN;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [`${DOMAIN_BUCKET}`, `${DOMAIN_DEV}`],
    formats: ["image/avif", "image/webp"],
  },
  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  output: "standalone",
  // 실험적 기능
  experimental: {
    optimizePackageImports: ["lucide-react", "@tanstack/react-query"],
  },
};

export default withBundleAnalyzer(nextConfig);
