import React from 'react'
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import styled from "styled-components";
import Spinner from "../../../loaders/Spinner";
import LensIcon from '@mui/icons-material/Lens';
import { getConfig } from "../../../redux/admin/web_config";

export default function Bonuses({data, totalBonus}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;

  useEffect(()=>{
    dispatch(getConfig())
  }, [])
  
  useEffect(()=>{   
    setTimeout(()=>{
      totalBonus.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

  }, [totalBonus])

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
                  data.map((data, i)=>{
                    return (
                      data.referreeId && (
                        <div key={i} className="user">
                        <div>
                          <span style={{fontSize: '.9rem', fontWeight: 'bold'}}>{data.referreeId.username}</span>{" "}
                          <span>
                            {
                              (function(){
                                
                                if(data.referreeId.hasInvested && data.referreeId.masterInvestmentCount===config.data.referralBonusMaxCountForMasterPlan){
                                  const chances = 0;

                                  return (
                                    <span>
                                      <LensIcon style={{fontSize: '.4rem', color: data.referreeId.active==1 || data.referreeId.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                      <span style={{marginLeft: '50px', color: '#c20'}}>{"Total Chances: " + chances}</span>
                                    </span>
                                  )
                                }

                                else if(data.referreeId.hasInvested && data.referreeId.masterInvestmentCount < config.data.referralBonusMaxCountForMasterPlan){
                                  const chances = config.data.referralBonusMaxCountForMasterPlan - data.referreeId.masterInvestmentCount;

                                  return (
                                    <span>
                                      <LensIcon style={{fontSize: '.4rem', color: data.referreeId.active==1 || data.referreeId.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                      <span style={{marginLeft: '50px'}}>{"Total Chances: " + chances}</span>
                                    </span>
                                  )
                                }

                                else if(!data.referreeId.hasInvested && data.referreeId.masterInvestmentCount < config.data.referralBonusMaxCountForMasterPlan){
                                  const chances =  config.data.referralBonusMaxCountForMasterPlan - data.referreeId.masterInvestmentCount;

                                  for(let i=0; i<chances; i++){
                                    return (
                                      <span>
                                        <LensIcon style={{fontSize: '.4rem', color: data.referreeId.active==1 || data.referreeId.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                        <span style={{marginLeft: '50px'}}>{"Total Chances: " + chances}</span>
                                      </span>
                                    )
                                  }
                                }
                              }())
                            }
                          </span>
                        </div>
                        
                        {
                          (
                            function(){
                              return <span className="amount">{data.amount} {data.currency}</span>
                              
                            }()
                          )
                        }
                      </div>
                      )
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

  .user{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: .7rem;
    padding: 2px 10px;
    margin-bottom: 20px;
    border-bottom: 4px solid var(--major-color-30A)
  }
  
  .amount{
    font-size: .65rem;
    font-weight: bold
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
