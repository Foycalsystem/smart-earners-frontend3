import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';

export const getBounus= createAsyncThunk(
    'referral/getBounus',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/referral-bonus/get-all-hx`, {
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

export const getTotalBounus= createAsyncThunk(
    'referral/getTotalBounus',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/referral-bonus/get-all-hx-total`, {
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

export const getAllContests= createAsyncThunk(
    'referral/getAllContests',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/referral-contest/get-all`);
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

export const rewardQualifiedUsers= createAsyncThunk(
    'referral/rewardQualifiedUsers',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/referral-contest/resolve`, {}, {
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

export const resetData= createAsyncThunk(
    'referral/resetData',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/referral-contest/reset`, {}, {
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

export const removeUser= createAsyncThunk(
    'referral/removeUser',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.delete(`/referral-contest/remove-user/${id}`, {
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
    bonus: { isLoading: false, status: false, msg: '', data: []},
    totalBonus: { isLoading: false, status: false, msg: '', data: []},
    addCode: { isLoading: false, status: false, msg: ''},
    contestants: { isLoading: false, status: false, msg: ''},
    resolve: { isLoading: false, status: false, msg: ''},
    reset: { isLoading: false, status: false, msg: ''},
    remove: { isLoading: false, status: false, msg: ''},
}

export const referralReducer = createSlice({
    name: 'referral',
    initialState,
    reducers: {
        resetBonusMsg(state){
            state.bonus.isLoading = false; state.bonus.status = false;state.bonus.msg = '';
            state.totalBonus.isLoading = false; state.totalBonus.status = false;state.totalBonus.msg = '';
            state.contestants.isLoading = false; state.contestants.status = false;state.contestants.msg = '';
            state.resolve.isLoading = false; state.resolve.status = false;state.resolve.msg = '';
            state.reset.isLoading = false; state.reset.status = false;state.reset.msg = '';
            state.remove.isLoading = false; state.remove.status = false;state.remove.msg = '';
        }
    },
    extraReducers: {  
        
        // get referral hx
        [getBounus.pending]: (state)=>{
            state.bonus.isLoading = true;
        },
        [getBounus.fulfilled]: (state, {payload})=>{
            state.bonus.isLoading = false;
            state.bonus.status = payload.status;
            state.bonus.msg = payload.msg;
            state.bonus.data = payload.data;
        },
        [getBounus.rejected]: (state, {payload})=>{
            state.bonus.isLoading = false;
            if(payload){
                state.bonus.status = payload.status;
                state.bonus.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.bonus.status = false;
                state.bonus.msg = 'Error occured';
            }
        }, 
        
        // get all referral hx
        [getTotalBounus.pending]: (state)=>{
            state.totalBonus.isLoading = true;
        },
        [getTotalBounus.fulfilled]: (state, {payload})=>{
            state.totalBonus.isLoading = false;
            state.totalBonus.status = payload.status;
            state.totalBonus.msg = payload.msg;
            state.totalBonus.data = payload.data;
        },
        [getTotalBounus.rejected]: (state, {payload})=>{
            state.totalBonus.isLoading = false;
            if(payload){
                state.totalBonus.status = payload.status;
                state.totalBonus.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.totalBonus.status = false;
                state.totalBonus.msg = 'Error occured';
            }
        }, 



        // get all referral contest
        [getAllContests.pending]: (state)=>{
            state.contestants.isLoading = true;
        },
        [getAllContests.fulfilled]: (state, {payload})=>{
            state.contestants.isLoading = false;
            state.contestants.status = payload.status;
            state.contestants.msg = payload.msg;
            state.contestants.data = payload.data;
        },
        [getAllContests.rejected]: (state, {payload})=>{
            state.contestants.isLoading = false;
            if(payload){
                state.contestants.status = payload.status;
                state.contestants.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.contestants.status = false;
                state.contestants.msg = 'Error occured';
            }
        },
        
        // reward users
        [rewardQualifiedUsers.pending]: (state)=>{
            state.resolve.isLoading = true;
        },
        [rewardQualifiedUsers.fulfilled]: (state, {payload})=>{
            state.resolve.isLoading = false;
            state.resolve.status = payload.status;
            state.resolve.msg = payload.msg;
            state.contestants.data = payload.data;
        },
        [rewardQualifiedUsers.rejected]: (state, {payload})=>{
            state.resolve.isLoading = false;
            if(payload){
                state.resolve.status = payload.status;
                state.resolve.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.resolve.status = false;
                state.resolve.msg = 'Error occured';
            }
        },

        // clear data
        [resetData.pending]: (state)=>{
            state.reset.isLoading = true;
        },
        [resetData.fulfilled]: (state, {payload})=>{
            state.reset.isLoading = false;
            state.reset.status = payload.status;
            state.reset.msg = payload.msg;
            state.contestants.data = payload.data;
        },
        [resetData.rejected]: (state, {payload})=>{
            state.reset.isLoading = false;
            if(payload){
                state.reset.status = payload.status;
                state.reset.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.reset.status = false;
                state.reset.msg = 'Error occured';
            }
        },

        // clear data
        [removeUser.pending]: (state)=>{
            state.remove.isLoading = true;
        },
        [removeUser.fulfilled]: (state, {payload})=>{
            state.remove.isLoading = false;
            state.remove.status = payload.status;
            state.remove.msg = payload.msg;
            state.contestants.data = payload.data;
        },
        [removeUser.rejected]: (state, {payload})=>{
            state.remove.isLoading = false;
            if(payload){
                state.remove.status = payload.status;
                state.remove.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.remove.status = false;
                state.remove.msg = 'Error occured';
            }
        },
    }
    
})
export const {resetBonusMsg} = referralReducer.actions
export default referralReducer.reducer