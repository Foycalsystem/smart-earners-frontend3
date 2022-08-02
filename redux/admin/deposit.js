import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// request
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
                console.log(err.response.data)
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

    }
    
})

export default depositeReducer.reducer