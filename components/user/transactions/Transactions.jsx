import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Deposit from "./Deposit.jsx";
import Withdrawals from "./Withdrawals.jsx";
import Transfer from "./Transfer.jsx";
import Spinner from "../../../loaders/Spinner";
import { getUser } from "../../../redux/auth/auth";
import { getConfig } from "../../../redux/admin/web_config";
import { getTnx, getTrfTnx } from "../../../redux/transactions/transactions";

import {
  AdminWrapper,
} from "../../admin/styles";



export default function Transactions({toggleState}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {txns} = state.transactions;
  const {trfTxns} = state.transactions;
  const {user} = state.auth;
  const {config} = state.config;
  const [isLoading, setLoading] = useState(true)

  const [type, setType] = useState('deposit') // deposit, withdrawals or transfer
  const [deposit, setDeposit] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [transfer, setTransfer] = useState([])

  useEffect(()=>{
    dispatch(getTnx())
    dispatch(getTrfTnx())
    dispatch(getUser())
    dispatch(getConfig())

    // setTimeout(()=>{
    //     config.isLoadin && user.isLoadin && txns.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)

    config.isLoadin && user.isLoadin && txns.isLoading  && trfTxns.isLoading ? setLoading(true) : setLoading(false)
  }, [])

  
  useEffect(()=>{
    setDeposit(txns.data.filter(data=> data.type === 'deposit' && data.status !== 'canceled'));

    setWithdrawals(txns.data.filter(data=> data.type === 'withdrawal'));
    
    setTransfer(trfTxns.data);
   
  }, [txns])

  return (
    <div>
      <AdminWrapper>
          <Head type={type}>
            <div className="col">
              <button onClick={()=>setType('deposit')} className="deposit">deposit</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  txns.isLoading ? <Spinner size='10px' /> :
                  (
                    deposit.length < 1 ? '---' : deposit.length
                  )
                }
              </div>
            </div>

            <div className="col">
              <button onClick={()=>setType('withdrawals')} className="withdrawals">Withdrawals</button>
              <div style={{display: 'flex', justifyContent: 'center', color: '#c20'}}>
                {
                  txns.isLoading ? <Spinner size='10px' /> :
                  (
                   withdrawals.length < 1 ? '---' :withdrawals.length
                  )
                }
              </div>
            </div>

            <div className="col">
              <button onClick={()=>setType('transfer')} className="transfer">Transfer</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  trfTxns.isLoading ? <Spinner size='10px' /> :
                  (
                    transfer.length < 1 ? '---' : transfer.length
                  )
                }
              </div>
            </div>
          </Head>
          {
            isLoading ? <div style={{display: 'flex', justifyContent: 'center'}}><Loader_ /></div> : 
            (
              (function(){
                if(type==='deposit'){
                  return <Deposit toggleState={toggleState} data={deposit}/>
                }
                else if(type==='withdrawals'){
                  return <Withdrawals toggleState={toggleState} data={withdrawals}/>
                }
                else if(type==='transfer'){
                    return <Transfer toggleState={toggleState} data={transfer} id={trfTxns.id}/>
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
  padding: 10px;
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

    .deposit{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='deposit' ? '2px solid green': '1px solid #ccc'}
    };

    .withdrawals{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='withdrawals' ? '2px solid green': '1px solid #ccc'}
    }

    .transfer{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='transfer' ? '2px solid green': '1px solid #ccc'}
    }
`