/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  },
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  }
}

module.exports = nextConfig
