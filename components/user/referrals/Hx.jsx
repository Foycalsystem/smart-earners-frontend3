import React from 'react'
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import styled from "styled-components";
import Spinner from "../../../loaders/Spinner";
import LensIcon from '@mui/icons-material/Lens';
import { getConfig } from "../../../redux/admin/web_config";
import date from '../date/data';

export default function Bonuses({data}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;

  useEffect(()=>{   

    dispatch(getConfig())
    setTimeout(()=>{
        setLoading(false)
    }, 500)

  }, [])

  return ( 
   <Wrap>
    {
        isLoading ? <div className='center'><Spinner size="25px"/></div> :
        data.length < 1 ?
        (
            <Msg />
        ):
        (
          <Main>
              {
                data.map((data)=>{
                return (
                <Card key={data._id}>
                    <div style={{textAlign: 'center'}}>You earned <span style={{fontWeight: 'bold'}}>{data.amount} {data.currency} </span> from your downline, <span style={{fontWeight: 'bold'}}>{data.referreeId.username}</span></div>
                    <div style={{textAlign: 'center'}}>{date.updatedDate(data)}</div>
                </Card> 
                ) 
                })
              }
          </Main>
        )
    }
   </Wrap>
  )
}


const Wrap = styled.div`
    .center{
        display: flex;
        justify-content: center;
    }

`

const Main = styled.div`
  width: 100%;
  padding: 20px 0 5px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  margin: auto;

  @media (max-width: 366px){
    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
  }

  
  .amount{
    font-size: .65rem;
    font-weight: bold
  }
`

const Card = styled.div`
  width: 180px;
  margin: 10px auto;
  padding: 8px 10px;
  font-size: .65rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 386px){
    width: 300px;
  }

`
const Msg = ()=>{

  return (
    <MsgWrapper className="none">
      None of Your Downlines Has Invested
    </MsgWrapper>
  )
}


const MsgWrapper = styled.div`
width: 70%;
max-width: 400px;
padding: 10px;
text-align: center;
font-size: .65rem;
margin: 10px auto;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
