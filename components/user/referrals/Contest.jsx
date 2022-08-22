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
import Countdown from 'react-countdown';

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
    <>
     <GoBackBtn />
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
                                <th>S/N</th>
                                <th>Date</th>
                                <th>Username</th>
                                <th>Downlines</th>
                                <th>Points</th>
                                <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice(0, count).map((data, i)=>{
                                return (
                                    <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>
                                        {data.updatedAt && new Date(data.updatedAt).toLocaleString()}
                                    </td>
                                    <td>{data.userId.username ? data.userId.username : '(User Removed)'}</td>
                                    <td>{data.userId.referree && data.userId.referree.length}</td>
                                    <td>{data.point}</td>
                                    <td>{data.paid ? 'True' : 'False'}</td>
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
    </>
       
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

