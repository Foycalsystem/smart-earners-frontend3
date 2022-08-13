/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // enables the styled-components SWC transform
    styledComponents: true,
    eslint: {
      ignoreDuringBuilds: true
    }
  },
  
  async rewrites(){
    return [
      {
        source: "/:slug*",
        destination: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/:slug*' : 'https://smartearnersbackend-prod.herokuapp.com/:slug*'
      }
    ]
  }
   
}


module.exports = nextConfig
