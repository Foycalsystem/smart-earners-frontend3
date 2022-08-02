import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import { handleConfirmed, handleRejected } from "../../../redux/admin/withdrawals";
import {useSelector, useDispatch} from 'react-redux';
import Spinner from "../../../loaders/Spinner";
import Feedback from '../../Feedback';
import PopUpModal from '../../modals/popUpModal/PopUpModal';
import { ScrollBar } from "../../../styles/globalStyle";


export default function Request({data}) {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const {confirm} = state.withdrawal
    const {reject} = state.withdrawal

    const [inp, setInp] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [filteredData, setFilter] = useState(data);
    const [showModal, setShowModal] = useState(false)

    const [feedback, setFeedback] = useState({
      msg: confirm.msg || reject.msg,
      status: false
    })

    const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "username", "email", 'convertedAmount', "amount", "coin", 'walletAddress'],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    const rseolve=(data)=>{
      setShowModal(true)
      setSelectedItem(data)
    }

    const handleReject =()=>{
      dispatch(handleRejected(selectedItem._id))
    }

    const handleConfirm =()=>{
      dispatch(handleConfirmed(selectedItem._id))
    }

    console.log(data)
    useEffect(()=>{
      setFeedback({
        msg: confirm.msg || reject.msg,
        status: true
      })
    }, [confirm, reject])

    return (
      <Wrap>
        <Header>
          {
            data.length < 1 ? '' :
            (
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
            )
          }
        </Header>
        {
          data.length < 1 ?
          (
            <Msg />
          ): 
          (
            <Table>
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Amount {`(${data && data[0].currency.toUpperCase()})`}</th>
                        <th>{data && data[0].tradeCurrency.toUpperCase()}</th>
                        <th>Coin</th>
                        <th>Wallet</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {filteredData.map((data, i)=>{
                    return (
                      <tr onDoubleClick={()=>rseolve(data)} key={data._id}>
                        <td>{i+1}</td>
                        <td>
                          {month[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getDate()}, {new Date(data.createdAt).getFullYear()}
                          <div style={{fontSize:'.6rem'}}>
                            {new Date(data.createdAt).getHours()} : {new Date(data.createdAt).getMinutes()} : {new Date(data.createdAt).getSeconds()}
                          </div>
                        </td>
                        <td>{data.userId.email}</td>
                        <td>{data.userId.username}</td>
                        <td>{data.amount}</td>
                        <td>{data.convertedAmount}</td>
                        <td>{data.coin}</td>
                        <td>{data.walletAddress}</td>
                        <td style={{color: 'var(--bright-color'}}>{data.status}</td>
                        
                      </tr>
                    )
                  })}
                </tbody>
            </table>
            </Table>
          )
        }
      
        <PopUpModal title={'Withdrawal Request'} showModal={showModal} setFeedback={setFeedback} setShowModal={setShowModal}>
            <div style={{width: '300px', padding: '20px'}}>
              <div className="center"> 
                  <Feedback
                    msg={confirm.msg || reject.msg}
                    status={confirm.status || reject.status}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
              </div>

              <div style={{fontSize: '.9rem', textAlign: 'center'}}>{
                <>
                    <span style={{fontWeight: 'bold'}}>
                      {selectedItem && selectedItem.userId.username}
                    </span>
                    <span> is requesting to make a withdrawal of the Sum of </span>
                    <span style={{fontWeight: 'bold'}}>
                      {selectedItem && selectedItem.convertedAmount} {selectedItem && selectedItem.tradeCurrency.toUpperCase()}
                    </span>
                    <span> into </span>
                    <span style={{fontWeight: 'bold'}}>{selectedItem && selectedItem.coin}</span>
                    <span> wallet </span>
                    <span style={{fontWeight: 'bold'}}>
                      {`(${selectedItem && selectedItem.walletAddress})`}
                    </span>

                </>
              }</div>

              <div className='center'>
                {
                  confirm.isLoading || reject.isLoading ? <Spinner size="20px"/> : ''
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
                  onClick={handleReject}
                  disabled={reject.isLoading}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '3px',
                    padding: '6px 8px',
                    background: '#c20',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none'
                  }}>{reject.isLoading ? 'Loading...' : 'Reject'}</button>

                <button
                  onClick={handleConfirm}
                  disabled={confirm.isLoading}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '3px',
                    padding: '6px 8px',
                    background: 'var(--major-color-purest)',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none'
                  }}>{confirm.isLoading ? 'Loading...' : 'Confirm'}</button>
                  
              </div>
            </div>
        </PopUpModal>
      </Wrap>
    )
}


const Wrap = styled.div`
  .center{
    display: flex;
    justify-content: center;
  }
`

const Header = styled.div`
  margin-bottom: 0px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );

  .row{
    padding: 3px;
    font-size: .8rem;
    justify-self: center;
  }

  .search{
    width: 250px;
    height: 30px;
    border: 1px solid var(--major-color-purest);
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon{
    width:30px;
    background: var(--major-color-purest);
    height: 100%;
    display: flex;
    color:#fff;
    justify-content: center;
    align-items: center;
  }
  input{
    width: calc(100% - 30px);
    padding: 0 8px;
    border: none;

    &:focus{
      outline: none;
      // border: 2px solid green;
    }
  }
`

const Table = styled.div`
  padding: 0 10px;
  overflow: auto;
  margin: 0px auto 10px auto;


  ${ScrollBar()}

  table{
    font-size: .8rem;
    margin: auto;
    border-spacing: 0.5rem;
    height: 100%;
    border-collapse: collapse;
    width: 800px;
    text-align: left;
    cursor: default;
  }

  td, th {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    padding: 0.25rem;
  }

  th{
    background: var(--major-color-purest);
    color: #fff;
  }

  tr:nth-child(even) {
    background: #ddd;
  }

  tbody tr:hover {
    background: var(--major-color-30A);
  }

`



const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        No Any Withdrawal Request Made At The Moment
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
