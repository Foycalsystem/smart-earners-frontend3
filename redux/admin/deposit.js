import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// make deposit
export const makeDeposit= createAsyncThunk(
    'deposit/makeDeposit',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/deposit`, data, {
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

// make deposit
export const getDepositTnx= createAsyncThunk(
    'deposit/getDepositTnx',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.get(`/deposit/get-all`, data, {
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




const initialState = {
    deposit: { isLoading: false, status: false, msg: ''},
    txns: { isLoading: false, status: false, msg: '', data:[]},
}

export const depositeReducer = createSlice({
    name: 'deposit',
    initialState,
    extraReducers: {

        // make withdrawal request
        [makeDeposit.pending]: (state)=>{
            state.deposit.isLoading = true;
        },
        [makeDeposit.fulfilled]: (state, {payload})=>{
            state.deposit.isLoading = false;
            state.deposit.status = payload.status;
            state.deposit.msg = payload.msg;
            state.deposit.data = payload.data;
        },
        [makeDeposit.rejected]: (state, {payload})=>{
            state.deposit.isLoading = false;
            if(payload){
                state.deposit.status = payload.status;
                state.deposit.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.deposit.status = false;
                state.deposit.msg = 'Error occured';
            }
        },
        // make withdrawal request
        [getDepositTnx.pending]: (state)=>{
            state.txns.isLoading = true;
        },
        [getDepositTnx.fulfilled]: (state, {payload})=>{
            state.txns.isLoading = false;
            state.txns.status = payload.status;
            state.txns.msg = payload.msg;
            state.txns.data = payload.data;
        },
        [getDepositTnx.rejected]: (state, {payload})=>{
            state.txns.isLoading = false;
            if(payload){
                state.txns.status = payload.status;
                state.txns.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.txns.status = false;
                state.txns.msg = 'Error occured';
            }
        },


    }
    
})

export default depositeReducer.reducer