import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// resend verification link
export const checkUser= createAsyncThunk(
    'transfer/check-user',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/transfer/check-user`, data, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                    }
                });
                return res.data;
            }            
        }
        catch(err){
            if(err.response.data){
                return rejectWithValue({status: false, msg: err.response.data.msg});
            }
            else{
                return rejectWithValue({status: false, msg: err.message, data: ''});
            }
        }
    }
)

// resend verification link
export const payUser= createAsyncThunk(
    'transfer/pay-user',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/transfer/pay-user`, data, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                    }
                });
                return res.data;
            }            
        }
        catch(err){
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
    check: { isLoading: false, status: false, msg: '', data: ''},
    pay: { isLoading: false, status: false, msg: ''},
}

export const transferReducer = createSlice({
    name: 'transfer',
    initialState,
    extraReducers: {

        // check user
        [checkUser.pending]: (state)=>{
            state.check.isLoading = true;
        },
        [checkUser.fulfilled]: (state, {payload})=>{
            state.check.isLoading = false;
            state.check.status = payload.status;
            state.check.msg = payload.msg;
            state.check.data = payload.data;
        },
        [checkUser.rejected]: (state, {payload})=>{
            state.check.isLoading = false;
            if(payload){
                state.check.status = payload.status;
                state.check.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.check.status = false;
                state.check.msg = 'Error occured';
            }
        },

        // pay user
        [payUser.pending]: (state)=>{
            state.pay.isLoading = true;
        },
        [payUser.fulfilled]: (state, {payload})=>{
            state.pay.isLoading = false;
            state.pay.status = payload.status;
            state.pay.msg = payload.msg;
        },
        [payUser.rejected]: (state, {payload})=>{
            state.pay.isLoading = false;
            if(payload){
                state.pay.status = payload.status;
                state.pay.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.pay.status = false;
                state.pay.msg = 'Error occured';
            }
        },
    }
    
})

export default transferReducer.reducer