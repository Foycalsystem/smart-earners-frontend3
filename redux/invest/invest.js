import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/config';
import Cookies from 'js-cookie'


export const getTxn= createAsyncThunk(
    'investment/getTxn',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.get(`/investment/get-all-investments`, {
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

export const investPlan= createAsyncThunk(
    'investment/invest',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/investment/invest/${data.id}`, {amount: data.amount}, {
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
    invest: { isLoading: false, status: false, msg: ''},
    txn: { isLoading: false, status: false, msg: '', data: []},
}

export const investmentReducer = createSlice({
    name: 'plans',
    initialState,
    extraReducers: {  
        
        // get transactions
        [getTxn.pending]: (state)=>{
            state.txn.isLoading = true;
        },
        [getTxn.fulfilled]: (state, {payload})=>{
            state.txn.isLoading = false;
            state.txn.status = payload.status;
            state.txn.msg = payload.msg;
            state.txn.data = payload.data;
        },
        [getTxn.rejected]: (state, {payload})=>{
            state.txn.isLoading = false;
            if(payload){
                state.txn.status = payload.status;
                state.txn.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.txn.status = false;
                state.txn.msg = 'Error occured';
            }
        },

        // invest
        [investPlan.pending]: (state)=>{
            state.invest.isLoading = true;
        },
        [investPlan.fulfilled]: (state, {payload})=>{
            state.invest.isLoading = false;
            state.invest.status = payload.status;
            state.invest.msg = payload.msg;
            state.txn.data.push(payload.data)
        },
        [investPlan.rejected]: (state, {payload})=>{
            state.invest.isLoading = false;
            if(payload){
                state.invest.status = payload.status;
                state.invest.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.invest.status = false;
                state.invest.msg = 'Error occured';
            }
        }, 
        
        
    }
    
})

export default investmentReducer.reducer