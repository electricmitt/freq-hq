/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    RIFFUSION_API_TOKEN: process.env.RIFFUSION_API_TOKEN,
  },
}

module.exports = nextConfig 