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
            const res = await axios.post(`/investment/set-plan`, data, {
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

export const handleUpdate= createAsyncThunk(
    'config/handleUpdate',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/investment/update-plan/${data.id}`, data.data, {
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

// delete plan
export const handleDelete= createAsyncThunk(
    'config/handleDelete',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.delete(`/investment/delete-plan/${id}`,{
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


// delete plan
export const adminGetAllinvestmentsTnx= createAsyncThunk(
    'config/adminGetAllinvestmentsTnx',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/investment/get-all-investments-admin`,{
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
    plans: { isLoading: false, status: false, msg: '', data: []},
    add: { isLoading: false, status: false, msg: ''},
    update: { isLoading: false, status: false, msg: ''},
    deletePlan: { isLoading: false, status: false, msg: ''},
    investmentTxnAdmin: { isLoading: false, status: false, msg: '', data: []},
}

export const plansReducer = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        handleResetPlan(state){
            state.plans.isLoading = false; state.plans.status = false; state.plans.msg = '';
            state.add.isLoading = false; state.add.status = false; state.add.msg = '';
            state.update.isLoading = false; state.update.status = false; state.update.msg = '';
            state.deletePlan.isLoading = false; state.deletePlan.status = false; state.deletePlan.msg = '';
            state.investmentTxnAdmin.isLoading = false; state.investmentTxnAdmin.status = false; state.investmentTxnAdmin.msg = '';
        }
    },
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

        // delete plan
        [adminGetAllinvestmentsTnx.pending]: (state)=>{
            state.investmentTxnAdmin.isLoading = true;
        },
        [adminGetAllinvestmentsTnx.fulfilled]: (state, {payload})=>{
            state.investmentTxnAdmin.isLoading = false;
            state.investmentTxnAdmin.status = payload.status;
            state.investmentTxnAdmin.msg = payload.msg;
            state.investmentTxnAdmin.data = payload.data;

        },
        [adminGetAllinvestmentsTnx.rejected]: (state, {payload})=>{
            state.investmentTxnAdmin.isLoading = false;
            if(payload){
                state.investmentTxnAdmin.status = payload.status;
                state.investmentTxnAdmin.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.investmentTxnAdmin.status = false;
                state.investmentTxnAdmin.msg = 'Error occured';
            }
        }, 
    }
    
})

export const {handleResetPlan} = plansReducer.actions
export default plansReducer.reducer