/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  // turbopack: {
  //   resolveAlias: {
  //     // Handle fs module resolution for client-side
  //     fs: false
  //   }
  // },
  output: 'standalone',
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  }
}

module.exports = nextConfig
