import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";

import {
  Header_Table,
  Table
} from '../styles';


export default function Rejected({data}) {
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(data);
    const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "username", "email", "amount", "accountNumber", "_id"],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    return (
        <div>
          <Header_Table>
            {
              data.length < 1 ? '' :
              (
                <div className="row">
                  <div className="search">
                      <input
                      type="text"
                      placeholder="Search by username, email, amount, wallet or id"
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
            data.length < 1 ? <Msg />:
            (
              <Table>
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Date Created</th>
                            <th>Date Rejected</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Amount {`(${data && data[0] && data[0].currency.toUpperCase()})`}</th>
                            <th>Amount {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                            <th>Coin</th>
                            <th>Wallet</th>
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
                            <td>{data.userId ? data.userId.email : '(User Removed)'}</td>
                            <td>{data.userId ? data.userId.username : '(User Removed)'}</td>
                            <td>{data.amount}</td>
                            <td>{data.convertedAmount}</td>
                            <td>{data.coin}</td>
                            <td>{data.walletAddress}</td>
                            <td style={{color: 'var(--bright-color'}}>{data.status}</td>
                            <td>{data._id}</td>  
                          </tr>
                        )
                      })}
                    </tbody>
                </table>
              </Table>
            )
          }
        </div>
    )
}



const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        No Any Rejected Withdrawal Transaction At The Moment
      </MsgWrapper>
    )
}


const MsgWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  font-size: .7rem;
  // box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`
