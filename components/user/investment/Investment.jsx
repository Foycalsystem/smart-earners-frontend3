import { useState, useEffect } from "react";
import { getUser, investPlan, getTxn, resetAuth } from "../../../redux/auth/auth";
import {useSelector, useDispatch} from 'react-redux';
import { getPlans } from '../../../redux/investmentPlans/investmentPlans.js';
import {useSnap} from '@mozeyinedu/hooks-lab'
import Spinner from '../../../loaders/Spinner';
import resolveInvestmentLifespan from "../../../utils/resolveInvestmentLifeSpan";
import styled from 'styled-components';
import Active from "./Active";
import Profile from "./Profile";
import Mature from "./Mature";
import Loader_ from "../loader/Loader";
import PopUpModal from "../../modals/popUpModal/PopUpModal";
import Cookies from 'js-cookie'
import { resolveApi } from "../../../utils/resolveApi"
import { toast } from 'react-toastify';



import {Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar, 
  A11y,
  Autoplay,
} from "swiper/core";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Plans = ({userInfo}) => {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const [shwowActive, setShowActive] = useState(true)
    const {plans} = state.plans;
    const {user, txn, invest} = state.auth;
    const [showModal, setShowModal] = useState(false)
    const [masterPlanData, setMasterPlanData] = useState('')
    const [activeTxn, setActiveTxn] = useState([])
    const [maturedTxn, setMaturedTxn] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)

  
    // useEffect(()=>{
    //   setTimeout(()=>{
    //     user.isLoading ? setLoading(true) : setLoading(false)
    //   }, 1000)
      
    // }, [])

    // clear any hanging msg from redux
    useEffect(()=>{
      dispatch(resetAuth())
    }, [invest, txn, user])

    useEffect(()=>{
      dispatch(getPlans())
      dispatch(getTxn())
      dispatch(getUser())

      user.isLoading ? setLoading(true) : setLoading(false)
    }, [])

    const investBtn = async(data)=>{
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      
      if(data.type.toLowerCase() === 'master'){
        setMasterPlanData(data)
        setShowModal(true)
      }
      else{
        setPending(true)
        const data_ = {
          id: data._id,
          amount: data.amount,
        }
        dispatch(investPlan(data_));
      }
    }
    const customId = "custom-id-yes"
    useEffect(()=>{
      if(invest.msg){
        setPending(false)
        toast(invest.msg, {
          type: invest.status ? 'success' : 'error',
          toastId: customId
        })         
      }
    }, [invest])

    
    useEffect(()=>{
      setActiveTxn(txn.data.filter(data=> data.isActive));
      setMaturedTxn(txn.data.filter(data=> !data.isActive));
    }, [txn])

  return (
      isLoading ? <Loader_ />  :
      (
        <Plan>
        <Profile shwowActive={shwowActive} setShowActive={setShowActive}/>
        <div style={{padding: '10px 20px 2px 20px', fontWeight: 'bold'}}>Plans</div>
        <div className="center"> { pending ? <Spinner size="24px"/> : '' } </div>
        <AllPlan>
          {
            plans.isLoading ?
              <div className="center"><Spinner size="30px" /></div>:
            (
              plans.data.length < 1 ? <div className="center">---</div> : 
              (
                <div>
                <SwipeWrapper_>
                    {
                      plans.isLoading ? <div className="center">
                      <Spinner size="30px" />
                      </div>:
                      (
                        plans.data.length < 1 ? <div className="center">---</div> : 
                        (
                    <Swiper
                      className='swiper'
                      modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                      spaceBetween={10}
                      autoplay = { {delay: 5000}}
                      scrollbar={{draggable: true}}
                      // loop
                      pagination = {{ clickable: true}}
                      slidesPerView={3}
                      breakpoints={
                          {
                              0:{
                                  width: 0,
                                  slidesPerView: 1,
                                  spaceBetween: 10
                              },
                              500:{
                                  width: 700,
                                  slidesPerView: 2,
                                  spaceBetween: 10
                              },
                              680:{
                                  width: 680,
                                  slidesPerView: 2,
                                  spaceBetween: 10
                              },
                              920:{
                                  width: 920,
                                  slidesPerView: 3,
                                  spaceBetween: 10
                              },
                          }
                        }>
                        {plans.data.map((each, idx) => 
                            (
                              <SwiperSlide className="swipe" key={idx}>
                                  <SinglePlan data={each} invest={invest} investBtn={investBtn}/>
                              </SwiperSlide>
                            )
                        ) }
                    </Swiper>
                        )
                      )
                    }
                </SwipeWrapper_>   
        

                </div>
              )
            )
          }  
        </AllPlan>

        <MasterPlan data={masterPlanData} showModal={showModal} setShowModal={setShowModal}/>

        <h3 style={{padding: '20px 5px 5px 20px', fontSize: '1rem'}}>INVESTMENT SUMMARY</h3>

        {
          shwowActive ? <Active data={activeTxn} txn={txn}/> : <Mature data={maturedTxn} txn={txn}/>
        }
        
        </Plan>
      )
    )
  }

export default Plans


const SinglePlan = ({data, investBtn}) => {
  const {snap} = useSnap(.5)

  return (
    <StyledSinglePlan>
        <section className="content">
            <span className="top">
                  <p>{ data.type && data.type.toUpperCase() }</p>
            </span>

            <span className="bottom">
                <aside className="amount">
                    <p>Amount</p>
                    <p style={{fontSize: '.8rem', fontWeight: 'bold'}}>{data.amount} {data.currency}</p>
                </aside>
                <aside style={{borderLeft:'1px solid #ccc',paddingLeft: '5px'}} className="returns">
                    <p>Returns</p>
                    <p style={{fontSize: '.8rem', fontWeight: 'bold'}}>{resolveInvestmentLifespan(data.returnPercentage, data.lifespan)}</p>
                </aside>
            </span>
            <button onClick={()=>investBtn(data)} {...snap()}>
              Invest
            </button>
        </section>
    </StyledSinglePlan>
  )
}


