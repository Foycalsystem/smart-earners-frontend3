/** @type {import('next').NextConfig} */

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/:slug*' : (process.env.NEXT_PUBLIC_MODE === "test" ? 'https://jellyfish-app-3ccuo.ondigitalocean.app/:slug*' : 'https://api.teamsmartearners.com/:slug*')

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
        destination: url
      }
    ]
  }
   
}


module.exports = nextConfig
