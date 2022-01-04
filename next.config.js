/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'gbf.wiki', 'raw.githubusercontent.com'],
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}
