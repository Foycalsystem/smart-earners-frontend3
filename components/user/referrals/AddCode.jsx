import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import styled from "styled-components";
import Spinner from "../../../loaders/Spinner";
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi"
import { toast } from 'react-toastify';
import { addRefcode, resetAuth } from "../../../redux/auth/auth";





export default function AddCode({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const { addCode, user} = state.auth;
  const [inp, setInp] = useState({refcode: ''})
  const [isLoading, setLoading] = useState(true)

  // clear any hanging msg from redux
  useEffect(()=>{
    dispatch(resetAuth())
  }, [addCode, user])

  const submit= async(e)=>{
    e.preventDefault();

    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    dispatch(addRefcode(inp))
    
  }

  useEffect(()=>{
    if(addCode.msg){
      toast(addCode.msg, {
        type: addCode.status ? 'success' : 'error'
      })         
    }
  }, [addCode])

  useEffect(()=>{
    setTimeout(()=>{
      user.isLoading ? setLoading(true) : setLoading(false)
    }, 500)
  }, [user])

  return (
    // {/* check if the user already has a referrer /}
    <Wrapper>
      {
        isLoading ? <div className="center"> <Spinner size="25px" /></div> :
        (
          user.data.referrerId ? 
          <div className="referrer">
            <div style={{textAlign: 'center'}}>You were referred by</div>
            <div style={{fontWeight: 'bold', fontSize:'1rem', textAlign: 'center'}}>{user.data.referrerId.username}</div>
          </div>
          
          :
        
          <Form onSubmit={submit} className="form">
            <div className="title">Enter Referral Code</div>
            <div className="center">{ addCode.isLoading ? (
              <>
                <Spinner size="20px" />
              </>
            ) : ''} </div>

            <div className="wrapper">
                <input
                    type="text"
                    autoFocus
                    value={inp.refcode || ''}
                    onChange={(e)=>setInp({...inp, refcode: e.target.value})}
                    placeholder="Referral Code"
                />
                <input type="submit"/>
            </div>
          </Form>
        )
      }
    </Wrapper>
  
  )
}


const Wrapper = styled.div`
  height: 120px;
  width: 250px;
  right: 0;
  position: absolute;
  top: 0;

  .referrer{
    margin: 10px 5px;
    width: 70%;
    padding: 10px;
    position: absolute;
    cursor: default;
    right: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  }

`

const Form = styled.form`
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;

  .title{
    text-align: center;
    font-size: .8rem;
  }

  .wrapper{
    width: 100%;
    height: 30px;
    border-radius: 5px;

    input{
      border: none;
      height: 100%;

      &:focus{
        outline: none;
      }
    }

    input[type="submit"]{
      background: var(--major-color-purest);
      width: 70px;
      color: #fff;
      border-radius:  0 5px 5px 0;
      font-weight: bold;
      border-top: 2px solid var(--major-color-purest);;
      border-bottom: 2px solid var(--major-color-purest);
      cursor: pointer;
      border-right: 2px solid var(--major-color-purest);

      &:focus{
        border-top: 2px solid green;
        border-bottom: 2px solid green;
        border-left: 2px solid green;
      }
    }

    input[type="text"]{
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      border-left: 1px solid #ddd;
      background: #fff;
      width: calc(100% - 70px);
      padding: 0 10px;
      border-radius: 5px 0 0 5px;

      &:focus{
        border-top: 2px solid var(--major-color-purest);;
        border-bottom: 2px solid var(--major-color-purest);;
        border-left: 2px solid var(--major-color-purest);;
      }
    }
  }

`