import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


export const getSelectedTestimonials= createAsyncThunk(
    'testimonial/getSelectedTestimonials',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/testimonials/get-selected`);
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

export const postTestimonial= createAsyncThunk(
    'testimonial/postTestimonial',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/testimonials/post`, data)
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

export const getAllTestimonials= createAsyncThunk(
    'testimonial/getAllTestimonials',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.get(`/testimonials/get-all`, {
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

export const handleRemove= createAsyncThunk(
    'testimonial/remove',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/testimonials/remove/${id}`,{}, {
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

export const handleDelete= createAsyncThunk(
    'testimonial/del',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.delete(`/testimonials/delete/${id}`, {
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
    allTestimonials: { isLoading: false, status: false, msg: '', data:[]},
    selectedTestimonials: { isLoading: false, status: false, msg: '', data:[]},
    oneTestimonials: { isLoading: false, status: false, msg: '', data:{}},
    post: { isLoading: false, status: false, msg: ''},
    remove: { isLoading: false, status: false, msg: ''},
    del: { isLoading: false, status: false, msg: ''},
}

export const testimonialReducer = createSlice({
    name: 'plans',
    initialState,
    extraReducers: {
        // get all testimonials
        [getAllTestimonials.pending]: (state)=>{
            state.allTestimonials.isLoading = true;
        },
        [getAllTestimonials.fulfilled]: (state, {payload})=>{
            state.allTestimonials.isLoading = false;
            state.allTestimonials.status = payload.status;
            state.allTestimonials.msg = payload.msg;
            state.allTestimonials.data = payload.data
        },
        [getAllTestimonials.rejected]: (state, {payload})=>{
            state.allTestimonials.isLoading = false;
            if(payload){
                state.allTestimonials.status = payload.status;
                state.allTestimonials.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.allTestimonials.status = false;
                state.allTestimonials.msg = 'Error occured';
            }
        },
        
        // get selected testimonials
        [getSelectedTestimonials.pending]: (state)=>{
            state.selectedTestimonials.isLoading = true;
        },
        [getSelectedTestimonials.fulfilled]: (state, {payload})=>{
            state.selectedTestimonials.isLoading = false;
            state.selectedTestimonials.status = payload.status;
            state.selectedTestimonials.msg = payload.msg;
            state.selectedTestimonials.data = payload.data
        },
        [getSelectedTestimonials.rejected]: (state, {payload})=>{
            state.selectedTestimonials.isLoading = false;
            if(payload){
                state.selectedTestimonials.status = payload.status;
                state.selectedTestimonials.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.selectedTestimonials.status = false;
                state.selectedTestimonials.msg = 'Error occured';
            }
        },

        // post a testimonial
        [postTestimonial.pending]: (state)=>{
            state.post.isLoading = true;
        },
        [postTestimonial.fulfilled]: (state, {payload})=>{
            state.post.isLoading = false;
            state.post.status = payload.status;
            state.post.msg = payload.msg;
            state.selectedTestimonials.data.push(payload.data)
        },
        [postTestimonial.rejected]: (state, {payload})=>{
            state.post.isLoading = false;
            if(payload){
                state.post.status = payload.status;
                state.post.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.post.status = false;
                state.post.msg = 'Error occured';
            }
        },

        // handleDelete a testimonial
        [handleDelete.pending]: (state)=>{
            state.del.isLoading = true;
        },
        [handleDelete.fulfilled]: (state, {payload})=>{
            state.del.isLoading = false;
            state.del.status = payload.status;
            state.del.msg = payload.msg;
            // get the returned data and replace the existing one
            // const currentState = current(state).selectedTestimonials.data
            // const newState = currentState.filter(d=>{
            //     return d._id !== payload.data._id
            // })
            // state.selectedTestimonials.data = newState;
            // console.log(current(selectedTestimonials))
            
        },
        [handleDelete.rejected]: (state, {payload})=>{
            state.del.isLoading = false;
            if(payload){
                state.del.status = payload.status;
                state.del.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.del.status = false;
                state.del.msg = 'Error occured';
            }
        },

        // handleRemove a testimonial
        [handleRemove.pending]: (state)=>{
            state.remove.isLoading = true;
        },
        [handleRemove.fulfilled]: (state, {payload})=>{
            state.remove.isLoading = false;
            state.remove.status = payload.status;
            state.remove.msg = payload.msg;
            // const currentState = current(state.selectedTestimonials.data);
            // // find the id index and replace the data in payload
            // const index = currentState.findIndex(data=>{
            //     return payload.data._id === data._id
            // })
            
            // state.selectedTestimonials.data[index] = payload.data;
        },
        [handleRemove.rejected]: (state, {payload})=>{
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

export default testimonialReducer.reducer