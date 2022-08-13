import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getBounus } from "../../../redux/referrals/referrals";
import styled from "styled-components";
import AddCode from "./AddCode.jsx";
import { getConfig } from "../../../redux/admin/web_config";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ToastContainer from "../../ToastContainer";
import { toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { RWebShare } from "react-web-share";
import {useRouter} from 'next/router'


export default function Referrals({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {user} = state.auth;
  const {bonus, addCode} = state.referrals;
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;
  const router = useRouter()

  useEffect(()=>{    
    dispatch(getUser())
    dispatch(getBounus())
    dispatch(getConfig())

    setTimeout(()=>{
      user.isLoading && bonus.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
        setLoading(false)
    }, 1000)

    // user.isLoading && bonus.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
  }, [])

  useEffect(()=>{
    if(addCode.status){
      setInp({refcode: ''})
    }
  }, [addCode])

  const copyEvent=(e)=>{
    toast(e + ' Copied to Clipboard')
  }

  const viewHistory =async()=>{
   router.push('/dashboard/referrals/history')

  }

  const handleContest =async()=>{
  router.push('/dashboard/referrals/contest')

  }
  
  return (
    <Div>
      <ToastContainer />
       {
        isLoading ? <Loader_ /> :
        <Wrapper>           
           <AddCode />
           <div style={{width: '100%', height: '300px'}}></div>
           <Bottom>
            <div style={{fontWeight: 'bold', textAlign: 'center'}}>Invite your Friends now to claim Commision from their first Investment</div>

            <ul style={{fontSize: '.7rem', textAlign: 'center'}}>
              <li>Earn {config.data.referralBonusPercentage}% Referral Commission for First Investment from each of your downlines, and {config.data.referralBonusPercentageForMasterPlan}%, {config.data.referralBonusMaxCountForMasterPlan} consecutive time when your downlines start with the Master Plan </li>
            </ul>

            <div  style={{textAlign: 'center', margin: '5px'}}>
                <CopyToClipboard text={user.data.referralCode} onCopy={copyEvent}>
                    <span style={{fontWeight: 'bold', cursor: 'default'}}>
                      Your Referral Code: {" "}
                      <span style={{color: '#c20'}}>{user.data.referralCode}</span>
                      <span><ContentCopyIcon style={{fontSize: '.9rem'}} /></span>
                    </span>
                </CopyToClipboard>
                
                <RWebShare
                  data={{
                    text: "Hey 👋 friend! \nI'm inviting you to join smartearners, the best forex trading management platform, use this link to register, and start earning weekly profit",
                    url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://teamsmartearners.com'}/signup?refcode=${user.data.referralCode}`,
                    title: "SmartEarners",
                  }}>
                  <div style={{border: '1px solid #dfdfdf', width: '75px', margin: '6px auto', padding: '3px' , borderRadius: '5px', fontWeight: '600', userSelect: 'none', cursor:'pointer'}}>Share 🔗</div>
                </RWebShare>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <button onClick={viewHistory}>View History</button>
              <button onClick={handleContest}>Referral Contest</button>
            </div>
           </Bottom>
        </Wrapper>
       } 
    </Div>

  )
}


const Div = styled.div`
  width: 100%;
  background: url('/referral.png');
  background-size: 350px;
  background-repeat: no-repeat;
  background-position: 50% 140px;
  background-attachment:fixed;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  position: relative;

  button {
    padding: 7px 5px;
    border-radius: 5px;
    color: #fff;
    border: none;
    background: var(--major-color-purest);
    font-size: .7rem;
    cursor: pointer
  }
`

const Bottom = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 10px;
`