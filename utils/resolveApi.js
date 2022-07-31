import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from './config';


const resolveApi = {
    generateAccesstoken: async()=>{
        try{
            if(Cookies.get('refreshtoken')){

                const res = await axios.get(`/auth/generate-accesstoken`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('refreshtoken')}`
                    }
                })

                return;
            }
            else{
                return
            }
        }
        catch(err){
            return
        }
    },

    authorize: async()=>{
        try{
            if(Cookies.get('accesstoken')){

                const res = await axios.get(`/auth/authorize`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                    }
                })
                return;
            }
            else{
                return 
            }
        }
        catch(err){
            return
        }
    },

    resolveInvestment: async()=>{
        try{
            const res = await axios.get(`/investment/resolve`)
            return;
        }
        catch(err){
            return
        }
    },

    removeUnverifiedusers: async()=>{
        try{
            const res = await axios.delete(`/auth/remove-unverified-users`)
            return;
        }
        catch(err){
            return
        }
    }
}


export {resolveApi}