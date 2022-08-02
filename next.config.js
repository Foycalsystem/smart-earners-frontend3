/** @type {import('next').NextConfig} */
const url = "http://localhost:4000/";
const url_slug = "http://localhost:4000/";

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
      // {
        {
          source: "/:slug*",
          // destination: "http://localhost:4000/:slug*",
          destination: "https://api.teamsmartearners.com/:slug*"
        }
      //   // de 1qastination: "https://squid-app-cqsgv.ondigitalocean.app/:slug*"
      // },

      // {
      //   source: "/get-profile",
      //   destination: "http://localhost:4000/",
      //   // destination: "https://api.teamsmartearners.com/:slug*",
      //   // de 1qastination: "https://squid-app-cqsgv.ondigitalocean.app/:slug*"
      // },

      // {source: "/auth/signin", destination: url},
      // {source: "/auth/logout", destination: url},
      // {source: "/auth/reset-pass-request", destination: url},
      // {source: "/auth/reset-pass", destination: url},
      // {source: "/auth/verify-account", destination: url},
      // {source: "/auth/get-profile", destination: "http://localhost:4000/"},
      // {source: "/auth/resend-verification-link", destination: url},
      // {source: "/auth/get-all-users", destination: url},

      // {source: "/auth/delete-account/slug", destination: url},
      // {source: "/auth/block-user/slug", destination: url},
      // {source: "/auth/unblock-user/slug", destination: url},
      // {source: "/auth/make-admin/slug", destination: url},
      // {source: "/auth/remove-admin/slug", destination: url},


      // // transfer
      // {source: "/transfer/check-user", destination: url},
      // {source: "/transfer/pay-user", destination: url},

      
      // // website configuration
      // {source: "/config/get", destination: url},
      // {source: "/config/update", destination: url},

      // // withdrawal
      // {source: "/withdrawal/request", destination: url},
      // {source: "/withdrawal/rejected", destination: url},
      // {source: "/withdrawal/confirm", destination: url},
      // {source: "/withdrawal/get-all-transactions", destination: url},
      // {source: "/withdrawal/get-transaction", destination: url},

      // // investment
      // {source: "/investment/get-all-investments", destination: url},
      // {source: "/investment/invest", destination: url},

      // // investment plans
      // {source: "/investment/get-all-plans", destination: url},
      // {source: "/investment/set-plan", destination: url},
      // {source: "/investment/update-plan", destination: url},
      // {source: "/investment/delete-plan", destination: url},


      // // feedback
      // {source: "/testimonials/get-selected", destination: url},
      // {source: "/testimonials/get-all", destination: url},
      // {source: "/testimonials/remove", destination: url},
      // {source: "/testimonials/delete", destination: url},
      
    ]
  }
   
}


module.exports = nextConfig
