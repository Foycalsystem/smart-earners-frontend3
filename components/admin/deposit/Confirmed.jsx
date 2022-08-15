import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import Spinner from "../../../loaders/Spinner";

import {
  Header_Table,
  Table
} from '../styles';


export default function Confirmed({data}) {
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(data);
    const [pending, setPending] = useState(true)
    const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "code", "nativeAmountExpected", "nativeAmountReceived", "tradeAmountExpected", "tradeAmountReceived", "_id"],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    useEffect(()=>{
      setTimeout(()=>{
        setPending(false)
      }, 2000)
    }, [])
    
    return (
        <div>
          {
            pending ? <div style={{display: 'flex', justifyContent: 'center'}}><Spinner size="25px"/></div> :
            (
            <>
              <Header_Table>
              {
              data.length < 1 ? "" :
                (
                  <div className="row">
                    <div className="search">
                        <input
                        type="text"
                        placeholder="Search by code, amount or id"
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
              (
                <Table>
                  <table>
                      <thead>
                          <tr>
                              <th>S/N</th>
                              <th>Date Created</th>
                              <th>Date Confirmed</th>
                              <th>Email</th>
                              <th>Username</th>
                              <th>Amount Expected {`(${data && data[0] && data[0].currency.toUpperCase()})`}</th>
                              <th>Aount Expected {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                              <th>Amount Deposited {`(${data && data[0] && data[0].currency.toUpperCase()})`}</th>
                              <th>Aount Deposited {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                              <th>Comment</th>
                              <th>Overpaid By {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                              <th>Underpaid By {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                              <th>Code</th>
                              <th>Track</th>
                              <th>Status</th>
                              <th>Id</th>
                          </tr>
                      </thead>
                      <tbody>
                      {filteredData.map((data, i)=>{
                          return (
                            <tr key={data._id}>
                              <td>{i+1}</td>
                              <td>
                                {month[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getDate()}, {new Date(data.createdAt).getFullYear()}
                                <div style={{fontSize:'.6rem'}}>
                                  {new Date(data.createdAt).getHours()} : {new Date(data.createdAt).getMinutes()} : {new Date(data.createdAt).getSeconds()}
                                </div>
                              </td>

                              <td>
                                {month[new Date(data.updatedAt).getMonth()]} {new Date(data.updatedAt).getDate()}, {new Date(data.updatedAt).getFullYear()}
                                <div style={{fontSize:'.6rem'}}>
                                  {new Date(data.updatedAt).getHours()} : {new Date(data.updatedAt).getMinutes()} : {new Date(data.updatedAt).getSeconds()}
                                </div>
                              </td>

                              <td>{data.userId && data.userId.email}</td>
                              <td>{data.userId && data.userId.username}</td>
                              
                              <td>{data.nativeAmountExpected && data.nativeAmountExpected.toFixed(4)}</td>
                              <td>{data.tradeAmountExpected && data.tradeAmountExpected.toFixed(4)}</td>
                              <td>{data.nativeAmountReceived.toFixed(4)}</td>
                              <td>{data.tradeAmountReceived && data.tradeAmountReceived.toFixed(4)}</td>
                              <td>{data.comment}</td>
                              <td>{data.overPaidBy}</td>
                              <td>{data.underPaidBy}</td>
                              <td>{data.code}</td>
        
                              <td style={{cursor: 'pointer', userSelect: 'none'}} onDoubleClick={()=>window.open(data.link)}>Link</td>

                              <td style={{color: 'var(--bright-color'}}>{
                                (function(){
                                  if(data.status==='charge-created'){
                                    return "Initiated"
                                  }
                                  else if(data.status==='charge-confirmed'){
                                    return "Successful"
                                  }
                                  else if(data.status==='charge-pending'){
                                    return "Pending"
                                  }
                                  else{
                                    return ''
                                  }
                                }())
                              }</td>
                              <td>{data._id}</td>  
                              
                            </tr>
                          )
                        })}
                      </tbody>
                  </table>
                </Table>
              )
            }
          
            </>
            )
          }
          
        </div>
    )
}




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
  font-size: .8rem;
  text-align: center;
  margin: 10px auto;
  // box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`
