import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Spinner from "../../../loaders/Spinner";
import { sendVerificationLink } from "../../../redux/auth/auth";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi"
import { toast } from 'react-toastify';
import { resetAuth } from "../../../redux/auth/auth";



const Profile = ({userInfo}) => {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const [isLoading, setLoading] = useState(true)
    const {user} = state.auth;

    useEffect(()=>{
      dispatch(getUser())

      user.isLoading ? setLoading(true) : setLoading(false)
  
    //   setTimeout(()=>{
    //     user.isLoading ? setLoading(true) : setLoading(false)
    //   }, 1000)
    }, [])
    
    return isLoading ? <Loader_ /> : <ProfileComp data={user.data}/> 
}


export default Profile



const ProfileComp =({data})=>{
    
    const accountStatus =()=>{
        if(data.isBlocked){
            return 'Blocked'
        }else{
            if(data.isVerified){
                return 'Verified'
            }else{
                return 'Unverified'
            }
        }
    }
    return (
        <ProfileCointainer_>
                
                <section className="top-section">
                        <span className="profile-name">
                            <h1>{data.username && data.username.charAt(0).toUpperCase()}</h1> 
                            {
                                data.isVerified && !data.isBlocked ? <span style={{position: 'absolute', top: '8px', right: '8px'}}><GppGoodIcon /></span> : ''
                            }
                        </span>
                    
                </section>


               <div className="container">

                    <section className="bio">
                        <legend>BIO</legend>
                        <div>
                            <label>
                                <span>Username: </span> <span className='data'>{data.username}</span>
                            </label>
                            <label>
                                <span>Email: </span> <span className='data'>{data.email}</span>
                            </label>
                        </div>
                    </section>

                    <section className="bio">
                        <legend>ACCOUNT</legend>
                        <div>
                            <label>
                                <span>Account Number: </span> <span className='data'>{data.accountNumber}</span>
                            </label>
                            <label>
                                <span>Account Balance: </span> <span className='data'>{data.amount && data.amount.toFixed(4)} {data.currency}</span>
                            </label>
                            <label>
                                <span>Referral: </span> <span className='data'>{data.referralCode}</span>
                            </label>
                        </div>
                    </section>

                    <section className="bio">
                        <legend>ACCOUNT STATUS</legend>
                        <div>
                            <label>
                                <span style={{
                                    color: (function(){
                                        if(data.isBlocked){
                                            return '#c30'
                                        }else{
                                            if(data.isVerified){
                                                return 'var(--major-color-purest)'
                                            }else{
                                                return 'var(--bright-color)'
                                            }
                                        }
                                    }())
                                }} className='data'>{accountStatus()}</span>
                            </label>
                        </div>
                    </section>

                    {(function(){
                        if(data.isBlocked){
                            return (
                                <section className="bio extraInfo">
                                    <button onClick={()=>router.push('/contact-us')}>Contact Customer Support</button>
                                </section>
                            )
                        }
                        else{
                            if(!data.isVerified){
                                return <SendVerifyLink />
                            }else{
                                return ''
                            }
                        }
                    }())}
               </div>

                
        </ProfileCointainer_>
    )
}

function SendVerifyLink({}){
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const {sendVerifyLink} = state.auth;
    const [pending, setPending] = useState(false)
    
     // clear any hanging msg from redux
    useEffect(()=>{
        dispatch(resetAuth())
    }, [sendVerifyLink])
    
    const send = async()=>{
        if(!Cookies.get('accesstoken')){
            await resolveApi.refreshTokenClinetSide()
        }
        setPending(true)
        dispatch(sendVerificationLink())
    }

    const customId = "custom-id-yes"
    useEffect(()=>{
        if(sendVerifyLink.msg){
          setPending(false)
          toast(sendVerifyLink.msg, {
            type: sendVerifyLink.status ? 'success' : 'error',
            toastId: customId
          })         
        }
    }, [sendVerifyLink])

    return (
        <section className="bio extraInfo">
            <button
                disabled={sendVerifyLink.isLoading ? true : false}
                onClick={send}>
                {sendVerifyLink.isLoading ? 'Sending Link...' : 'Verify Your Account'}
            </button>
            <div className="center">
                {pending? <Spinner /> : ""}
            </div>
            
        </section>
    )
}



const ProfileCointainer_ = styled.div`
    .top-section{
        width: 100%;
        height: 100px;;
        background: var(--major-color-30A);
        position: relative;

        .profile-name{
            width: 100px;
            height: 100px;
            position: absolute;
            border-radius: 50%;
            background: #ccc;
            top: 50px;
            left: 30px;
            color: var(--major-color-purest);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
        }
    }

    .container{
        margin: 60px auto 40px;
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(350px, 1fr) );
    }
    .center{
        display: flex;
        justify-content: center
    }

    .bio{
        margin: 8px auto;
        width: 80%;
        max-width: 500px;

        legend{
            font-weight: 400;
            color:  var(--bright-color);
            font-size: 1rem;
        }
        label{
            display: block;
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            margin-bottom: 5px;
        }
        .data{
            font-weight: 600;
        }
    }
    
    .extraInfo{
        box-shadow: 2px 2px 5px #aaa;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        button{
            padding: 8px;
            margin-bottom: 10px;
            background: var(--major-color-purest);
            color: #fff;
            border: none;
            cursor: pointer     
        }
    }
`