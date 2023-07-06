/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const config = {
  env: {
    API_KEY: process.env.API_KEY,
    BACKEND_SERVRE_PATH: process.env.BACKEND_SERVRE_PATH
  }
};

module.exports = config;
