/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'gbf.wiki'],
  },
  env: {
    etherscanAPI: process.env.ETHERSCAN_APIKEY,
  },
}
