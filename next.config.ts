import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: 'nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
