/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turn off static export
  output: 'standalone',
  // Ignore errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this to avoid image optimization errors
  images: {
    unoptimized: true,
  },
  // Disable strict mode for CSS
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;