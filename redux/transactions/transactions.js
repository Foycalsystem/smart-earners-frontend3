import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';

// get txn hx
export const getTnx= createAsyncThunk(
    'deposit/getTnx',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/transactions/getAll`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            return res.data;           
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


// get txn hx
export const getTrfTnx= createAsyncThunk(
    'deposit/getTransferTnx',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/transfer/get-all-transactions-user`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            return res.data;           
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
    txns: { isLoading: false, status: false, msg: '', data:[]},
    trfTxns: { isLoading: false, status: false, msg: '', id: '', data:[]},
}

export const transactionsReducer = createSlice({
    name: 'deposit',
    initialState,
    extraReducers: {

        // get transaction hx
        [getTnx.pending]: (state)=>{
            state.txns.isLoading = true;
        },
        [getTnx.fulfilled]: (state, {payload})=>{
            state.txns.isLoading = false;
            state.txns.status = payload.status;
            state.txns.msg = payload.msg;
            state.txns.data = payload.data;
        },
        [getTnx.rejected]: (state, {payload})=>{
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

        // get transfer transaction hx
        [getTrfTnx.pending]: (state)=>{
            state.trfTxns.isLoading = true;
        },
        [getTrfTnx.fulfilled]: (state, {payload})=>{
            state.trfTxns.isLoading = false;
            state.trfTxns.status = payload.status;
            state.trfTxns.msg = payload.msg;
            state.trfTxns.id = payload.id;
            state.trfTxns.data = payload.data;
        },
        [getTrfTnx.rejected]: (state, {payload})=>{
            state.trfTxns.isLoading = false;
            if(payload){
                state.trfTxns.status = payload.status;
                state.trfTxns.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.trfTxns.status = false;
                state.trfTxns.msg = 'Error occured';
            }
        },
    }
})

export default transactionsReducer.reducer