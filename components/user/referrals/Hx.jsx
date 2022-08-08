import styled from 'styled-components';
import { useState, useEffect } from "react";
import date from '../date/data';

export default function Hx({data}) {
    console.log(data.data)

    return ( 
        data.isLoading ? 'loading' :
        (
            data.data.length < 1 ? <Msg /> : 
            <Wrapper>
            {
                data.data.map((data)=>{
                return (
                <Card key={data._id}>
                    <div style={{textAlign: 'center'}}>You earned <span style={{fontWeight: 'bold'}}>{data.amount} {data.currency} </span> from your downline, <span style={{fontWeight: 'bold'}}>{data.referreeId.username}</span></div>
                    <div style={{textAlign: 'center'}}>{date.updatedDate(data)}</div>
                </Card> 
                ) 
                })
            }
            </Wrapper>
        )
    )
}




const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  margin: auto;

  @media (max-width: 366px){
    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
  }

` 

const Card = styled.div`
  width: 180px;
  cursor: default;
  margin: 10px auto;
  padding: 7px 10px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: .65rem;

  @media (max-width: 366px){
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
  margin: 10px auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
