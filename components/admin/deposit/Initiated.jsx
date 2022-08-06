import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { ScrollBar } from "../../../styles/globalStyle";
import { resolveApi } from '../../../utils/resolveApi';
import Cookies from 'js-cookie';
import Feedback from '../../Feedback';
import PopUpModal from '../../modals/popUpModal/PopUpModal';
import { handleResolve } from "../../../redux/admin/deposit";
import conversionRate from '../../../utils/conversionRate';
import Spinner from "../../../loaders/Spinner";


import {
  Header_Table,
  Table
} from '../styles';


export default function Initiated({data}) {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const [filteredData, setFilter] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const {resolveDeposit} = state.deposit;
    const {config} = state.config;

    const [inp, setInp] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    const [formInp, setFormInp] = useState('');
    const [feedback, setFeedback] = useState({
      msg: '',
      status: false
    })

    const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "code", "nativeAmountExpected", "nativeAmountReceived", "tradeAmountExpected", "tradeAmountReceived", "_id"],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    const resolve= async(data)=>{
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      setShowModal(true)
      setSelectedItem(data)
    }

    const cancel = async()=>{
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      setShowModal(false);
      setFormInp('')
    }

    const handleConfirm = async()=>{
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      dispatch(handleResolve({
        id: selectedItem._id,
        data: {amount: formInp}
      }))

      setFeedback({
        msg: resolveDeposit.msg,
        status: resolveDeposit.status
      })
    }

    useEffect(()=>{
      if(resolveDeposit.status){
        setFormInp('')
      }
    }, [resolveDeposit])

    return (
        <Wrap>
          <Header_Table>
            {
              data.length < 1 ? '' :
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
                            <th>Email</th>
                            <th>Username</th>
                            <th>Amount Expected {`(${data && data[0] && data[0].currency.toUpperCase()})`}</th>
                            <th>Aount Expected {`(${data && data[0] && data[0].tradeCurrency.toUpperCase()})`}</th>
                            <th>Code</th>
                            <th>Track</th>
                            <th>Resolve</th>
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
                            <td>{data.userId.email}</td>
                            <td>{data.userId.username}</td>
                            <td>{data.nativeAmountExpected}</td>
                            <td>{data.tradeAmountExpected}</td>
                            <td>{data.code}</td>
    
                            <td style={{cursor: 'pointer', userSelect: 'none'}} onDoubleClick={()=>window.open(data.link)}>Link</td>
                            <td style={{cursor: 'pointer', userSelect: 'none'}} onDoubleClick={()=>resolve(data)}>Resolve</td>
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

          <PopUpModal title={'Resolve Deposit'} showModal={showModal} setFeedback={setFeedback} setShowModal={setShowModal}>
            <div style={{width: '300px', padding: '20px'}}>
              <div className="center"> 
                  <Feedback
                    msg={resolveDeposit.msg}
                    status={resolveDeposit.status}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
              </div>

              <div style={{fontSize: '.9rem', textAlign: 'center'}}>{
                <div>
                    <span>You are about to credit the account of </span>
                    <span style={{fontWeight: 'bold'}}>
                      {`${selectedItem && selectedItem.userId.username} (${selectedItem && selectedItem.userId.email})`}
                    </span>
                    <span> with the sum of: </span>
                   
                    <span style={{fontWeight: 'bold'}}>
                      {formInp ? conversionRate.USD_TO_SEC(formInp, config.data.conversionRate) : '---'} {" "}
                      {selectedItem && selectedItem.currency}</span>
                    
                    <Input>
                      <input
                        type="number"
                        name='amount'
                        value={formInp || ''}
                        placeholder="Enter Amount in Dollar"
                        onChange={(e)=>setFormInp(e.target.value)}                  
                      />
                    </Input>

                </div>
              }</div>

              <div className='center'>
                {
                  resolveDeposit.isLoading ? <Spinner size="20px"/> : ''
                }
              </div>

              <div style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: "space-around"
              }}>
                <button
                  onClick={cancel}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '3px',
                    padding: '6px 8px',
                    background: '#c20',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none'
                  }}>Cancel</button>

                <button
                  onClick={handleConfirm}
                  disabled={resolveDeposit.isLoading || formInp == ''}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '3px',
                    padding: '6px 8px',
                    background: 'var(--major-color-purest)',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none'
                  }}>{resolveDeposit.isLoading ? 'Loading...' : 'Rsolve'}</button>
                  
              </div>
            </div>
          </PopUpModal>
         
        </Wrap>
    )
}


const Input = styled.div`
  width: 100%;
  margin: 5px;
  padding: 0 5px;

  input {
    border: 1px solid #ccc;
    width: 100%;
    padding: 7px;
    &:focus{
      outline: none;
      border: 2px solid green;
    }
  }

`

const Wrap = styled.div`
  .center{
    display: flex;
    justify-content: center;
  }
`


const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        No Any Deposit Has Been Initiated At The Moment
      </MsgWrapper>
    )
}


const MsgWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`
