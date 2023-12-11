/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'careerzen.org',
            port: '',
            pathname: '/images/**',
          },
          {
            protocol: 'https',
            hostname: 'ipfs.io',
            port: '',
            pathname: '/ipfs/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
      logging: {
        fetches: {
          fullUrl: true,
        },
      },
}

module.exports = nextConfig
