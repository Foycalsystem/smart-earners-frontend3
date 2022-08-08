import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { blockUser, getUsers, getUser, deleteUser, unBlockUser, makeAdmin, removeAdmin } from "../../../redux/auth/auth";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Spinner from "../../../loaders/Spinner";
import filter from "@mozeyinedu/filter";
import { getConfig } from "../../../redux/admin/web_config";
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi";

import {
  AdminWrapper,
  Header_Table,
  Table
} from "../styles";

export default function Users({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {users, user, del, block, unblock, makeadmin, removeadmin} = state.auth;
  const {config} = state.config;

  const [investor, setInvestor] = useState(0);
  const [balance, setBalance] = useState(0)
  const [admin, setAdmin] = useState(0);
  const [inp, setInp] = useState('');
  const [filteredData, setFilter] = useState(users.data);

  const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
 
  useEffect(()=>{
    let sum = 0;
    for(let i=0; i<users.data.length; i++){
      if(users.data[i].hasInvested){
        sum = sum + 1
      }
    }
    setInvestor(sum)

    let bal = 0;
    for(let i=0; i<users.data.length; i++){
      bal = bal + users.data[i].amount
    }
    setBalance(bal)

    
    let ad = 0;
    for(let i=0; i<users.data.length; i++){
      if(users.data[i].isAdmin || users.data[i].isPrimaryAdmin){
        ad = ad + 1
      }
    }
    setAdmin(ad)
    
  }, [users])

  useEffect(()=>{
    const newData = filter({
      data: users.data,
      keys: [ "username", "email", "amount", "accountNumber"],
      input: inp
    })

    setFilter(newData)

  }, [inp, users])

  
  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getUser())
    dispatch(getConfig())

    // setTimeout(()=>{
    //   users.isLoading && user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)

    users.isLoading && user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)
  }, [])


  const handleDelete = async(id)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    dispatch(deleteUser(id))
  }
  
  const handleBlock = async(id, isBlock)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    isBlock ?  dispatch(unBlockUser(id)) :  dispatch(blockUser(id))
  }

  const handleAdmin = async(id, isAdmin)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    isAdmin ?  dispatch(removeAdmin(id)) :  dispatch(makeAdmin(id))
  }
  

  return (
    <>
      <Header_Table>
        <div className="row">
         <div className="search">
            <input
              type="text"
              placeholder="Search by username, email, amount"
              value={inp || ''}
              onChange={(e)=>setInp(e.target.value)}
            />
            <div className="icon"><SearchIcon /></div>
         </div>
        </div>
        <div className="row">
          <div>Total members: {isLoading ? '---' : users.data.length }</div>
          <div>Total Investors: {isLoading ? '---' : investor}</div>
          <div>Overall Balance: {isLoading ? '---' : balance} {config.data.nativeCurrency}</div>
          <div>Admin: {isLoading ? '---' : admin}</div>
        </div>
      </Header_Table>
    {
    //check if user exist
    isLoading ? 
    (
      // set loading div
      <Loader_ />
    ) :
    (
      //check if empty
      users.data.length < 1 ?
      (
       ''
      ):
      (
        <AdminWrapper>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {
              (function(){
                if(del.isLoading || block.isLoading || unblock.isLoading || makeadmin.isLoading || removeadmin.isLoading){
                  return <Spinner size='1.5rem' />
                }else{
                  return ''
                }
              }())
            }
          </div>
          <Table>
          <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Balance {`(${users.data[0].currency})`}</th>
                    <th>Investor</th>
                    <th>AC/No</th>
                    <th>Verified</th>
                    <th>Blocked</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user, i)=>{
                    return (
                      <tr key={user._id}>
                        <td>{i+1}</td>
                        <td>
                          {month[new Date(user.createdAt).getMonth()]} {new Date(user.createdAt).getDate()}, {new Date(user.createdAt).getFullYear()}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td onClick={()=>handleAdmin(user._id, user.isAdmin)} style={{cursor: 'pointer', fontWeight: 'bold', color: user.isAdmin ? 'green' : 'var(--major-color-purest)'}}>
                          {
                            (function(){
                              if(user.isAdmin && !user.isPrimaryAdmin){
                                return 'Admin'
                              }
                              else if(user.isPrimaryAdmin && user.isAdmin){
                                return 'Primary Admin'
                              }
                              else{
                                return 'User'
                              }
                            }())
                          }
                        </td>
                        <td>{user.amount && user.amount.toFixed(4)}</td>
                        <td>{user.hasInvested ? 'True' : 'False'}</td>
                        <td>{user.accountNumber}</td>
                        <td>{user.isVerified ? <VerifiedUserIcon style={{fontSize: '1rem', color: "var(--bright-color"}}/> : ''}</td>
                        <td onClick={()=>handleBlock(user._id, user.isBlocked)} style={{cursor: 'pointer', fontWeight: 'bold', color: user.isBlocked ? '#c20' : 'var(--major-color-purest)'}}>
                          {
                            user.isBlocked ? "Unblock" : "Block"
                          }
                        </td>

                        <td onClick={()=>handleDelete(user._id)} style={{cursor: 'pointer', fontWeight: 'bold', color: '#c20'}}>Remove</td>
                      </tr>
                    )
                  })}
                </tbody>
          </table>
          </Table>
        </AdminWrapper>
      )
    )
    }    
    </>
  )
}


