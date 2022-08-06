import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BiUserCircle} from 'react-icons/bi';
import { BsFillEyeFill} from 'react-icons/bs';
import { MdOutlineEmail} from 'react-icons/md';
import { RiCloseLine} from 'react-icons/ri'
import { AiTwotoneLock, AiFillEyeInvisible} from 'react-icons/ai';
import { useSnap } from '@mozeyinedu/hooks-lab'; 
import { signup } from "../../../redux/auth/auth";
import check from "../../../utils";
import Agreement from "./Agreement";
import Spinner from "../../../loaders/Spinner";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

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



export const Signup=()=>{  
    const router = useRouter()

    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {auth} = state;
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false);

    const {refcode} = router.query;

    const [feedback, setFeedback] = useState({
        msg: auth.signup.msg,
        status: false
    });

    const { snap } = useSnap(.5);

    const intitialState = {
        email: '',
        username: '',
        password: '',
        cpassword: ''
    }
    const [inp, setInpt] = useState(intitialState);

    // get form input
    const getInput =(e)=>{
        const {name, value} = e.target;
        setInpt({...inp, [name]: value })
    }
  
    // submit form
    const submit =(e)=>{
        e.preventDefault();

        dispatch(signup({inp, refcode}))

        setFeedback({
            msg: auth.signup.msg,
            status: true
        });

        // empty form input
        auth.signup.status ? setInpt(intitialState) : setInpt({...inp, password: '', cpassword: ''})
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
        auth.signup.status ? setInpt(intitialState) : setInpt({...inp, password: '', cpassword: ''})

        // redirect user after a successful login to the required dashboard (either user or admin dashboard)
        const user_info = {
            refreshtoken: Cookies.get('refreshtoken'),
            type: Cookies.get('type')
        };
        
        auth.signup.status ? check.redirectToDashboard(router, user_info) : ''  

   }, [auth.signup.status])
 
    return (
        <>
        <AuthWrapper>
            <Form onSubmit={submit}>
                <Title>Sign Up</Title>
                <SubTitle bottomMargin="20px">Forex Trading Solution for Everyone</SubTitle>
                {
                    feedback.status ? (
                        auth.signup.msg ? 
                        (
                            auth.signup.status ? 
                        (
                            <Success>
                                <Close onClick={handleClose}>
                                    <RiCloseLine />
                                </Close>
                                {auth.signup.msg}
                            </Success>
                        ) :
                        (
                            <Error>
                                <Close onClick={handleClose}>
                                    <RiCloseLine />
                                </Close>
                                {auth.signup.msg}
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
                        placeholder="Email Address"
                        onInput={getInput}
                    />
                </InputWrapper>

                <InputWrapper>
                    <InputIcon right="" left="0">
                        <BiUserCircle />
                    </InputIcon>
                    <input
                        type="text" 
                        name="username"
                        value={inp.username || ''}
                        placeholder="Username"
                        onInput={getInput}
                    />
                </InputWrapper>

                <InputWrapper>
                    <InputIcon right="" left="0">
                        <AiTwotoneLock />
                    </InputIcon>
                    <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        value={inp.password || ''}
                        placeholder="Password"
                        onInput={getInput}
                    />
                    <InputIcon onClick={()=>setShowPassword(!showPassword)} right="0" left="">
                        {showPassword ? <BsFillEyeFill /> : <AiFillEyeInvisible /> }
                    </InputIcon>
                </InputWrapper>

                <InputWrapper>
                    <InputIcon right="" left="0">
                        <AiTwotoneLock />
                    </InputIcon>
                    <input
                        type={showCPassword ? "text" : "password"} 
                        name="cpassword"
                        value={inp.cpassword || ''}
                        placeholder="Confirm Password"
                        onInput={getInput}
                    />
                    <InputIcon onClick={()=>setShowCPassword(!showCPassword)} right="0" left="">
                        {showCPassword ? <BsFillEyeFill /> : <AiFillEyeInvisible />}
                    </InputIcon>
                </InputWrapper>

                {auth.signup.isLoading ? <Spinner size='20px'/> : ""}

                <Agreement />

                <InputWrapper>
                    <input
                        {...snap()}
                        type="submit"
                        value={auth.signup.isLoading ? "loading..." : "Sign Up"}
                        disabled={auth.signup.isLoading ? true : false}
                    />
                </InputWrapper>

                <SubTitle bottomMargin="0">
                    Already have an Account?
                    <Link href="/signin" passHref>
                        <AuthLink>Sign in</AuthLink>
                    </Link>
                </SubTitle>

            </Form>

        </AuthWrapper>
        </>
    )
}
