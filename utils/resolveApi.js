import axios from 'axios';
import { BACKEND_BASE_URL } from './config';
import cookie from 'cookie';
import Cookies from 'js-cookie'
const MODE = process.env.NEXT_PUBLIC_MODE;


const resolveApi = {
  refreshToken: async(context, refreshtoken)=>{
      try{
          if(refreshtoken){
              // const res = await fetch('http://localhost:4000/')
              // const res = await axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : 'https://api.teamsmartearners.com/'}auth/generate-accesstoken`, {
              //   withCredentials: true,
              //   headers: {
              //         "Authorization": `Bearer ${refreshtoken}`,
              //       }
              //   })

              const res = await axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : (MODE === 'test' ? 'https://jellyfish-app-3ccuo.ondigitalocean.app/' : 'https://api.teamsmartearners.com/')}auth/generate-accesstoken`, {
                withCredentials: true,
                headers: {
                      "Authorization": `Bearer ${refreshtoken}`,
                    }
              })
                
              const access ={
                token: res.headers['set-cookie'][0].split("; ")[0].split("=")[1],
                max_age: res.headers['set-cookie'][0].split("; ")[1].split("=")[1]
              }
              const refresh ={
                token: res.headers['set-cookie'][1].split("; ")[0].split("=")[1],
                max_age: res.headers['set-cookie'][1].split("; ")[1].split("=")[1]
              }
              const authorize ={
                status: res.headers['set-cookie'][2].split("=")[1].split("; ")[0],
                type: res.headers['set-cookie'][3].split("=")[1].split("; ")[0],
              }
          
          
              context.res.setHeader('Set-Cookie', [
                cookie.serialize(
                  'refreshtoken', refresh.token,
                  {
                    maxAge: refresh.max_age,
                    sameSite: true,
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development'
                  },
                ),
          
                cookie.serialize(
                  'accesstoken', access.token,
                  {
                    maxAge: access.max_age,
                    sameSite: true,
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development'
                  },
                ),
                cookie.serialize(
                  'status', authorize.status,
                  {
                    maxAge: refresh.max_age,
                    sameSite: true,
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development'
                  },
                ),

                cookie.serialize(
                  'type', authorize.type,
                  {
                    maxAge: refresh.max_age,
                    sameSite: true,
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development'
                  },
                ),
              ])
            }
      }
      catch(err){
          // push to signup page
          return 
      }
  },

  resolveInvestment: async()=>{
      try{
          const res = await axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : (MODE === 'test' ? 'https://jellyfish-app-3ccuo.ondigitalocean.app/' : 'https://api.teamsmartearners.com/')}investment/resolve`, { withCredentials: true,})
          return;
      }
      catch(err){
          return
      }
  },

  removeUnverifiedusers: async()=>{
      try{
          // const res = await axios.delete(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : 'https://api.teamsmartearners.com/'}auth/remove-unverified-users`, { withCredentials: true,})

          const res = await axios.delete(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : (MODE === 'test' ? 'https://jellyfish-app-3ccuo.ondigitalocean.app/' : 'https://api.teamsmartearners.com/')}auth/remove-unverified-users`, { withCredentials: true,})

          return;
      }
      catch(err){
          return
      }
  },

  resolveReferralContest: async()=>{
    try{
        // const res = await axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : 'https://api.teamsmartearners.com/'}referral-contest/resolve`, { withCredentials: true,});

        const rest = await axios.get(`${process.env.NODE_ENV === 'development' ? `http://localhost:4000/` : (MODE === 'test' ? 'https://jellyfish-app-3ccuo.ondigitalocean.app/' : 'https://api.teamsmartearners.com/')}referral-contest/resolve`, { withCredentials: true,})
        return;
    }
    catch(err){
        return
    }
  },

  refreshTokenClinetSide: async()=>{
      try{
        if(Cookies.get('refreshtoken')){
          const res = await axios.get(`/auth/generate-accesstoken`, {
            headers: {
                  "Authorization": `Bearer ${Cookies.get('refreshtoken')}`,
                }
            })
          return res
        }

      }
      catch(err){
          return 
      }
  },

  resolveInvestmentClientSide: async()=>{
    // try{
    //     const res = await axios.get(`/investment/resolve`)
    //     return;
    // }
    // catch(err){
    //     return
    // }
  },

  resolve_In: async()=>{
    try{
        const res = await axios.get(`/investment/resolve-in`)
        return
    }
    catch(err){
        return
    }
  },

  removeUnverifiedusersClientSide: async()=>{
    try{
        const res = await axios.delete(`/auth/remove-unverified-users`)
        return;
    }
    catch(err){
        return
    }
  },



}


export {resolveApi}