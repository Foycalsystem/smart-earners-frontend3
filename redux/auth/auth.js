import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';


// sign up action
export const signup = createAsyncThunk(
    'auth/signup',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/auth/signup`, data)
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

// sign in action
export const signin= createAsyncThunk(
    'auth/signin',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/auth/signin`, data);
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

// logout in action
export const logout= createAsyncThunk(
    'auth/logout',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/auth/logout`)
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

// reset password request
export const resetPasswordRequest= createAsyncThunk(
    'auth/resetPasswordRequest',
    async(data, {rejectWithValue})=>{
        
        try{
            const res = await axios.post(`/auth/reset-pass-request`, data);
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

// reset password
export const resetPassword= createAsyncThunk(
    'auth/resetPassword',
    async(options, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/auth/reset-pass?token=${options.token}`, options.data);
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

// verify account
export const verifyAccount= createAsyncThunk(
    'auth/verifyAccount',
    async(token, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/auth/verify-account?token=${token}`);
            return res.data
        }
        catch(err){
            // console.log(err)
            if(err.response.data){
                return rejectWithValue({status: false, msg: err.response.data.msg});
            }
            else{
                return rejectWithValue({status: false, msg: err.message});
            }
        }
    }
)

// get profile
export const getUser= createAsyncThunk(
    'auth/getUser',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){

                const res = await axios.get(`/auth/get-profile`, {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                    }
                });
                return res.data;
            }else{
                return rejectWithValue({status: false, msg: ''});
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

// get profile
export const getUsers= createAsyncThunk(
    'auth/getUsers',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){

                const res = await axios.get(`/auth/get-all-users`, {
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

// delete user
export const deleteUser = createAsyncThunk(
    'auth/del',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.delete(`/auth/delete-account/${id}`, {
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

// block user
export const blockUser= createAsyncThunk(
    'auth/block',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/auth/block-user/${id}`, {}, {
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

// unblock user
export const unBlockUser= createAsyncThunk(
    'auth/unblock',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/auth/unblock-user/${id}`, {},{
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

// make-admin
export const makeAdmin= createAsyncThunk(
    'auth/make-admin',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/auth/make-admin/${id}`, {}, {
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

// remove-admin
export const removeAdmin= createAsyncThunk(
    'auth/remove-admin',
    async(id, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.put(`/auth/remove-admin/${id}`, {}, {
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

// resend verification link
export const sendVerificationLink= createAsyncThunk(
    'auth/verifyLink',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.get(`/auth/resend-verification-link`, {
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
    signup: { isLoading: false, status: false, msg: ''},
    signin: { isLoading: false, status: false, msg: ''},
    resetPassReq: { isLoading: false, status: false, msg: '', token: '' },
    resetPass: { isLoading: false, status: false, msg: '' },
    verify: { isLoading: false, status: false, msg: '' },
    sendVerifyLink: { isLoading: false, status: false, msg: ''},
    user: { isLoading: false, status: false, msg: '', data: ''},
    users: { isLoading: false, status: false, msg: '', data: []},
    block: { isLoading: false, status: false, msg: '' },
    unblock: { isLoading: false, status: false, msg: '' },
    del: { isLoading: false, status: false, msg: '' },
    makeadmin: { isLoading: false, status: false, msg: '' },
    removeadmin: { isLoading: false, status: false, msg: '' },
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {

        // handleSign up
        [signup.pending]: (state)=>{
            state.signup.isLoading = true;
        },
        [signup.fulfilled]: (state, {payload})=>{
            state.signup.isLoading = false;
            state.signup.status = payload.status;
            state.signup.msg = payload.msg;
        },
        [signup.rejected]: (state, {payload})=>{
            state.signup.isLoading = false;
            if(payload){
                state.signup.status = payload.status;
                state.signup.msg = payload.msg;
                
            }else{
                // to get rid of next js server error
                state.signup.status = false;
                state.signup.msg = 'Error occured';
            }
        },


        // handleSign in
        [signin.pending]: (state)=>{
            state.signin.isLoading = true;
        },
        [signin.fulfilled]: (state, {payload})=>{
            state.signin.isLoading = false;
            state.signin.status = payload.status;
            state.signin.msg = payload.msg;
        },
        [signin.rejected]: (state, {payload})=>{
            state.signin.isLoading = false;
            if(payload){
                state.signin.status = payload.status;
                state.signin.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.signin.status = false;
                state.signin.msg = 'Error occured';
            }
        },

        // reset password request
        [resetPasswordRequest.pending]: (state)=>{
            state.resetPassReq.isLoading = true;
        },
        [resetPasswordRequest.fulfilled]: (state, {payload})=>{
            state.resetPassReq.isLoading = false;
            state.resetPassReq.status = payload.status;
            state.resetPassReq.msg = payload.msg;
            state.resetPassReq.token = payload.token;
        },
        [resetPasswordRequest.rejected]: (state, {payload})=>{
            state.resetPassReq.isLoading = false;
            if(payload){
                state.resetPassReq.status = payload.status;
                state.resetPassReq.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.resetPassReq.status = false;
                state.resetPassReq.msg = 'Error occured';
            }
        },

        // reset password
        [resetPassword.pending]: (state)=>{
            state.resetPass.isLoading = true;
        },
        [resetPassword.fulfilled]: (state, {payload})=>{
            state.resetPass.isLoading = false;
            state.resetPass.status = payload.status;
            state.resetPass.msg = payload.msg;
        },
        [resetPassword.rejected]: (state, {payload})=>{
            state.resetPass.isLoading = false;
            if(payload){
                state.resetPass.status = payload.status;
                state.resetPass.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.resetPass.status = false;
                state.resetPass.msg = 'Error occured';
            }
        },

        // verify account
        [verifyAccount.pending]: (state)=>{
            state.verify.isLoading = true;
        },
        [verifyAccount.fulfilled]: (state, {payload})=>{
            state.verify.isLoading = false;
            state.verify.status = payload.status;
            state.verify.msg = payload.msg;
        },
        [verifyAccount.rejected]: (state, {payload})=>{
            state.verify.isLoading = false;
            if(payload){
                state.verify.status = payload.status;
                state.verify.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.verify.status = false;
                state.verify.msg = 'Error occured';
            }
        },

        // get user
        [getUser.pending]: (state)=>{
            state.user.isLoading = true;
        },
        [getUser.fulfilled]: (state, {payload})=>{
            state.user.isLoading = false;
            state.user.status = payload.status;
            state.user.msg = payload.msg;
            state.user.data = payload.data;
        },
        [getUser.rejected]: (state, {payload})=>{
            state.user.isLoading = false;
            if(payload){
                state.user.status = payload.status;
                state.user.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.user.status = false;
                state.user.msg = 'Error occured';
            }
        },

        // get all users
        [getUsers.pending]: (state)=>{
            state.users.isLoading = true;
        },
        [getUsers.fulfilled]: (state, {payload})=>{
            state.users.isLoading = false;
            state.users.status = payload.status;
            state.users.msg = payload.msg;
            state.users.data = payload.data;
        },
        [getUsers.rejected]: (state, {payload})=>{
            state.user.isLoading = false;
            if(payload){
                state.users.status = payload.status;
                state.users.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.users.status = false;
                state.users.msg = 'Error occured';
            }
        },

        // resend verification link
        [sendVerificationLink.pending]: (state)=>{
            state.sendVerifyLink.isLoading = true;
        },
        [sendVerificationLink.fulfilled]: (state, {payload})=>{
            state.sendVerifyLink.isLoading = false;
            state.sendVerifyLink.status = payload.status;
            state.sendVerifyLink.msg = payload.msg;
        },
        [sendVerificationLink.rejected]: (state, {payload})=>{
            state.sendVerifyLink.isLoading = false;
            if(payload){
                state.sendVerifyLink.status = payload.status;
                state.sendVerifyLink.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.sendVerifyLink.status = false;
                state.sendVerifyLink.msg = 'Error occured';
            }
        },

        // removeAdmin
        [removeAdmin.pending]: (state)=>{
            state.removeadmin.isLoading = true;
        },
        [removeAdmin.fulfilled]: (state, {payload})=>{
            state.removeadmin.isLoading = false;
            state.removeadmin.status = payload.status;
            state.removeadmin.msg = payload.msg;
            // get the returned data and replace the existing one
            const currentState = current(state.users.data);
            // find the id index and replace the data in payload
            const index = currentState.findIndex(data=>{
                return payload.data._id === data._id
            })
            state.users.data[index] = payload.data;

        },
        [removeAdmin.rejected]: (state, {payload})=>{
            state.removeadmin.isLoading = false;
            if(payload){
                state.removeadmin.status = payload.status;
                state.removeadmin.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.removeadmin.status = false;
                state.removeadmin.msg = 'Error occured';
            }
        }, 

        
        // makeAdmin
        [makeAdmin.pending]: (state)=>{
            state.makeadmin.isLoading = true;
        },
        [makeAdmin.fulfilled]: (state, {payload})=>{
            state.makeadmin.isLoading = false;
            state.makeadmin.status = payload.status;
            state.makeadmin.msg = payload.msg;
            // get the returned data and replace the existing one
            const currentState = current(state.users.data);
            // find the id index and replace the data in payload
            const index = currentState.findIndex(data=>{
                return payload.data._id === data._id
            })
            
            state.users.data[index] = payload.data;
        },
        [makeAdmin.rejected]: (state, {payload})=>{
            state.makeadmin.isLoading = false;
            if(payload){
                state.makeadmin.status = payload.status;
                state.makeadmin.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.makeadmin.status = false;
                state.makeadmin.msg = 'Error occured';
            }
        }, 


        // block user
        [blockUser.pending]: (state)=>{
            state.block.isLoading = true;
        },
        [blockUser.fulfilled]: (state, {payload})=>{
            state.block.isLoading = false;
            state.block.status = payload.status;
            state.block.msg = payload.msg;
            // get the returned data and replace the existing one
            const currentState = current(state.users.data);
            // find the id index and replace the data in payload
            const index = currentState.findIndex(data=>{
                return payload.data._id === data._id
            })
            
            state.users.data[index] = payload.data;

        },
        [blockUser.rejected]: (state, {payload})=>{
            state.block.isLoading = false;
            if(payload){
                state.block.status = payload.status;
                state.block.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.block.status = false;
                state.block.msg = 'Error occured';
            }
        }, 


        // unblock user
        [unBlockUser.pending]: (state)=>{
            state.unblock.isLoading = true;
        },
        [unBlockUser.fulfilled]: (state, {payload})=>{
            state.unblock.isLoading = false;
            state.unblock.status = payload.status;
            state.unblock.msg = payload.msg;
            // get the returned data and replace the existing one
            const currentState = current(state.users.data);
            // find the id index and replace the data in payload
            const index = currentState.findIndex(data=>{
                return payload.data._id === data._id
            })
            
            state.users.data[index] = payload.data;
 

        },
        [unBlockUser.rejected]: (state, {payload})=>{
            state.unblock.isLoading = false;
            if(payload){
                state.unblock.status = payload.status;
                state.unblock.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.unblock.status = false;
                state.unblock.msg = 'Error occured';
            }
        },


        // delete user
        [deleteUser.pending]: (state)=>{
            state.del.isLoading = true;
        },
        [deleteUser.fulfilled]: (state, {payload})=>{
            state.del.isLoading = false;
            state.del.status = payload.status;
            state.del.msg = payload.msg;
            // get the returned data and replace the existing one
            const currentState = current(state.users.data);

            const newUsers = currentState.filter(plan=>{
                return plan._id !== payload.data._id
            })
            state.users.data = newUsers;

        },
        [deleteUser.rejected]: (state, {payload})=>{
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
    }
    
})

export default authReducer.reducer