/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Three.js CDN in scripts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
