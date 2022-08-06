import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';

export const getBounus= createAsyncThunk(
    'referral/getBounus',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/referral-bonus/get-all-hx`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            console.log(res.data)
            return res.data;  
        }
        catch(err){
            console.log(err)
            if(err.response.data){
                return rejectWithValue({status: false, msg: err.response.data.msg});
            }
            else{
                return rejectWithValue({status: false, msg: err.message});
            }
        }
    }
)


const initialState = {
    bonus: { isLoading: false, status: false, msg: '', data: []},
}

export const referralReducer = createSlice({
    name: 'referral',
    initialState,
    extraReducers: {  
        
        // get referral hx
        [getBounus.pending]: (state)=>{
            state.bonus.isLoading = true;
        },
        [getBounus.fulfilled]: (state, {payload})=>{
            state.bonus.isLoading = false;
            state.bonus.status = payload.status;
            state.bonus.msg = payload.msg;
            state.bonus.data = payload.data;
        },
        [getBounus.rejected]: (state, {payload})=>{
            state.bonus.isLoading = false;
            if(payload){
                state.bonus.status = payload.status;
                state.bonus.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.bonus.status = false;
                state.bonus.msg = 'Error occured';
            }
        },
        
    }
    
})

export default referralReducer.reducer