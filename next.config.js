const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Add the HMR plugin only in development and client-side builds
    if (dev && !isServer) {
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return config;
  }
};

module.exports = nextConfig
