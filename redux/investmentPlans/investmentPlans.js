import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/config';
import Cookies from 'js-cookie'

// logout in action
export const getPlans= createAsyncThunk(
    'config/getPlans',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/investment/get-all-plans`)
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

export const handleAdd= createAsyncThunk(
    'config/handleAdd',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/investment/set-plan`, data, {
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

export const handleUpdate= createAsyncThunk(
    'config/handleUpdate',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/investment/update-plan/${data.id}`, data.data, {
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

// delete plan
export const handleDelete= createAsyncThunk(
    'config/handleDelete',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.delete(`/investment/delete-plan/${id}`,{
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
    plans: { isLoading: false, status: false, msg: '', data: []},
    add: { isLoading: false, status: false, msg: ''},
    update: { isLoading: false, status: false, msg: ''},
    deletePlan: { isLoading: false, status: false, msg: ''},
}

export const plansReducer = createSlice({
    name: 'plans',
    initialState,
    extraReducers: {
        // get plans
        [getPlans.pending]: (state)=>{
            state.plans.isLoading = true;
        },
        [getPlans.fulfilled]: (state, {payload})=>{
            state.plans.isLoading = false;
            state.plans.status = payload.status;
            state.plans.msg = payload.msg;
            state.plans.data = payload.data
        },
        [getPlans.rejected]: (state, {payload})=>{
            state.plans.isLoading = false;
            if(payload){
                state.plans.status = payload.status;
                state.plans.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.plans.status = false;
                state.plans.msg = 'Error occured';
            }
        },  
        
        // add plan
        [handleAdd.pending]: (state)=>{
            state.add.isLoading = true;
        },
        [handleAdd.fulfilled]: (state, {payload})=>{
            state.add.isLoading = false;
            state.add.status = payload.status;
            state.add.msg = payload.msg;
            state.plans.data.push(payload.data)
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
        
        // update plan
        [handleUpdate.pending]: (state)=>{
            state.add.isLoading = true;
        },
        [handleUpdate.fulfilled]: (state, {payload})=>{
            state.add.isLoading = false;
            state.add.status = payload.status;
            state.add.msg = payload.msg;
            //get the returned data and replace the existing one
            const currentState = current(state.plans.data);
            // find the id index and replace the data in payload
            const index = currentState.findIndex(data=>{
                return payload.data._id === data._id
            })
            
            state.plans.data[index] = payload.data;

        },

        
        [handleUpdate.rejected]: (state, {payload})=>{
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

        // delete plan
        [handleDelete.pending]: (state)=>{
            state.deletePlan.isLoading = true;
        },
        [handleDelete.fulfilled]: (state, {payload})=>{
            state.deletePlan.isLoading = false;
            state.deletePlan.status = payload.status;
            state.deletePlan.msg = payload.msg;
            
            const planState = current(state).plans.data
            const newPlans = planState.filter(plan=>{
                return plan._id !== payload.data._id
            })
            state.plans.data = newPlans;

        },
        [handleDelete.rejected]: (state, {payload})=>{
            state.deletePlan.isLoading = false;
            if(payload){
                state.deletePlan.status = payload.status;
                state.deletePlan.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.deletePlan.status = false;
                state.deletePlan.msg = 'Error occured';
            }
        }, 
    }
    
})

export default plansReducer.reducer