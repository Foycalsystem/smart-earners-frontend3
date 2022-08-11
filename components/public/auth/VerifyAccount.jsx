import styled from  'styled-components';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { verifyAccount } from '../../../redux/auth/auth';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { resetAuth } from "../../../redux/auth/auth";



const gif1 = '/gif/1.gif';
const gif2 = '/gif/3.gif';


const VerifyWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .img {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    color: var(--bright-color)
  }

  .msg {
    margin: 20px 0;
  }
`

export default function VerifyAccount() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  const {verify} = state.auth;
  const [pending, setPending] = useState(true)

    
  // clear any hanging msg from redux
  useEffect(()=>{
      dispatch(resetAuth())
  }, [])

  useEffect(()=>{
    dispatch(resetAuth())
}, [])

  const {token} = router.query;

  setTimeout(()=>{
    setPending(false)
   
  }, 10000)

  useEffect(()=>{
   if(!pending){
    dispatch(verifyAccount(router.query.token))
   }
  }, [pending])


  console.log(verify)
  useEffect(()=>{

    if(verify.status){
      setSuccess(true)
    } 

  }, [verify])

  const customId = "custom-id-yes"
    useEffect(()=>{
      if(verify.msg){
        toast(verify.msg, {
          type: verify.status ? 'success' : 'error',
          toastId: customId
        })         
      }
    }, [verify])


  useEffect(()=>{

    // redirect user after a successful verification (hasLoaded is true) to the required dashboard (either user or admin dashboard)

    if(verify.status){
      if(Cookies.get('refreshtoken') && Cookies.get('type') === 'admin'){
        router.push('/admin')
      }
      else if(Cookies.get('refreshtoken') && Cookies.get('type') !== 'admin'){
        router.push('/dashboard')
      }
    }

  }, [verify])


  return (
    <VerifyWrapper>
      <h1 style={{margin: '10px 0'}} className="title">SmartEarners' <span>Investment</span></h1>
      <h3 className="subTitle">We Trade it, You Learn & Earn it</h3>
  
      {/* <div className="msg">
        
        {
          (function(){

              if(!isLoading){
                if(feedback.status){
                  if(verify.msg){
                    if(verify.status){
                      return (
                        <Success>
                          <Close onClick={handleClose}>
                              <RiCloseLine />
                          </Close>
                          {verify.msg}
                      </Success>
                      )
                    }{
                      return (
                        <Error>
                          <Close onClick={handleClose}>
                              <RiCloseLine />
                          </Close>
                          {verify.msg}
                      </Error>
                      )
                    }
                  }
                  else{
                    return ''
                  }
                }
                else{
                  return ''
                }
              }
              else{
                return ''
              }

          }())
        }

      </div> */}
      

      <div className="img">

        {
          (function(){

            if(verify.isLoading || pending){
              return (
                <div className="img">
                  {/* <Image src='/wh/1.jpeg' alt="git" height="100" width="100" /> */}
                  <img src="/gif/2.gif" width="100" height="100" />
                </div>
              )
            }

          }())
        }

      </div>
    </VerifyWrapper>
  )
}
