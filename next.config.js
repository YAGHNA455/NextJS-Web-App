/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
  // Explicitly set this to ensure we're not using static exports
  output: 'standalone',
};

module.exports = nextConfig;