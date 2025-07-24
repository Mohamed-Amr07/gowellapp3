/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/gowellapp2',
  assetPrefix: '/gowellapp2/',
};

module.exports = nextConfig;
