import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getDepositTnx, } from "../../../redux/admin/deposit";
import styled from 'styled-components';
import Initiated from "./Initiated.jsx";
import Confirmed from "./Confirmed.jsx";
import Pending from "./Pending";
import Spinner from "../../../loaders/Spinner";
import { getUser } from "../../../redux/auth/auth";
import { getConfig } from "../../../redux/admin/web_config";


import {
  AdminWrapper,
} from "../styles";



export default function Transactions() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {txns} = state.deposit;
  const {user} = state.auth;
  const {config} = state.config;
  const [isLoading, setLoading] = useState(true)

  const [type, setType] = useState('initiated') // initiated, pending or confirmed
  const [pending, setPending] = useState([])
  const [confirmed, setConfirmed] = useState([])
  const [initiated, setInitiated] = useState([])

  useEffect(()=>{
    dispatch(getDepositTnx())
    dispatch(getUser())
    dispatch(getConfig())

    // setTimeout(()=>{
    //     config.isLoadin && user.isLoadin && txns.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)

    config.isLoadin && user.isLoadin && txns.isLoading ? setLoading(true) : setLoading(false)
  }, [])


  useEffect(()=>{
    setInitiated(txns.data.filter(data=> data.status === 'charge-created'));

    setPending(txns.data.filter(data=> data.status === 'charge-pending'));

    setConfirmed(txns.data.filter(data=> data.status === 'charge-confirmed'))
   
  }, [txns])

  return (
    <div>
      <AdminWrapper>
          <Head type={type}>
            <div className="col">
              <button onClick={()=>setType('initiated')} className="initiated">Initiated</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  txns.isLoading ? <Spinner size='10px' /> :
                  (
                    initiated.length < 1 ? '---' : initiated.length
                  )
                }
              </div>
            </div>

            <div className="col">
              <button onClick={()=>setType('pending')} className="pending">Pending</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  txns.isLoading ? <Spinner size='10px' /> :
                  (
                   pending.length < 1 ? '---' :pending.length
                  )
                }
              </div>
            </div>

            <div className="col">
              <button onClick={()=>setType('confirmed')} className="confirmed">Confirmed</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  txns.isLoading ? <Spinner size='10px' /> :
                  (
                    confirmed.length < 1 ? '---' : confirmed.length
                  )
                }
              </div>
            </div>
          </Head>
          {
            isLoading ? <div style={{display: 'flex', justifyContent: 'center'}}><Loader_ /></div> : 
            (
              (function(){
                if(type==='initiated'){
                  return <Initiated data={initiated}/>
                }
                else if(type==='pending'){
                  return <Pending data={pending}/>
                }
                else if(type==='confirmed'){
                    return <Confirmed data={confirmed}/>
                }
                else{
                  return ''
                }
              }())
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

    .initiated{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='initiated' ? '2px solid green': '1px solid #ccc'}
    };

    .confirmed{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='confirmed' ? '2px solid green': '1px solid #ccc'}
    }

    .pending{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='pending' ? '2px solid green': '1px solid #ccc'}
    }
`