function MasterPlan({data, showModal, setShowModal}){
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const {invest} = state.auth
  const [pending, setPending] = useState(false)

  useEffect(()=>{
    dispatch(resetAuth())
  }, [])

  const initialState = {
    amount: 200000
  }
  const [inp, setInp] = useState(initialState)
  const getInp =(e)=>{
    const {name, value} = e.target;
    setInp({...inp, [name]:value})
  }

  const closePop =async()=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }

    dispatch(resetAuth())

    setInp(initialState)
    setShowModal(false)
  }

  const proceed = async()=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    setPending(true)
    const data_ = {
      id: data._id,
      amount: inp.amount,
    }
    dispatch(investPlan(data_))
  }

  const customId = "custom-id-yes"
   
  useEffect(()=>{
    if(invest.msg){
      toast(invest.msg, {
        type: invest.status ? 'success' : 'error',
        toastId: customId
      })  
           
    }
  }, [])

  useEffect(()=>{
    setPending(false)
    setInp('')
  }, [invest])



  return (
    <PopUpModal title={`${data.type && data.type.toUpperCase()} PLAN`} showModal={showModal} setShowModal={setShowModal}>
      <div style={{width: '300px', padding: '20px'}}>

        <div style={{fontSize: '.9rem'}}>Enter Amount to proceed</div>

        <Input
          autoFocus
          type="number"
          placeholder="Amount"
          value={inp.amount || ''}
          name="amount"
          onChange={getInp}
        />

        <div style={{textAlign: 'center', fontSize: '.8rem', color: inp.amount < data.amount ? '#c20' : 'var(--major-color-purest'}}>Mininum Amount: {data.amount} {data.currency}</div>

        <div style={{marginTop: '20px'}} className="center">{pending ? <Spinner size='20px'/> : ""}</div>
        <div style={{
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            display: 'flex',
            justifyContent: "space-around"
        }}>
          <button
            onClick={closePop}
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
            onClick={proceed}
            disabled={invest.isLoading || inp.amount < data.amount}
            style={{
              cursor: 'pointer',
              borderRadius: '3px',
              padding: '6px 8px',
              background: 'var(--major-color-purest)',
              color: '#fff',
              fontWeight: 600,
              border: 'none'
            }}>{invest.isLoading ? 'Loading...' : 'Proceed'}</button>
            
        </div>
      </div>
  </PopUpModal>
  )
}


const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  
  &:focus{
    outline: none;
    border: 1px solid green;
  }
`

const StyledSinglePlan = styled.div`
  width: 330px;
  height: 190px;
  background-image: linear-gradient(to right,var(--major-color-purest),#6babc9);
  color: #fff;
  user-select: none;

  @media (min-width: 400px){
    width: 300px;
  }

  .feedback{

  }
  button{
    width: 100px;
    margin: 25px auto 0 auto;
    padding: 8px;
    border-radius: 5px;
    border: none;
    background: var(--bright-color);
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
  }

  @media (min-width: 700px){
    width: 270px;
  }

  .content{
    width: 100%;
    padding: 20px 5px ;
    display: flex;
    flex-flow: column nowrap;

    .top{
        width: 100%;
        height: 30px;
        display: flex;
        color: #fff;
        justify-content: flex-start;
        align-items: flex-start;
        border-bottom: 2px solid whitesmoke;
        p{
          font-size: 1.2rem;
          font-weight: 600;
        }
    }

    .bottom{
      display: flex;
      justify-content: center;
      font-size: .8rem;

      aside{
        width: 50%;
        margin-top: 10px;
      }
      .amount p:nth-child(2){
        font-weight: 600;
        font-size: 1rem;
      }

      .returns p:nth-child(2){
        font-weight: 600;
        font-size: 1rem;
      }
    }

    .actions{
      display: flex;
      justify-content: space-around;
      align-items: center;

      .actionBtn{
        cursor: pointer;
        &:hover{
          opacity: .5;
        }
      }
    }
  }

`

const Plan = styled.div`
  form{
    width: 90%;
    max-width: 400px;
    margin: 10px auto;

  }

  .center{
    dislay: flex;
    width: 60%;
    max-width: 400px;
    margin: auto;
    justify-content: center;
  }

  .slide{
    border: 1px solid gold;
    width: 300px
  }
  .title{
    font-weight: bold;
    text-align: center;
  }
  label{
    display: block;
    padding-bottom: 2px;
    font-weight: 500;
  }

  input{
    width: 100%;
    display block;
    padding: 8px;
    border: 1px solid #aaa;
    border-radius: 5px;

    &:focus{
      outline: none;
      border: 2px solid green;
    }

    &[type="submit"]{
      color: #fff;
      background: var(--major-color-purest);
      cursor: pointer;
    }
  }

  .center {
    display: flex;
    justify-content: center;
  }
`

const AllPlan = styled.div`
  width: 98%;
  max-width: 1200px;
  margin: auto;
  padding: 10px 0;
`
const SwipeWrapper_ = styled.div`
  width: 100%;
  margin: auto;

  .swipe{
    @media(max-width: 400px){
      width: 300px;
    }
  }
`