import React from 'react'
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person'
import SavingsIcon from '@mui/icons-material/Savings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import { SectionTitle } from '../../../styles/globalStyle'
import { getConfig } from '../../../redux/admin/web_config';
import {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../../loaders/Spinner';


const Rating =()=>{
  return (
    <> 
      <StarIcon style={{color: '#F1AD00'}} fontSize="small"/>
      <StarIcon style={{color: '#F1AD00'}} fontSize="small"/>
      <StarIcon style={{color: '#F1AD00'}} fontSize="small"/>
      <StarIcon style={{color: '#F1AD00'}} fontSize="small"/>
      <StarIcon style={{color: '#ccc'}} fontSize="small"/>
    </>
  )
}

const StatsWidget = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state)
  const {config} = state.config

  useEffect(()=>{
    dispatch(getConfig())
  }, [])

  return (
    <StyledStatsWidget>
      <SectionTitle>Stats</SectionTitle>
        <div>
          <div className="row">
              <div className="members">
                <PersonIcon />
                <h4>Total Members</h4>
                {
                  config.isLoading ?
                  (
                    <div style={{display: 'flex', justifyContent: 'center'}}><Spinner /></div>
                  ):
                  (
                    config.data.length < 1 ? 
                    ('---'):
                    (<div style={{color: '#fff'}}>{config.data.totalMembers}</div>)
                  )
                }
              </div>
              <div className="investor">
                <SavingsIcon />
                <h4>Total Investors</h4>
                {
                  config.isLoading ?
                  (
                    <div style={{display: 'flex', justifyContent: 'center'}}><Spinner /></div>
                  ):
                  (
                    config.data.length < 1 ? 
                    ('---'):
                    (<div style={{color: '#fff'}}>{config.data.totalInvestors}</div>)
                  )
                }
              </div>
          </div>
          <div className="row">
              <div className="members">
                <AttachMoneyIcon />
                <h4>Total {'SEC'} Paid</h4>
                {
                  config.isLoading ?
                  (
                    <div style={{display: 'flex', justifyContent: 'center'}}><Spinner /></div>
                  ):
                  (
                    config.data.length < 1 ? 
                    ('---'):
                    (<div style={{color: '#fff'}}>{config.data.totalSecPaid} {config.data.nativeCurrency}</div>)
                  )
                }
              </div>
              <div className="investor">
                <div>
                    <Rating />
                </div>
                <h4>Ratings</h4>
                <div style={{color: '#fff'}}>4</div>
              </div>
          </div>
        </div>
    </StyledStatsWidget>
  )
}


const StyledStatsWidget = styled.div`
    background: var(--major-color-30A);
    .row{
      display: flex;
      text-align: center;
      padding: 10px;
      font-weight: bold;
      justify-content: space-between;
    }
`
export default StatsWidget