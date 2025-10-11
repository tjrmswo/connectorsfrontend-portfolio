import type { NextConfig } from "next";

const DOMAIN_BUCKET = process.env.NEXT_PUBLIC_BUCKET_DOMAIN;
const DOMAIN_DEV = process.env.NEXT_PUBLIC_DEV_DOMAIN;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [`${DOMAIN_BUCKET}`, `${DOMAIN_DEV}`],
  },
  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
