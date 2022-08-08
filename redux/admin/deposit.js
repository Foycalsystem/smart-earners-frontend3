import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// make deposit
export const makeDeposit= createAsyncThunk(
    'deposit/makeDeposit',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/deposit`, data, {
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

// get deposit
export const getDepositTnx= createAsyncThunk(
    'deposit/getDepositTnx',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/deposit/get-all`, {
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

// resolve deposit
export const handleResolve= createAsyncThunk(
    'deposit/handleResolve',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/deposit/resolve/${data.id}`, data.data, {
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
    deposit: { isLoading: false, status: false, msg: ''},
    txns: { isLoading: false, status: false, msg: '', data:[]},
    resolveDeposit: { isLoading: false, status: false, msg: '', data:''},
}

export const depositeReducer = createSlice({
    name: 'deposit',
    initialState,
    reducers:{
        handleResetDeposit(state){
            state.deposit.isLoading = false; state.deposit.status = false; state.deposit.msg = ''
            state.txns.isLoading = false; state.txns.status = false; state.txns.msg = ''
            state.resolveDeposit.isLoading = false; state.resolveDeposit.status = false; state.resolveDeposit.msg = ''
        }
    },
    extraReducers: {

        // make deposit request
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
        
        // get deposit txn
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

         // get deposit txn
         [handleResolve.pending]: (state)=>{
            state.resolveDeposit.isLoading = true;
        },
        [handleResolve.fulfilled]: (state, {payload})=>{
            state.resolveDeposit.isLoading = false;
            state.resolveDeposit.status = payload.status;
            state.resolveDeposit.msg = payload.msg;

            // get the current state
            const currentState = JSON.parse(JSON.stringify(state.txns.data));
            

            // find the id index and replace the data in payload
            const newState = currentState.filter(d=>{
                return d._id !== payload.data._id
            })
            
            state.txns.data = newState;
        },
        [handleResolve.rejected]: (state, {payload})=>{
            state.resolveDeposit.isLoading = false;
            if(payload){
                state.resolveDeposit.status = payload.status;
                state.resolveDeposit.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.resolveDeposit.status = false;
                state.resolveDeposit.msg = 'Error occured';
            }
        },
    }
})

export const {handleResetDeposit} = depositeReducer.actions
export default depositeReducer.reducer