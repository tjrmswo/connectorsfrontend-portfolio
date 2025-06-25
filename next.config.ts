import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BUCKET}/**`)],
  },
};

export default nextConfig;
