/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s3-alpha-sig.figma.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "images.unsplash.com"]
  },
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
}

module.exports = nextConfig