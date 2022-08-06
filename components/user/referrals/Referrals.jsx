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
    setLoading(true)
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
    
    isLoading ? <Loader_ /> :
    (
      <Wrapper>
        display data here
      </Wrapper>
    )   
  )
}


const Wrapper = styled.div`
  width: 100%;

`