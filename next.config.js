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
        // destination: 'http://localhost:4000/:slug*'
        destination: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/:slug*' : (process.env.NEXT_PUBLIC_MODE ? 'https://api.teamsmartearners.com/:slug*' : 'https://whale-app-9gpbp.ondigitalocean.app/:slug*')
      }
    ]
  }
   
}


module.exports = nextConfig
