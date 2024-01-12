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
          },
          {
            protocol: 'https',
            hostname: 'nftstorage.link',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cloudflare-ipfs.com',
            port: '',
            pathname: '/ipfs/**',
          },
        ],
      },
      logging: {
        fetches: {
          fullUrl: true,
        },
      },
}

module.exports = nextConfig
