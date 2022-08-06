import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getBounus } from "../../../redux/referrals/referrals";
import styled from "styled-components";


export default function Referrals({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {user} = state.auth;
  const {bonus} = state.referrals;
  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getBounus())

    // setTimeout(()=>{
    //   user.isLoading && bonus.isLoading ? setLoading(true) : setLoading(false)
    //     setLoading(false)
    // }, 1000)

    user.isLoading && bonus.isLoading ? setLoading(true) : setLoading(false)
  }, [])

  // console.log(bonus)

  return (
    <Div>
       {
        isLoading ? <Loader_ /> :
        <Wrapper>
          <div className="input">
            <div className="title">Refer</div>
          </div>
        </Wrapper>
       } 
    </Div>
  )
}


const Div = styled.div`
  width: 100%;
  height: 78vh;
  background: url('/referral.png');
  background-size: 450px;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment:fixed;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  border: 1px solid red;
  margin: auto;
  position: relative;

  .title{
    text-align: center;
    font-size: .8rem;
  }
  .input{
    border: 1px solid red;
    height: 120px;
    width: 250px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }

`