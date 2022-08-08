import React from 'react'
import GoBackBtn from "../../GoBackBtn";
import { getUser, getUsers } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getBounus } from "../../../redux/referrals/referrals";
import styled from "styled-components";
import Spinner from "../../../loaders/Spinner";
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi"
import { getConfig } from "../../../redux/admin/web_config";
import LensIcon from '@mui/icons-material/Lens';


export default function History() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {user, users} = state.auth;
  const {bonus} = state.referrals;
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [totalActive, setTotalActive] = useState(0)

  useEffect(()=>{    
    dispatch(getUser())
    dispatch(getBounus())
    dispatch(getConfig())

    // setTimeout(()=>{
    //   user.isLoading && bonus.isLoading ? setLoading(true) : setLoading(false)
    //     setLoading(false)
    // }, 1000)

    user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
  }, [])

  useEffect(()=>{
    let sum = 0;
    for(let i=0; i<bonus.data.length; i++){
      sum = sum + bonus.data[i].amount
    }
    setTotalEarnings(sum);

    let ad = 0;
    for(let i=0; i<bonus.data.length; i++){
      if(bonus.data[i].referreeId.active == 1 || bonus.data[i].referreeId.active == 2){
        ad = ad + 1
      }
    }
    setTotalActive(ad)
    


  }, [bonus, user, users])
  
  return (
  <>
    <GoBackBtn />
    {
      isLoading ? <Loader_ /> :
      <Wrapper>           
        <>
            {
              bonus.data.length < 1 ?
              <Header>
                <div style={{fontWeight: '600', marginBottom: '4px'}}>You have not referred anyone</div>
              </Header>
              :
                <Header>
                  <div>
                      <div style={{fontWeight: '600', marginBottom: '4px'}}>Total Earnings</div>
                      {
                        user.isLoading &&  users.isLoading &&  bonus.isLoading ? <div className='center'><Spinner size="20px"/></div> : 
                        <div className='totalUnit'>{totalEarnings} {config.data.nativeCurrency}</div>
                      }
                      
                    </div>
                    <div>
                      <div style={{fontWeight: '600', marginBottom: '4px'}}>Total Active</div>
                      {
                        user.isLoading &&  users.isLoading &&  bonus.isLoading ? <div className='center'><Spinner size="20px"/></div> : 
                        <div className='totalUnit'>{totalActive}</div>
                      }
                  </div>
                </Header>
            }
        </>

        <Main>
            {
              bonus.data && bonus.data.map((data, i)=>{
                return (
                  <div key={i} className="user">
                    <div>
                      <span style={{fontSize: '.9rem', fontWeight: 'bold'}}>{data.referreeId.username}</span>{" "}
                      <span>
                        {
                          (function(){
                            if(data.referreeId.active == 2){
                              return (
                                <span>
                                  <span>
                                    <LensIcon style={{fontSize: '.6rem', color:'green'}} />
                                  </span>
                                  <span>
                                    <LensIcon style={{fontSize: '.6rem', color:'green'}} />
                                  </span>
                                </span>
                              )
                            }
                            else if(data.referreeId.active == 1){
                              return (
                                <span>
                                  <span>
                                    <LensIcon style={{fontSize: '.6rem', color:'green'}} />
                                  </span>
                                  <span>
                                    <LensIcon style={{fontSize: '.6rem'}} />
                                  </span>
                                </span>
                              )
                            }
                            else{
                              return (
                                <span>
                                <span>
                                  <LensIcon style={{fontSize: '.6rem'}} />
                                </span>
                                <span>
                                  <LensIcon style={{fontSize: '.6rem'}} />
                                </span>
                              </span>
                              )
                            }
                          }())
                        }
                      </span>
                    </div>
                    <div className="amount">{data.amount} {data.currency}</div>
                  </div>
                )
              })
            }
        </Main>
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
  height: 70px;
  background: var(--major-color-30A);

  .center{
    display: flex;
    justify-content: center;
  }

  .totalUnit{
    text-align: center;
    box-shadow: -1px 1px 3px #484545, 1px 0px 3px #484545;
    font-size: .8rem;
    padding: 3px;
    font-weight: 600
  }
`

const Main = styled.div`
  width: 100%;
  padding: 20px 0 5px 0;

  .user{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: .7rem;
    padding: 2px 10px;
    margin-bottom: 20px;
    border-bottom: 4px solid var(--major-color-30A)
  }
`