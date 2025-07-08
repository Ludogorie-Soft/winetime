const ContentSecurityPolicy = require('./csp')
const redirects = require('./redirects')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL
  },
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'winetime.bg',
      'www.winetime.bg',
      process.env.NEXT_PUBLIC_SERVER_URL
    ]
      .filter(Boolean)
      .map(url => url.replace(/https?:\/\//, ''))
  },
  redirects,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'index' }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy }
        ]
      }
    ]
  }
}
