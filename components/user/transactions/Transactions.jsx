import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Deposit from "./Deposit.jsx";
import Withdrawals from "./Withdrawals.jsx";
import All from "./All.jsx";
import Transfer from "./Transfer.jsx";
import Spinner from "../../../loaders/Spinner";
import { getUser } from "../../../redux/auth/auth";
import { getConfig } from "../../../redux/admin/web_config";
import { getTnx } from "../../../redux/transactions/transactions";
import {getWithdrawals_users} from  "../../../redux/admin/withdrawals";
import {getAllTxn_users} from  "../../../redux/admin/transfer";
import {getDepositTnx_users} from  "../../../redux/admin/deposit";

import {
  AdminWrapper,
} from "../../admin/styles";



export default function Transactions({toggleState}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {txns} = state.transactions;
  const {user} = state.auth;
  const {config} = state.config;
  const {withdrawals_users} = state.withdrawal;
  const {txns_users} = state.deposit;
  const {transferTxn_users} = state.transfer;
  const [isLoading, setLoading] = useState(true)

  const [type, setType] = useState('all') // deposit, withdrawals or transfer
  const [deposit, setDeposit] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [transfer, setTransfer] = useState([])
  const [all, setAll] = useState([])
  const [allTnx, setAllTnx] = useState([])
  const [preparingData, setPreparingData] = useState(false)

  useEffect(()=>{
    dispatch(getWithdrawals_users())
    dispatch(getAllTxn_users())
    dispatch(getDepositTnx_users())
    dispatch(getTnx())
    dispatch(getUser())
    dispatch(getConfig())

    setTimeout(()=>{
        config.isLoadin && user.isLoadin && withdrawals_users.isLoading  && txns_users.isLoading && transferTxn_users.isLoading ? setLoading(true) : setLoading(false)
    }, 1000)

    // config.isLoadin && user.isLoadin && txns.isLoading ? setLoading(true) : setLoading(false)
  }, [])
  
  useEffect(()=>{

    setDeposit(txns_users.data);
    // setDeposit(txns.data.filter(data=> data.type === 'deposit' && data.status !== 'canceled'));

    setWithdrawals(withdrawals_users.data);
    // setWithdrawals(txns.data.filter(data=> data.type === 'withdrawal'));

    setTransfer(transferTxn_users.data);
    // setTransfer(txns.data.filter(data=> data.type === 'transfer'));

    // setAll(txns.data.filter(data=> data.status !== 'canceled'));
    setAllTnx([...transferTxn_users.data, ...txns_users.data, ...withdrawals_users.data]);

    // sort base on time
    function resolveSort(a, b){
      const date1 = new Date(a.createdAt
        );
      const date2 = new Date(b.createdAt
        )

      return date1 - date2
    }
    setAll(allTnx.sort(resolveSort))

  }, [transferTxn_users, txns_users, withdrawals_users])

  return (
    <div>
      <AdminWrapper>
          <Head type={type}>
            <div className="col">
              <button onClick={()=>setType('all')} className="all">All</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  isLoading ? <Spinner size='10px' /> :
                  (
                    all.length < 1 ? '---' : all.length
                  )
                }
              </div>
            </div>
            <div className="col">
              <button onClick={()=>setType('deposit')} className="deposit">Deposit</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  isLoading ? <Spinner size='10px' /> :
                  (
                    deposit.length < 1 ? '---' : deposit.length
                  )
                }
              </div>
            </div>

            <div className="col">
              <button onClick={()=>setType('withdrawals')} className="withdrawals">Withdrawals</button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                  isLoading ? <Spinner size='10px' /> :
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
                  isLoading ? <Spinner size='10px' /> :
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
                if(type==='all'){
                  return <All isLoading={isLoading} toggleState={toggleState} data={allTnx} id={user.data._id}/>
                }
                else if(type==='deposit'){
                  return <Deposit toggleState={toggleState} data={deposit}/>
                }
                else if(type==='withdrawals'){
                  return <Withdrawals toggleState={toggleState} data={withdrawals}/>
                }
                else if(type==='transfer'){
                    return <Transfer toggleState={toggleState} data={transfer} id={user.data._id}/>
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
        border: ${({type})=>type==='deposit' ? '2px solid green': '1px solid #dfdfdf'}
    };

    .all{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='all' ? '2px solid green': '1px solid #dfdfdf'}
    };
    .withdrawals{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='withdrawals' ? '2px solid green': '1px solid #dfdfdf'}
    }

    .transfer{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='transfer' ? '2px solid green': '1px solid #dfdfdf'}
    }
`