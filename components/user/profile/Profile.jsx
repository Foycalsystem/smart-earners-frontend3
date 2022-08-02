import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Spinner from "../../../loaders/Spinner";
import { sendVerificationLink } from "../../../redux/auth/auth";
import Feedback from "../../Feedback";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useRouter } from "next/router";



const Profile = ({userInfo}) => {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const [isLoading, setLoading] = useState(true)
    const {user} = state.auth;
    const router = useRouter()
  
    useEffect(()=>{
      dispatch(getUser())
  
      setTimeout(()=>{
        user.isLoading ? setLoading(true) : setLoading(false)
      }, 2000)
    }, [])
    
    return (
    
        //check if user exist
    
        isLoading ? 
        (
          // set loading div
          <Loader_ />
        ) :
        (
          //check if empty
          !user.data ?
         
          (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{user.msg || 'No Data Currently Available, Refresh the browser'}</div>
          ):
          (
            <ProfileComp data={user.data}/>
          )
        )    
    )
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
                            <h1>{data.username.charAt(0).toUpperCase()}</h1> 
                            {
                                data.isVerified && !data.isBlocked ? <span><GppGoodIcon /></span> : ''
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
                                <span>Email: </span> <span className='data'>{data.username}</span>
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
                                <span>Account Balance: </span> <span className='data'>{data.amount} {data.currency}</span>
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

    const [feedback, setFeedback] = useState({
        msg: sendVerifyLink.msg,
        status: false
    });
    
    const send=()=>{
        dispatch(sendVerificationLink())

        setFeedback({
            msg: sendVerifyLink.msg,
            status: true
        });
    }

    return (
        <section className="bio extraInfo">
            
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
                status={sendVerifyLink.status}
                msg={sendVerifyLink.msg}
            />
            <button
                disabled={sendVerifyLink.isLoading ? true : false}
                onClick={send}>
                {sendVerifyLink.isLoading ? 'Sending Link...' : 'Verify Your Account'}
            </button>
            {sendVerifyLink.isLoading ? <Spinner /> : ""}

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