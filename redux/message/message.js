import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const handleSendAdmin= createAsyncThunk(
    'message/handleSendAdmin',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/message/send-admin`, data);
            return res.data;  
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
    sendAdmin: { isLoading: false, status: false, msg: ''},
}

export const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        resetMsg(state){
            state.sendAdmin.isLoading = false; state.sendAdmin.status = false;state.sendAdmin.msg = '';
        }
    },
    extraReducers: {  
        
        // get referral hx
        [handleSendAdmin.pending]: (state)=>{
            state.sendAdmin.isLoading = true;
        },
        [handleSendAdmin.fulfilled]: (state, {payload})=>{
            state.sendAdmin.isLoading = false;
            state.sendAdmin.status = payload.status;
            state.sendAdmin.msg = payload.msg;
        },
        [handleSendAdmin.rejected]: (state, {payload})=>{
            state.sendAdmin.isLoading = false;
            if(payload){
                state.sendAdmin.status = payload.status;
                state.sendAdmin.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.sendAdmin.status = false;
                state.sendAdmin.msg = 'Error occured';
            }
        }, 
    }
    
})
export const {resetMsg} = messageReducer.actions
export default messageReducer.reducer