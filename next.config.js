/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SITE_URL: process.env.SITE_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/contacts',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/contacts',
        destination: `${process.env.FAKER_API}`,
      },
    ]
  },
}

module.exports = nextConfig
