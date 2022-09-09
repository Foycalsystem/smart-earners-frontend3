import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// resend verification link
export const checkUser= createAsyncThunk(
    'transfer/check-user',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/transfer/check-user`, data, {
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

// resend verification link
export const getAllTxn= createAsyncThunk(
    'transfer/getAllTxn',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/transfer/get-all-transactions`, {
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

// resend verification link
export const getAllTxn_users= createAsyncThunk(
    'transfer/getAllTxn_users',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/transfer/get-all-transactions-users`, {
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
    check: { isLoading: false, status: false, msg: '', data: ''},
    transferTxn: { isLoading: false, status: false, msg: '', data: []},
    transferTxn_users: { isLoading: false, status: false, msg: '', data: []},
}

export const transferReducer = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        resetTransfer(state){
            state.check.isLoading = false; state.check.status = false; state.check.msg = '';
            state.transferTxn.isLoading = false; state.transferTxn.status = false; state.transferTxn.msg = '';
            state.transferTxn_users.isLoading = false; state.transferTxn_users.status = false; state.transferTxn_users.msg = '';
        }
    },
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

        // get user admin
        [getAllTxn.pending]: (state)=>{
            state.transferTxn.isLoading = true;
        },
        [getAllTxn.fulfilled]: (state, {payload})=>{
            state.transferTxn.isLoading = false;
            state.transferTxn.status = payload.status;
            state.transferTxn.msg = payload.msg;
            state.transferTxn.data = payload.data;
        },
        [getAllTxn.rejected]: (state, {payload})=>{
            state.transferTxn.isLoading = false;
            if(payload){
                state.transferTxn.status = payload.status;
                state.transferTxn.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.transferTxn.status = false;
                state.transferTxn.msg = 'Error occured';
            }
        },

        // get user -users
        [getAllTxn_users.pending]: (state)=>{
            state.transferTxn_users.isLoading = true;
        },
        [getAllTxn_users.fulfilled]: (state, {payload})=>{
            state.transferTxn_users.isLoading = false;
            state.transferTxn_users.status = payload.status;
            state.transferTxn_users.msg = payload.msg;
            state.transferTxn_users.data = payload.data;
        },
        [getAllTxn_users.rejected]: (state, {payload})=>{
            state.transferTxn_users.isLoading = false;
            if(payload){
                state.transferTxn_users.status = payload.status;
                state.transferTxn_users.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.transferTxn_users.status = false;
                state.transferTxn_users.msg = 'Error occured';
            }
        },
    }
    
})



export const {resetTransfer} = transferReducer.actions
export default transferReducer.reducer