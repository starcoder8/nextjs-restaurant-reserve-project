/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: '/nextjs-restaurant-reserve-project', // repo name
  assetPrefix: '/nextjs-restaurant-reserve-project/', // repo name
};

module.exports = nextConfig;
