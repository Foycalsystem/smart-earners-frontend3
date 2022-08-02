import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getWithdrawals, } from "../../../redux/admin/withdrawals";
import styled from 'styled-components';
import Rejected from "./Rejected.jsx";
import Confirmed from "./Confirmed.jsx";
import Request from "./Request.jsx";

import {
  AdminWrapper,
  Header,
} from "../styles";
import Spinner from "../../../loaders/Spinner";


export default function Transactions() {
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {withdrawals} = state.withdrawal;
  const [isLoading, setLoading] = useState(true);
  const [type, setType] = useState('request') // request, rejected or confirmed
  const [pending, setPending] = useState([])
  const [confirmed, setConfirmed] = useState([])
  const [rejected, setRejected] = useState([])

  useEffect(()=>{
    dispatch(getWithdrawals())

    setTimeout(()=>{
      withdrawals.isLoading ? setLoading(true) : setLoading(false)
    }, 1000)
  }, [])


  useEffect(()=>{
    setPending(withdrawals.data.filter(data=> data.status === 'pending'));

    setRejected(withdrawals.data.filter(data=> data.status === 'rejected'));

    setConfirmed(withdrawals.data.filter(data=> data.status === 'confirmed'))
   
  }, [withdrawals])

  return (
    <div>
      <Header>
          <Link href='/admin/withdrawals' passHref>
            <a className={router.asPath === '/admin/withdrawals' ? 'active' : ''}>Config</a>
          </Link>
          <Link href='/admin/withdrawals/transactions' passHref>
            <a className={router.asPath === '/admin/withdrawals/transactions' ? 'active' : ''}>Transactions</a>
          </Link>
      </Header>

      <AdminWrapper>
          <Head type={type}>
            <div className="col">
              <button onClick={()=>setType('request')} className="request">Request</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  withdrawals.isLoading ? <Spinner size='10px' /> :
                  (
                    pending.length < 1 ? '---' : pending.length
                  )
                }
              </div>
            </div>
            <div className="col">
              <button onClick={()=>setType('confirmed')} className="confirmed">Confirmed</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  withdrawals.isLoading ? <Spinner size='10px' /> :
                  (
                    confirmed.length < 1 ? '---' : confirmed.length
                  )
                }
              </div>
            </div>
            <div className="col">
              <button onClick={()=>setType('rejected')} className="rejected">Rejected</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  withdrawals.isLoading ? <Spinner size='10px' /> :
                  (
                   rejected.length < 1 ? '---' :rejected.length
                  )
                }
              </div>
            </div>
          </Head>
          {
            isLoading ? <div style={{display: 'flex', justifyContent: 'center'}}><Loader_ /></div> : 
            (
              withdrawals.data.length < 1 ? <div style={{textAlign: 'center'}}>No data currently available</div> : 
              (
                (function(){
                  if(type==='request'){
                    return <Request data={pending}/>
                  }
                  else if(type==='confirmed'){
                    return <Confirmed data={confirmed}/>
                  }
                  else if(type==='rejected'){
                    return <Rejected data={rejected}/>
                  }
                }())
              )
            )
          }
      </AdminWrapper>
    </div>
  )
}



const Head = styled.div`
  width: 100%;
  padding: 2px 10px;
  display: flex;
  justify-content: space-between;

  .col{
    width: 100px;
    display: flex;
    align-items: center;
    flex-flow: column;
    font-size: .7rem;
    text-align: center;

    button{
      padding: 7px 5px;
      color: #fff;
      // border-radius: 3px;
      border: none;
      cursor: pointer;

      &:focus{
        outline: none;
      }
    }

    .request{
      background: var(--bright-color);
      border: ${({type})=>type==='request' ? '2px solid green': ''}
    };

    .confirmed{
      background: var(--major-color-purest);
      border: ${({type})=>type==='confirmed' ? '2px solid green': ''}
    }

    .rejected{
      background: #c20;
      border: ${({type})=>type==='rejected' ? '2px solid green': ''}
  }
`