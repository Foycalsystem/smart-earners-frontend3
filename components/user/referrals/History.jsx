import React from 'react'
import GoBackBtn from "../../GoBackBtn";
import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getBounus, getTotalBounus } from "../../../redux/referrals/referrals";
import styled from "styled-components";
import Spinner from "../../../loaders/Spinner";
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi"
import { getConfig } from "../../../redux/admin/web_config";
import LensIcon from '@mui/icons-material/Lens';
import { toast } from 'react-toastify';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Hx from './Hx';


export default function History() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {user} = state.auth;
  const {bonus, totalBonus} = state.referrals;
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [totalActive, setTotalActive] = useState(0)
  const [chances, setChances] = useState(0)
  const [referree, setReferree] = useState([])
  const [pending, setPending] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(()=>{    
    dispatch(getUser())
    dispatch(getBounus('h'))
    dispatch(getTotalBounus('gell'))
    dispatch(getConfig())

    // setTimeout(()=>{
    //   user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
    //     setLoading(false)
    // }, 1000)

    user.isLoading && bonus.isLoading && totalBonus.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
  }, [])

   // clear any hanging msg from redux
  //  useEffect(()=>{
  //   dispatch(resetAuth())
  // }, [addCode, user])


  useEffect(()=>{
    setReferree(totalBonus.data || [])        
  }, [totalBonus])

  useEffect(()=>{
  
    let sum = 0;
    for(let i=0; i<bonus.data.length; i++){
      sum = sum + bonus.data[i].amount
    }
    setTotalEarnings(sum);

  }, [bonus])


  const claimBonus= async()=>{
    setPending(true)
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    
  }

  return (
  <>
    <GoBackBtn />
    {
      isLoading ? <Loader_ /> :
      <Wrapper>           
        <>
            {
             referree.length < 1 ?
              <Header>
                <div style={{fontWeight: '600', marginBottom: '4px'}}>You have not referred anyone</div>
              </Header>
              :
              <>
                <Header>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    <div style={{fontWeight: '600', marginBottom: '4px'}}>Total Earnings</div>
                      {
                        user.isLoading &&  totalBonus.isLoading ? <div className='center'><Spinner size="20px"/></div> : 
                        <button className='totalUnit'>{totalEarnings} {config.data.nativeCurrency}</button>
                      }
                      
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                      <div style={{fontWeight: '600', marginBottom: '4px'}}>Total Active</div>
                      {
                        user.isLoading && totalBonus.isLoading ? <div className='center'><Spinner size="20px"/></div> : 
                        <button
                          style={{
                            background: totalActive/referree.length * 100 >= 80 ? 'green' : '',
                            color: totalActive/referree.length * 100 >= 80 ? '#fff' : ''
                          }}
                          className='totalUnit'
                          disabled={totalActive/referree.length * 100 <= 80}
                          onClick={claimBonus}
                        >
                          {totalActive}/{referree.length} = {totalActive/referree.length * 100}%
                        </button>
                      }
                  </div>
                </Header>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                  <div style={{cursor: 'pointer', marginTop: '-10px'}} onClick={()=>setToggle(!toggle)}>
                    {
                      toggle ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                    }
                  </div>
                </div>
              </>
            }
        </>

        {
          !toggle ?
          (
            <Main>
            {
              referree.map((data, i)=>{
                return (
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
                                  <LensIcon style={{fontSize: '.3rem', color: data.referreeId.active==1 || data.referreeId.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                  <span style={{marginLeft: '50px', color: '#c20'}}>{"Chances: " + chances}</span>
                                </span>
                              )
                            }

                            else if(data.referreeId.hasInvested && data.referreeId.masterInvestmentCount < config.data.referralBonusMaxCountForMasterPlan){
                              const chances = config.data.referralBonusMaxCountForMasterPlan - data.referreeId.masterInvestmentCount;

                              return (
                                <span>
                                  <LensIcon style={{fontSize: '.3rem', color: data.active==1 || data.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                  <span style={{marginLeft: '50px'}}>{"Chances: " + chances}</span>
                                </span>
                              )
                            }

                            else if(!data.referreeId.hasInvested && data.referreeId.masterInvestmentCount < config.data.referralBonusMaxCountForMasterPlan){
                              const chances =  config.data.referralBonusMaxCountForMasterPlan - data.referreeId.masterInvestmentCount;

                              for(let i=0; i<chances; i++){
                                return (
                                  <span>
                                    <LensIcon style={{fontSize: '.3rem', color: data.active==1 || data.active==2 ? 'green' : 'var(--major-color-purest'}} />
                                    <span style={{marginLeft: '50px'}}>{"Chances " + chances}</span>
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
              })
            }
        </Main>
          ):
          (
            <Hx data={bonus}/>
          )
        }
      </Wrapper>
    }
  </>
  )
}









const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 0 10px;

`
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: .7rem;
  height: 70px;
  background: var(--major-color-30A);

 
  .center{
    display: flex;
    justify-content: center;
  }

  .totalUnit, button{
    text-align: center;
    background: inherit;
    border: none;
    box-shadow: -1px 1px 3px #484545, 1px 0px 3px #484545;
    font-size: .65rem;
    padding: 3px 5px;
    font-weight: 600
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