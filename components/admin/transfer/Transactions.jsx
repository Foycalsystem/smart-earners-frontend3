import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Spinner from "../../../loaders/Spinner";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getConfig } from "../../../redux/admin/web_config";
import { getAllTxn } from "../../../redux/admin/transfer";
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Header_Table,
  Header,
  Table,
  Title,
  Label
} from "../styles";

export default function Transactions() {
    const {snap} = useSnap(.5)
    const dispatch = useDispatch()
    const router = useRouter()
    const state = useSelector(state=>state);
    const [isLoading, setLoading] = useState(true)
    const {config} = state.config;
    const {transferTxn} = state.transfer;
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(transferTxn.data);
    const num = 100
    const [count, setCount] = useState(num);
    const [opening, setOpening] = useState(false);

    useEffect(()=>{
        dispatch(getAllTxn())
        dispatch(getConfig())

        setTimeout(()=>{
          transferTxn.isLoading && config.isLoading  ? setLoading(true) : setLoading(false)
        }, 500 )

        // user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

    }, [])

    useEffect(()=>{
      const newData = filter({
        data: transferTxn.data,
        keys: [ "username", "email", "amount", "accountNumber"],
        input: inp
      })
  
      setFilter(newData)
  
    }, [inp, transferTxn])

    const handleViewMore =()=>{
      setOpening(true)
  
      setTimeout(()=>{
        setOpening(false)
        setCount(prevState=>prevState + num)
      }, 1000)
    }

 
  return (
    <div>
      <Header>
        <Link href='/admin/transfer' passHref>
        <a className={router.asPath === '/admin/transfer' ? 'active' : ''}>Config</a>
        </Link>
        <Link href='/admin/transfer/transactions' passHref>
        <a className={router.asPath === '/admin/transfer/transactions' ? 'active' : ''}>Transactions</a>
        </Link>
      </Header>


      {
        //check if config exist
        isLoading ? <Loader_ /> :
        
        (
          <AdminWrapper>
            {
              transferTxn.data.length < 1 ? <Msg /> : 
              <>
                <Header_Table>
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search by username, email, amount"
                      value={inp || ''}
                      onChange={(e)=>setInp(e.target.value)}
                    />
                    <div className="icon"><SearchIcon /></div>
                  </div>
                </Header_Table>
                <Hx data={filteredData} config={config} count={count} />
              </>
            }
            
            
            {
              count >= filteredData.length ? '' :
              <ViewMore>
                {
                  opening ? <div> <Spinner size="20px"/></div> : ''
                }
                <div onClick={handleViewMore} className="more" {...snap()}>View More...</div>
              </ViewMore>
            }
          </AdminWrapper>
        )
      }
    </div>
  )
}


function Hx({data, config, count}){

  console.log(data)
    return (      
      <Table>
        <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Balance {`(${config.data.nativeCurrency})`}</th>
                  <th>Balance {`(${config.data.tradeCurrency})`}</th>
                  <th>Investor</th>
                  <th>AC/No</th>
                  <th>Verified</th>
                  <th>Blocked</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, count).map((user, i)=>{
                  return (
                    <tr key={user._id}>
                      
                    </tr>
                  )
                })}
              </tbody>
        </table>
      </Table>
    )
}



const Msg = ()=>{

  return (
    <MsgWrapper className="none">
      No Users At The Moment
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


const ViewMore = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

 .more{
   user-select: none;
   -webkit-user-select: none;
   font-size: .7rem;
   cursor: pointer;
   border: 1px solid;
   border-radius: 5px;
   padding: 7px;

   &:hover{
     opacity: .4
   }
 }
`