/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable image optimization for static export if needed
  images: {
    unoptimized: true,
  },
  // Disable server components features if needed
  experimental: {
    appDir: true,
  },
  // Disable strict mode for CSS
  compiler: {
    // Enables the styled-components SWC transform if you're using styled-components
    styledComponents: true
  },
  // Cache settings
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Optional: disable caching if it's causing issues
    config.cache = false;
    
    return config;
  },
  // Disable server-only checks
  serverComponents: false,
  // Add trailing slash to URLs if needed
  trailingSlash: false,
  // If needed, add custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // If you're having routing issues
  async rewrites() {
    return [];
  },
  // If you need specific redirects
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;