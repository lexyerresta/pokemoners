import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    minimumCacheTTL: 604800, // 7 days cache
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
};

export default nextConfig;
