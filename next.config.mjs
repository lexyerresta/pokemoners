/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.tcgdex.net',
      },
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
      },
      {
        protocol: 'https',
        hostname: 'tcgplayer-cdn.tcgplayer.com'
      },
      {
        protocol: 'https',
        hostname: 'images.scrydex.com'
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/pokemon',
        destination: '/cards',
        permanent: true,
      },
      {
        source: '/pokemon/:id',
        destination: '/cards',
        permanent: true,
      }
    ]
  },
  allowedDevOrigins: ['192.168.170.42'],
};

export default nextConfig;
