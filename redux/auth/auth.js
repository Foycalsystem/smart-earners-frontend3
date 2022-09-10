import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_BASE_URL } from '../../utils/config';

// sign up action
export const signup = createAsyncThunk(
    'auth/signup',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/auth/signup?refcode=${data.refcode}`, data.inp)
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


// accesstoken needed here

// get profile
export const getUser= createAsyncThunk(
    'auth/getUser',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/auth/get-profile`, {
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

// get profile
export const getUsers= createAsyncThunk(
    'auth/getUsers',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/auth/get-all-users`, {
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

// delete user
export const deleteUser = createAsyncThunk(
    'auth/del',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.delete(`/auth/delete-account/${id}`, {
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

// block user
export const blockUser= createAsyncThunk(
    'auth/block',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/auth/block-user/${id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            return res.data;
                     
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
            const res = await axios.put(`/auth/unblock-user/${id}`, {},{
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

// make-admin
export const makeAdmin= createAsyncThunk(
    'auth/make-admin',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/auth/make-admin/${id}`, {}, {
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

// remove-admin
export const removeAdmin= createAsyncThunk(
    'auth/remove-admin',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/auth/remove-admin/${id}`, {}, {
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

// resend verification link
export const sendVerificationLink= createAsyncThunk(
    'auth/verifyLink',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/auth/resend-verification-link`, {
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

// add to referral list
export const addRefcode= createAsyncThunk(
    'referral/addRefcode',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/referral-bonus/add-referral-code`, data, {
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

// remove notification from user list after been read
export const handleRead= createAsyncThunk(
    'notif/handleRead',
    async(id, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/notification/handle-read/${id}`, {}, {
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


// transfer coin to another user
export const payUser= createAsyncThunk(
    'transfer/pay-user',
    async(data, {rejectWithValue})=>{
        try{
            if(Cookies.get('accesstoken')){
                const res = await axios.post(`/transfer/pay-user`, data, {
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

// buy an investment plan
export const investPlan= createAsyncThunk(
    'investment/invest',
    async(data, {rejectWithValue})=>{
    try{
            const res = await axios.post(`/investment/invest/${data.id}`, {amount: data.amount}, {
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

// get investment transactions
export const getTxn= createAsyncThunk(
    'investment/getTxn',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.get(`/investment/get-all-investments`, {
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

// pay users or remove coin from users
export const payusers= createAsyncThunk(
    'payusers/payusers',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.put(`/payusers/${data.id}`, data, {
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

// request for withdrawal
export const withdawalRequest= createAsyncThunk(
    'withdraw/withdawalRequest',
    async(data, {rejectWithValue})=>{
        try{
            const res = await axios.post(`/withdrawal/request`, data, {
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
    addCode:  { isLoading: false, status: false, msg: '' },
    // read here means user has read a notification, hence remove it from his list of unread notifications
    read:  { isLoading: false, status: false, msg: '', data: ''},
    // pay/transfer coin to another user
    pay: { isLoading: false, status: false, msg: ''},
    // buy an investment plan
    invest: { isLoading: false, status: false, msg: ''},
    // get investment transactions
    txn: { isLoading: false, status: false, msg: '', data: []},
    //pay users or remove coin from users
    payUsers: { isLoading: false, status: false, msg: '', data: ''},
    // withdrawal request
    request: { isLoading: false, status: false, msg: '', data: ''},
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth(state){
            state.signup.isLoading = false;state.signup.status = false;state.signup.msg = '';
            state.signin.isLoading = false;state.signin.status = false;state.signin.msg = '';
            state.resetPassReq.isLoading = false;state.resetPassReq.status = false;state.resetPassReq.msg = '';
            state.resetPass.isLoading = false;state.resetPass.status = false;state.resetPass.msg = '';
            state.verify.isLoading = false;state.verify.status = false;state.verify.msg = '';
            state.sendVerifyLink.isLoading = false;state.sendVerifyLink.status = false;state.sendVerifyLink.msg = '';
            state.user.isLoading = false;state.user.status = false;state.user.msg = '';
            state.users.isLoading = false;state.users.status = false;state.users.msg = '';
            state.block.isLoading = false;state.block.status = false;state.block.msg = '';
            state.unblock.isLoading = false;state.unblock.status = false;state.unblock.msg = '';
            state.del.isLoading = false;state.del.status = false;state.del.msg = '';
            state.makeadmin.isLoading = false;state.makeadmin.status = false;state.makeadmin.msg = '';
            state.removeadmin.removeadmin = false;state.removeadmin.status = false;state.removeadmin.msg = '';
            state.del.isLoading = false;state.del.status = false;state.del.msg = '';
            state.addCode.isLoading = false;state.addCode.status = false;state.addCode.msg = '';
            state.read.isLoading = false;state.read.status = false;state.read.msg = '';
            state.pay.isLoading = false; state.pay.status = false; state.pay.msg = '';
            state.invest.isLoading = false; state.invest.status = false; state.invest.msg = '';
            state.txn.isLoading = false; state.txn.status = false; state.txn.msg = '';
            state.payUsers.isLoading = false; state.payUsers.status = false; state.payUsers.msg = '';
            state.request.isLoading = false; state.request.status = false; state.request.msg = '';
        }
    },
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

        // remove read notifications from user list of unread notification
        [handleRead.pending]: (state)=>{
            state.read.isLoading = true;
        },
        [handleRead.fulfilled]: (state, {payload})=>{
            state.read.isLoading = false;
            state.read.status = payload.status;
            state.read.msg = payload.msg;
            state.user.data = payload.data;
        },
        [handleRead.rejected]: (state, {payload})=>{
            state.read.isLoading = false;
            if(payload){
                state.read.status = payload.status;
                state.read.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.read.status = false;
                state.read.msg = 'Error occured';
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

        // add referral code
        [addRefcode.pending]: (state)=>{
            state.addCode.isLoading = true;
        },
        [addRefcode.fulfilled]: (state, {payload})=>{
            state.addCode.isLoading = false;
            state.addCode.status = payload.status;
            state.addCode.msg = payload.msg;
            state.user.data = payload.data;
        },
        [addRefcode.rejected]: (state, {payload})=>{
            state.addCode.isLoading = false;
            if(payload){
                state.addCode.status = payload.status;
                state.addCode.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.addCode.status = false;
                state.addCode.msg = 'Error occured';
            }
        },

         // pay user
         [payUser.pending]: (state)=>{
            state.pay.isLoading = true;
        },
        [payUser.fulfilled]: (state, {payload})=>{
            state.pay.isLoading = false;
            state.pay.status = payload.status;
            state.pay.msg = payload.msg;
            state.pay.msg = payload.msg;

            // get the returned data (amount transfered) and remove it from the user total balance
            const currentState = JSON.parse(JSON.stringify(state.user.data));
            currentState.amount = currentState.amount - payload.data;
            state.user.data = currentState;

        },
        [payUser.rejected]: (state, {payload})=>{
            state.pay.isLoading = false;
            if(payload){
                state.pay.status = payload.status;
                state.pay.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.pay.status = false;
                state.pay.msg = 'Error occured';
            }
        },

        
        // get investment transactions
        [getTxn.pending]: (state)=>{
            state.txn.isLoading = true;
        },
        [getTxn.fulfilled]: (state, {payload})=>{
            state.txn.isLoading = false;
            state.txn.status = payload.status;
            state.txn.msg = payload.msg;
            state.txn.data = payload.data;
        },
        [getTxn.rejected]: (state, {payload})=>{
            state.txn.isLoading = false;
            if(payload){
                state.txn.status = payload.status;
                state.txn.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.txn.status = false;
                state.txn.msg = 'Error occured';
            }
        },

        
        // buy a plan
        [investPlan.pending]: (state)=>{
            state.invest.isLoading = true;
        },
        [investPlan.fulfilled]: (state, {payload})=>{
            state.invest.isLoading = false;
            state.invest.status = payload.status;
            state.invest.msg = payload.msg;
            
            // get the returned data (amount transfered) and remove it from the user total balance
            const currentState = JSON.parse(JSON.stringify(state.user.data));
            currentState.amount = currentState.amount - payload.data.amount;
            state.user.data = currentState;

            // update the txn list
            const currentStateTxn = JSON.parse(JSON.stringify(state.txn.data));
            currentStateTxn.push(payload.data.data)
            state.txn.data = currentStateTxn;
        },
        [investPlan.rejected]: (state, {payload})=>{
            state.invest.isLoading = false;
            if(payload){
                state.invest.status = payload.status;
                state.invest.msg = payload.msg;
            }else{
                // to get rid of next js server error
                state.invest.status = false;
                state.invest.msg = 'Error occured';
            }
        }, 

        // pay users or remove coin from users
        [payusers.pending]: (state)=>{
            state.payUsers.isLoading = true;
        },
        [payusers.fulfilled]: (state, {payload})=>{
            state.payUsers.isLoading = false;
            state.payUsers.status = payload.status;
            state.payUsers.msg = payload.msg;
            
            // get the current users
            const currentUsers = JSON.parse(JSON.stringify(state.users.data));
            const returnedUserIndex = currentUsers.findIndex(user=>{
                return user._id === payload.data._id
            })

            if(returnedUserIndex !==-1){
                currentUsers[returnedUserIndex] = payload.data
                state.users.data = currentUsers;
            }else{
                state.users.data = currentUsers;
            }
        },
        [payusers.rejected]: (state, {payload})=>{
            state.user.isLoading = false;
            if(payload){
                state.payUsers.status = payload.status;
                state.payUsers.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.payUsers.status = false;
                state.payUsers.msg = 'Error occured';
            }
        },

        // make withdrawal request
        [withdawalRequest.pending]: (state)=>{
            state.request.isLoading = true;
        },
        [withdawalRequest.fulfilled]: (state, {payload})=>{
            state.request.isLoading = false;
            state.request.status = payload.status;
            state.request.msg = payload.msg;

            // get the returned data (amount withdrawned) and remove it from the user total balance
            const currentState = JSON.parse(JSON.stringify(state.user.data));
            currentState.amount = currentState.amount - payload.data.amount;
            state.user.data = currentState;

            // update the txn list
            const currentStateTxn = JSON.parse(JSON.stringify(state.txn.data));
            currentStateTxn.push(payload.data.data)
            state.txn.data = currentStateTxn;
        },
        [withdawalRequest.rejected]: (state, {payload})=>{
            state.request.isLoading = false;
            if(payload){
                state.request.status = payload.status;
                state.request.msg = payload.msg;

            }else{
                // to get rid of next js server error
                state.request.status = false;
                state.request.msg = 'Error occured';
            }
        },
    }
    
})

export const {resetAuth} = authReducer.actions
export default authReducer.reducer