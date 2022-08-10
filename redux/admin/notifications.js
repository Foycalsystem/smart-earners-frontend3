import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// handle get notifications
export const getNotif= createAsyncThunk(
    'notification/getNotif',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/notification/get-all`, {
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
                return rejectWithValue({status: false, msg: err.message});
            }
        }
    }
)

// handle set notifications
export const handleAdd= createAsyncThunk(
    'notification/handleAdd',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/notification/set`, data, {
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
                return rejectWithValue({status: false, msg: err.message});
            }
        }
    }
)

const initialState = {
    add: { isLoading: false, status: false, msg: ''},
    notif: { isLoading: false, status: false, msg: ''},
}

export const notificationReducer = createSlice({
    name: 'notification',
    initialState,
   reducers: {
    resetNotif(state){
        state.add.isLoading = false; state.add.status = false; state.add.msg = '';
        state.notif.isLoading = false; state.notif.status = false; state.notif.msg = '';
    }
   },
    extraReducers: {

         // set notif
         [handleAdd.pending]: (state)=>{
            state.add.isLoading = true;
        },
        [handleAdd.fulfilled]: (state, {payload})=>{
            state.add.isLoading = false;
            state.add.status = payload.status;
            state.add.msg = payload.msg;
        },
        [handleAdd.rejected]: (state, {payload})=>{
            state.add.isLoading = false;
            if(payload){
                state.add.status = payload.status;
                state.add.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.add.status = false;
                state.add.msg = 'Error occured';
            }
        },
        //get notif
        [getNotif.pending]: (state)=>{
            state.notif.isLoading = true;
        },
        [getNotif.fulfilled]: (state, {payload})=>{
            state.notif.isLoading = false;
            state.notif.status = payload.status;
            state.notif.msg = payload.msg;
            state.notif.data = payload.data;
        },
        [getNotif.rejected]: (state, {payload})=>{
            state.notif.isLoading = false;
            if(payload){
                state.notif.status = payload.status;
                state.notif.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.notif.status = false;
                state.notif.msg = 'Error occured';
            }
        },
    }
    
})

export const {resetNotif} = notificationReducer.actions
export default notificationReducer.reducer