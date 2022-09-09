import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Spinner from "../../../loaders/Spinner";
import {useSnap} from '@mozeyinedu/hooks-lab';
import Link from 'next/link';
import { useRouter } from "next/router";
import { getConfig } from "../../../redux/admin/web_config";
import { adminGetAllinvestmentsTnx, resolveInvestment, handleResetPlan } from "../../../redux/investmentPlans/investmentPlans";
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import conversionRate from "../../../utils/conversionRate";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { resolveApi } from "../../../utils/resolveApi"

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
    const {investmentTxnAdmin} = state.plans;
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(investmentTxnAdmin.data);
    const num = 100
    const [count, setCount] = useState(num);
    const [opening, setOpening] = useState(false);

    useEffect(()=>{
        dispatch(adminGetAllinvestmentsTnx())
        dispatch(getConfig())

        setTimeout(()=>{
          investmentTxnAdmin.isLoading && config.isLoading  ? setLoading(true) : setLoading(false)
        }, 500 )

        // user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

    }, [])

    useEffect(()=>{
      const newData = filter({
        data: investmentTxnAdmin.data,
        keys: [ "lifespan", "returnPercentage", "amount", "rewards"],
        input: inp
      })
  
      setFilter(newData)
  
    }, [inp, investmentTxnAdmin])

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
        <Link href='/admin/investment' passHref>
          <a className={router.asPath === '/admin/investment' ? 'active' : ''}>Config</a>
        </Link>
        <Link href='/admin/investment/transactions' passHref>
          <a className={router.asPath === '/admin/investment/transactions' ? 'active' : ''}>Transactions</a>
        </Link>
        <Link href='/admin/investment/plans' passHref>
          <a className={router.asPath === '/admin/investment/plans' ? 'active' : ''}>Plans</a>
        </Link>
      </Header>

      {
        //check if config exist
        isLoading ? <Loader_ /> :
        
        (
          <AdminWrapper>
            {
              investmentTxnAdmin.data.length < 1 ? <Msg /> : 
              <>
                <Header_Table>
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search by amount, rewards, lifespan and returned percentage"
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
  const {snap} = useSnap(.5)
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {resolve} = state.plans;
  const [pending, setPending] = useState(false);

   // clear any hanging msg from redux
   useEffect(()=>{
    dispatch(handleResetPlan())
  }, [resolve])

  const handleResolve=async(id)=>{
    setPending(true)
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()

        setTimeout(()=>{
          dispatch(resolveInvestment(id))
        }, 100)
        
      }
      else{
        dispatch(resolveInvestment(id))
      }
  }

  const customId = "custom-id-yes"
  useEffect(()=>{
    if(resolve.msg){
      toast(resolve.msg, {
        type: resolve.status ? 'success' : 'error',
        toastId: customId
      })         
    }
  }, [])

  useEffect(()=>{
    if(resolve.status){      
      setPending(false)
    }
  }, [resolve])

    return (   
      <>
        { pending ? <div style={{display: 'flex', justifyContent: 'center'}}><Spinner size="20px"/></div> : ""}
        <Table>
          <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Current Balance {`(${config.data.nativeCurrency})`}</th>
                    <th>Current Balance {`(${config.data.tradeCurrency})`}</th>
                    <th>Date Created</th>
                    <th>Date Mature</th>
                    <th>Plan</th>
                    <th>Amount Invested  {`(${config.data.nativeCurrency})`}</th>
                    <th>Rewards {`(${config.data.nativeCurrency})`}</th>
                    <th>Status</th>
                    <th>Resolve</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, count).map((data, i)=>{
                    return (
                      <tr key={data._id}>
                          <td>{i+1}</td>
                          <td>{data.userId ? data.userId.email : '(User Remove)'}</td>
                          <td>{data.userId ? data.userId.username : '(User Remove)'}</td>
                          <td>{data.currentBalance ? data.currentBalance.toFixed(4) : '---'}</td>
                          <td>{data.currentBalance ? conversionRate.SEC_TO_USD(data.currentBalance, config.data.conversionRate).toFixed(4) : '---'}</td>
                          <td>
                            {data.createdAt && new Date(data.createdAt).toLocaleString()}
                          </td>
                          <td>
                            {
                              !data.isActive ? new Date(data.updatedAt).toLocaleString() : 
                          
                              (function(){
                                let maturein = data && new Date(data.createdAt).getTime() / 1000 + data.lifespan + 7200
                                let formated = new Date(maturein * 1000);

                                return new Date(formated).toLocaleString()
                              }())
                            }
                          </td>
                          <td>{data.type}</td>
                          <td>{data.amount && data.amount.toFixed(4)}</td>
                          <td>{data.rewards && data.rewards.toFixed(4)}</td>
                          <td style={{color: data.isActive ? '#c20' : 'var(--major-color-purest)'}}>{data.isActive ? 'Active' : 'Matured'}</td>

                          <td {...snap()} onDoubleClick={pending ? ()=>{} : ()=>handleResolve(data._id)} style={{cursor: 'pointer', fontWeight: 'bold', color: 'var(--bright-color)'}}>Resolve</td>
                      </tr>
                    )
                  })}
                </tbody>
          </table>
        </Table>
      </>   
      
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