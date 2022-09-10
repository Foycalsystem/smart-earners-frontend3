import { useState, useEffect } from "react";
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from '../../admin/loader/Loader';
import { getConfig } from "../../../redux/admin/web_config";
import Link from 'next/link';
import Spinner from "../../../loaders/Spinner";
import { getAllContests } from "../../../redux/referrals/referrals";
import SearchIcon from '@mui/icons-material/Search';
import filter from "@mozeyinedu/filter";
import StartAt from "../../contest/StartAt";
import {useSnap} from '@mozeyinedu/hooks-lab'
import StopAt from "../../contest/StopAt";
import ContestPrize from "../../contest/ContestPrize";
import GoBackBtn from "../../GoBackBtn";
import CountdownTimer from "../../CountdownTimer";
import PopUpModal from "../../modals/popUpModal/PopUpModal";

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Header,
  Label,
  Header_Table,
  Table
} from "../../admin/styles";

import { useRouter } from "next/router";
import position from "../../../utils/resolvePosition";

export default function Contest() {
  const {snap} = useSnap(.5)
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config,} = state.config;
  const {user} = state.auth;
  const {contestants} = state.referrals
  const [inp, setInp] = useState('');
  const [filteredData, setFilter] = useState(contestants.data);
  const num = 10
  const [count, setCount] = useState(num);
  const [opening, setOpening] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    setLoading(true)
    dispatch(getConfig())
    dispatch(getAllContests())

    setTimeout(()=>{
      contestants.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

    // user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

  }, [])

  useEffect(()=>{
    const newData = filter({
      data: contestants.data || [],
      keys: [ "_id", "point"],
      input: inp
    })

    setFilter(newData)
  }, [inp, contestants])

  
  const handleViewMore =()=>{
    setOpening(true)

    setTimeout(()=>{
      setOpening(false)
      setCount(prevState=>prevState + num)
    }, 1000)
  }

  return (
    <Wrapper>
      <GoBackBtn />
      <Detials onClick={()=>setShowModal(true)} {...snap()}>View Detials</Detials>
      <PopUpModal title="The Breakdown" showModal={showModal} setShowModal={setShowModal}>
        <DetailContent>
          <p>Aside the 10% Referral bonuses for inviting a user, We Added extra prices in contest to be won according to your efforts and number of Active downlines!</p>

          <p>The Referral Ranking consist of prizes attached to be won by highest generating number of referrals on a weekly/timely bases.</p>

          <p>The rewards will be distributed accordingly, calculated based on highest point and commission.</p>

          <p>The Prices for the Bonus are not static, as it can be increased or reduced depending on the competitive rate. You can always check the referral Ranking Page to see the Rewards, basically Top 10 users will be rewarded According to their position, which is differentiated and Ranked according to points</p>

          <p>Here’s a Breakdown of how the Points are distributed.</p>

          <ul>
            <li>3k Plan - 0.1 Point</li>
            <li>5k plan - 0.2 Points</li>
            <li>10k plan - 0.3 points</li>
            <li>20k plan - 0.5 points</li>
            <li>50k plan - 1 point</li>
            <li>100k plan - 2 points</li>
            <li>200k+ plan - 0.3 points (generated 14 times of investment)</li>
          </ul>

          <p>The Points are subject to first Investment from your Referrals Only.</p>

          <p>The Reward are distributed 24 hours after the Contest Ends.</p>

          <p>Show off your Influence, and Earn amazing Rewards!</p>

          <p>⚠️ Self Referring or multiple accounts, will only result in disqualification and further deactivation of all your accounts!</p>

          <p>
            Happy Investing! <br /> 
            <span style={{fontStyle: 'italic', color: '#aaa'}}>TeamSmartEarners </span>
          </p>
        </DetailContent>
      </PopUpModal>
      {
        isLoading ? <Loader_ /> :
        
        (
          <>
            <Header_Table>            
            {
              contestants.data && contestants.data.length < 1 ? '' :
              <div className="row">
                <div className="search">
                    <input
                    type="text"
                    placeholder="Search by point, id"
                    value={inp || ''}
                    onChange={(e)=>setInp(e.target.value)}
                    />
                    <div className="icon"><SearchIcon /></div>
                </div>
              </div>
            }

            {
              config.data.allowReferralContest === 'no' ? <Msg color="#c20" text={'Contest is Currently Not Available'} /> :
              <div className="row">
                <div>Contest Starts At: <StartAt config={config} /></div>
                <div>Contest Stops At: <StopAt config={config} /></div>
                <CountdownTimer stopDate={config.data.referralContestStops} startDate={config.data.referralContestStarts} />
              </div>
            }

            {
              <div className="row">
                  <ContestPrize config={config}/>
              </div>
            }

            </Header_Table>

            {
              (
                contestants.data && contestants.data.length < 1 ? <Msg text={'No Data At The Moment'} /> : 
                  <AdminWrapper>
                      <Table  width="450px">
                          <table>
                              <thead>
                                  <tr>
                                  <th>Position</th>
                                  <th>Date</th>
                                  <th>Username</th>
                                  <th>Downlines</th>
                                  <th>Points</th>
                                  <th>Rewards {`(${config.data.nativeCurrency})`}</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {filteredData.slice(0, count).map((data, i)=>{
                                  return (
                                      <tr key={i}>
                                        <td>
                                          {data.position !==null ? data.position : i+1}{position(data.position !==null ? data.position : i+1)}
                                        </td>
                                        <td>
                                            {data.updatedAt && new Date(data.updatedAt).toLocaleString()}
                                        </td>
                                        <td>{data.userId ? data.userId.username : '(User Removed)'}</td>
                                        <td>{data.userId && data.userId.referree.length}</td>
                                        <td>{data.point}</td>
                                        <td>{data.amountRewards}</td>
                                      </tr>
                                  )
                                  })}
                              </tbody>
                          </table>
                      </Table>
                      {
                        count >= filteredData.length ? '' :
                        <ViewMore>
                          {
                            opening ? <div> <Spinner size="20px"/></div> : ''
                          }
                          <div onClick={handleViewMore} className="more" {...snap()}>View More...</div>
                        </ViewMore>
                      }
                      
                  </AdminWrapper>
              )
            }
          </>
        )
        
      }
    </Wrapper>
       
  )
}


const Msg = ({text, color})=>{

  return (
    <MsgWrapper color={color} className="none">
      {text}
    </MsgWrapper>
  )
}


  
  
const MsgWrapper = styled.div`
  max-width: 400px;
  padding: 10px;
  font-size: .8rem;
  color: ${({color})=>color ? color : 'inherit'};
  text-align: center;
  margin: 10px auto;
  // box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`

const ViewMore = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;

  .more{
    user-select: none;
    -webkit-user-select: none;
    font-size: .7rem;
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
    padding: 7px;

    &:hover{
      opacity: .4
    }
  }
`
const Wrapper = styled.div`
  position: relative;
`

const Detials = styled.div`
  position: absolute;
  background: var(--major-color-purest);
  color: #fff;
  font-size: .7rem;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  top: 5px; right: 10px;
`


const DetailContent = styled.div`
  width: 90vw;
  max-width: 700px;
  
  p, ul{
    padding: 10px 20px;
  }

  li{
    list-style-type:square;
    margin-left: 20px;
    line-height: 1.4rem;
    font-weight: 600;
  }

`
