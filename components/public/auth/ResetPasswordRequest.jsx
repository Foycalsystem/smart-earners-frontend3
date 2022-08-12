import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { MdOutlineEmail} from 'react-icons/md'
import { RiCloseLine} from 'react-icons/ri'
import { useSnap } from '@mozeyinedu/hooks-lab'; 
import { resetPasswordRequest } from "../../../redux/auth/auth";
import Spinner from "../../../loaders/Spinner";
import Link from 'next/link'
import {useRouter} from 'next/router'

import {
    AuthWrapper,
    Form,
    Title,
    SubTitle,
    InputWrapper,
    InputIcon,
    AuthLink,
    Error,
    Success,
    Close
} from "./styles/auth";


export const ResetPasswordRequest=()=>{
    const router = useRouter()
    const dispatch = useDispatch();
    const { snap } = useSnap(.5);
    const state = useSelector(state=>state);
    const {resetPassReq} = state.auth;

    const [feedback, setFeedback] = useState({
        msg: resetPassReq.msg,
        status: false
    });

    const intitialState = {
        email: '',
    }

    const [inp, setInpt] = useState(intitialState)

    // get form input
    const getInput =(e)=>{
        const {name, value} = e.target;
        setInpt({...inp, [name]: value })
    }
  
    // submit form
    const submit =(e)=>{
        e.preventDefault();

        dispatch(resetPasswordRequest(inp))   

        setFeedback({
            msg: resetPassReq.msg,
            status: true
        });

        // clear form input
        resetPassReq.status ? setInpt(intitialState) : setInpt({...inp, email: ''});

    }

    // handle close feedback msg
    const handleClose =()=>{
        setFeedback({
            msg: '',
            status: false
        })
    }

    useEffect(()=>{
        // empty form input
        resetPassReq.status ? setInpt(intitialState) : setInpt({...inp, email: ''})

        // get the returned data, check if token is defined (this means that verifyEmail option is turned off and the user can reset his/her password without email verification)
       

        if(resetPassReq.token){
            router.push(`/reset-password/?token=${resetPassReq.token}`)
        }

   }, [resetPassReq.status])

    return (
        <>
        <AuthWrapper>
        <Form onSubmit={submit}>
              <Title>Reset Password</Title>
              <SubTitle bottomMargin="20px">Forex Trading Solution for Everyone</SubTitle>
              {
                  feedback.status ? (
                      resetPassReq.msg ? 
                      (
                          resetPassReq.status ? 
                      (
                          <Success>
                              <Close onClick={handleClose}>
                                  <RiCloseLine />
                              </Close>
                              {resetPassReq.msg}
                          </Success>
                      ) :
                      (
                          <Error>
                              <Close onClick={handleClose}>
                                  <RiCloseLine />
                              </Close>
                              {resetPassReq.msg}
                          </Error>
                      )
                      ): ''
                  ):''
              }
              <InputWrapper>
                  <InputIcon right="" left="0">
                  <MdOutlineEmail />
                  </InputIcon>
                  <input
                    autoFocus
                    type="text" 
                    name="email"
                    value={inp.email || ''}
                    placeholder="Enter Your Email"
                    onInput={getInput}
                  />
              </InputWrapper>

              <SubTitle bottomMargin="5px">
                 <Link href="/signin" passHref>
                    <AuthLink>Sign In</AuthLink>
                 </Link>
              </SubTitle>

              <InputWrapper>
                  <input {...snap()} type="submit"
                    value={resetPassReq.isLoading ? 'Loading...' : "Submit"}
                    disabled={resetPassReq.isLoading ? true : false}
                  />
              </InputWrapper>

              {resetPassReq.isLoading ? <Spinner size='20px'/> : ""}
              
            </Form>
            
        </AuthWrapper>
        </>
    )
}
