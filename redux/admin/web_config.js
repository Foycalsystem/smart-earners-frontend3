import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'
import { BACKEND_BASE_URL } from '../../utils/config';

// logout in action
export const getConfig= createAsyncThunk(
    'config/getConfig',
    async(data, {rejectWithValue})=>{
        try{
            
            const res = await axios.get(`/config/get`)
            return res.data
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

// resend verification link
export const updateConfig= createAsyncThunk(
    'auth/updateConfig',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/config/update`, data, {
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
    config: { isLoading: false, status: false, msg: '', data: ''},
}

export const configReducer = createSlice({
    name: 'config',
    initialState,
    extraReducers: {

        // get config data
        [getConfig.pending]: (state)=>{
            state.config.isLoading = true;
        },
        [getConfig.fulfilled]: (state, {payload})=>{
            state.config.isLoading = false;
            state.config.status = payload.status;
            state.config.msg = payload.msg;
            state.config.data = payload.data
        },
        [getConfig.rejected]: (state, {payload})=>{
            state.config.isLoading = false;
            if(payload){
                state.config.status = payload.status;
                state.config.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.config.status = false;
                state.config.msg = 'Error occured';
            }
        }, 
        
        // updated config data
        [updateConfig.pending]: (state)=>{
            state.config.isLoading = true;
        },
        [updateConfig.fulfilled]: (state, {payload})=>{
            state.config.isLoading = false;
            state.config.status = payload.status;
            state.config.msg = payload.msg;
            state.config.data = payload.data
        },
        [updateConfig.rejected]: (state, {payload})=>{
            state.config.isLoading = false;
            if(payload){
                state.config.status = payload.status;
                state.config.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.config.status = false;
                state.config.msg = 'Error occured';
            }
        }, 
    }
    
})

export default configReducer.reducer