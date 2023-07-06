/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const config = {
  env: {
    API_KEY: process.env.API_KEY
  }
};

module.exports = config;
