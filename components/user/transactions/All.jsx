import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import date from '../date/data';

import {
  Header_Table,
} from '../../admin/styles';


export default function All({data, toggleState, id}) {
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(data);
    const [clicked, setClicked] = useState(false)

    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "code", 'accountNumber', "walletAddress",  "nativeAmountExpected", "nativeAmountReceived", "tradeAmountExpected", "tradeAmountReceived", "transactionId"],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    const toggle =(index)=>{
      if(clicked === index){
        return setClicked(null)
      }
      setClicked(index)
    }

    return (
        <div>
          <Header_Table>
            {
              data.length < 1 ? "" :
              (
                <div className="row">
                  <div className="search">
                      <input
                      type="text"
                      placeholder="Search by Code, Amount Account Number, Wallet Address or Id"
                      value={inp || ''}
                      onChange={(e)=>setInp(e.target.value)}
                      />
                      <div className="icon"><SearchIcon /></div>
                  </div>
                </div>
              )
            }
          </Header_Table>
          {
             data.length < 1 ? <Msg /> : 
             <Wrapper>
                {
                  filteredData.map((data, index)=>{
                   return (
                    <Card toggleState={toggleState} key={data._id}>
                      <div style={
                        (function(){
                            // deposit transactions``
                            if(data.status === 'charge-created'){
                            return {color: '#c20'}
                            }
                            else if(data.status === 'pending'){
                                return {color: 'var(--major-color-purest'}
                            }
                            else if(data.status === 'successful'){
                                return {color: 'green'}
                            }

                            // transfer transactions
                            if(id === data.sender._id){
                            return {color: '#c20'}
                            }
                            else if(id === data.receiver._id){
                                return {color: 'green'}
                            }

                            // withdrawal transactions
                            if(data.status === 'successful'){
                            return {color: 'green'}
                            }
                            else if(data.status === 'pending'){
                                return {color: 'gold'}
                            }
                            else if(data.status === 'rejected'){
                                return {color: '#c20'}
                            }
                        }())
                      }  onClick={()=>toggle(index)} className='arrow'>
                        {clicked==index ? <ArrowDropUpIcon />:<ArrowDropDownIcon /> }
                      </div>
                      {
                        (function(){
                            // deposit transactions``
                            if(data.type === 'deposit' && data.status==='successful'){
                                return (
                                <div>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                    <span>You have Successfully Deposited the sum of <span style={{fontWeight: 'bold'}}>{data.nativeAmountReceived && data.nativeAmountReceived.toFixed(2)} {data.currency}</span> to your account</span>
                                    </div>

                                    {
                                    clicked === index ?
                                    <div className="dropdown">
                                        <div>Confirmed: <span style={{fontSize: '.6rem'}}>{date.updatedDate(data)}</span></div>
                                        <div>Code: {data.code}</div>
                                        <div>Id: {data._id}</div>
                                        <div onClick={()=>window.open(data.link)} className='track'>Track</div>
                                    </div> : null
                                    }
                                </div>
                                )
                            }
                            else if(data.type === 'deposit' && data.status === 'pending'){
                                return (
                                <div style={{cursor: 'pointer', fontSize: '.6rem'}}>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                    <span>You have Successfully Deposited the sum of <span style={{fontWeight: 'bold'}}>{data.nativeAmountReceived && data.nativeAmountReceived.toFixed(2)} {data.currency}</span> to your account</span>
                                    </div>

                                    {
                                    clicked === index ?
                                    <div className="dropdown">
                                        <div>pending: <span style={{fontSize: '.6rem'}}>{date.updatedDate(data)}</span></div>
                                        <div>Code: {data.code}</div>
                                        <div>Id: {data._id}</div>
                                        <div onClick={()=>window.open(data.link)} className='track'>Track</div>
                                    </div> : null
                                    }
                                </div>
                                )
                            }
                            else if(data.type === 'deposit' && data.status === 'charge-created'){
                                return (
                                <div style={{cursor: 'pointer'}}>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                    <span>You Initiated a Deposit request of <span style={{fontWeight: 'bold'}}>{data.nativeAmountReceived && data.nativeAmountExpected.toFixed(2)} {data.currency}</span></span>
                                    </div>

                                    {
                                    clicked === index ?
                                    <div className="dropdown">
                                        <div>Waiting...</div>
                                        <div>Code: {data.code}</div>
                                        <div>Id: {data._id}</div>
                                        <div onClick={()=>window.open(data.link)} className='track'>Track</div>
                                    </div> : null
                                    }
                                </div>
                                )
                            }

                            // transfer transactions
                            else if(data.type === 'transfer' && id === data.sender._id){
                                return (
                                <div>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                    <span>You sent the sum of </span><span style={{fontWeight: 'bold'}}>{data.amount} {data.currency}</span> <span>to </span> <span>{data.receiver.username}</span>
                                    </div>

                                    {
                                    clicked === index ?
                                    <div className="dropdown">
                                        <div>Receiver: {data.receiver.username}</div>
                                        <div>Account No: {data.accountNumber}</div>
                                        <div>Id: {data._id}</div>
                                    </div> : null
                                    }

                                </div>
                                
                                )
                            }
                            else if(data.type === 'transfer' && id === data.receiver._id){
                                return (
                                <div>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                    <span>You received the sum of </span><span style={{fontWeight: 'bold'}}>{data.amount} {data.currency}</span> <span>from </span> <span>{data.sender.username}</span>
                                    </div>

                                    {
                                    clicked === index ?
                                    <div className="dropdown">
                                        <div>Sender: {data.sender.username}</div>
                                        <div>Account No: {data.accountNumber}</div>
                                        <div>Id: {data._id}</div>
                                    </div> : null
                                    }
                                </div>
                                )
                            }

                            // withdrawal transactions
                            else if(data.type === 'withdrawal' && data.status === 'successful'){
                                return (
                                  <div>
                                    <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                    <div className='item'>
                                      <span>Your Withdrawal Request of </span><span style={{fontWeight: 'bold'}}>{data.amount && data.amount.toFixed(2)} {data.curreny}</span><span>was Successful</span>
                                    </div>
                                    {
                                      clicked === index ?
                                      <div className="dropdown">
                                        <div>Confirmed: <span style={{fontSize: '.6rem'}}>{date.updatedDate(data)}</span></div>
                                        <div>Wallet: {data.walletAddress}</div>
                                        <div>Coin: {data.coin}</div>
                                      </div> : null
                                    }
    
                                  </div>
                                )
                            }
                            else if(data.type === 'withdrawal' && data.status === 'pending'){
                            return (
                                <div>
                                <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                <div className='item'>
                                    <span>Your Withdrawal Request of </span><span style={{fontWeight: 'bold'}}>{data.amount && data.amount.toFixed(2)} {data.curreny}</span><span>is been Processed</span>
                                </div>

                                {
                                    clicked === index ?
                                    <div className="dropdown">
                                    <div>Pending: ---</div>
                                    <div>Wallet: {data.walletAddress}</div>
                                    <div>Coin: {data.coin}</div>
                                    </div> : null
                                }
                                </div>
                            )
                            }
                            else if(data.type === 'withdrawal' && data.status === 'rejected'){
                            return (
                                <div>
                                <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                <div className='item'>
                                    <span>Your Withdrawal Request of </span><span style={{fontWeight: 'bold'}}>{data.amount && data.amount.toFixed(2)} {data.curreny}</span><span>was Rejected</span>
                                </div>

                                {
                                    clicked === index ?
                                    <div className="dropdown">
                                    <div>Rejected: <span style={{fontSize: '.6rem'}}>{date.updatedDate(data)}</span></div>
                                    <div>Wallet: {data.walletAddress}</div>
                                    <div>Coin: {data.coin}</div>
                                    </div> : null
                                }
                                </div>
                            )
                            }
                        }())
                      }
                    </Card> 
                   ) 
                  })
                }
             </Wrapper>
          }
         
        </div>
    )
}




const Wrapper = styled.div`
  width: 98%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  margin: auto;

  @media (max-width: 366px){
    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
  }

` 

const Card = styled.div`
  width: 180px;
  min-height: 70px;
  cursor: default;
  margin: 10px auto;
  padding: 2px 10px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .item{
    font-size: .65rem;
    // line-height: .3rem;
  }

  .track{
    text-align: center;
    margin:10px auto 1px auto;
    padding: 5px;
    cursor: pointer;
    background: #e5e5e5;
    font-weight: bold;
    
  }

  .arrow {
    cursor: pointer;
    position: absolute;
    top: -2px;
    font-weight: bold;
    right: 2px;
  }
  @media (max-width: 366px){
    width: 300px;
  }

  .dropdown{
    margin-top: 2px;
    position: absolute;
    top: 60px;
    left: 0px;
    font-size: .65rem;
    right: 0px;
    padding: 5px 10px;
    width: 100%;
    min-height: 100px;
    z-index:1;
    background: ${({toggleState})=>toggleState ? 'var(--light-theme)' : 'var(--dark-theme)'};
  }
`

const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        No Any Successful Deposit Transactions At The Moment
      </MsgWrapper>
    )
}


const MsgWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
