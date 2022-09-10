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


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation]);


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
    const [changing, setChanging] = useState(false)

  
    useEffect(()=>{
      setTimeout(()=>{
        user.isLoading ? setLoading(true) : setLoading(false)
      }, 1000)
      
    }, [])

    // clear any hanging msg from redux
    useEffect(()=>{
      dispatch(resetAuth())
    }, [invest, txn, user])

    useEffect(()=>{
      dispatch(getPlans())
      dispatch(getTxn())
      dispatch(getUser())

      // user.isLoading ? setLoading(true) : setLoading(false)
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
        setTimeout(()=>{
          dispatch(investPlan(data_));
        }, 100)
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
      if(txn.data.length > 0){
        setActiveTxn(txn.data.filter(data=> data.isActive));
        setMaturedTxn(txn.data.filter(data=> !data.isActive));
      }

    }, [txn])

  return (
      isLoading ? <Loader_ />  :
      (
        <Plan>
        <Profile setChanging={setChanging} shwowActive={shwowActive} setShowActive={setShowActive}/>
        <div style={{padding: '10px 20px 2px 20px', fontWeight: 'bold'}}>Plans</div>
        <div className="center"> { pending ? <Spinner size="24px"/> : '' } </div>
          {
            plans.isLoading ?
              <div className="center"><Spinner size="30px" /></div>:
            (
              plans.data.length < 1 ? <div className="center">---</div> : 
              (
                <div>
                    {
                      plans.isLoading ? <div className="center">
                      <Spinner size="30px" />
                      </div>:
                      (
                        plans.data.length < 1 ? <div className="center">---</div> : 
                        (
                          <SwiperWrapper>
                          {
                            <Swiper
                              breakpoints={{
                                // when window width is >= 640px
                                640: {
                                  width: 500,
                                  slidesPerView: 2,
                                },
                                300: {
                                  width: 250,
                                  slidesPerView: 1,
                                },
                                400: {
                                  width: 300,
                                  slidesPerView: 1,
                                },
                                // when window width is >= 768px
                                768: {
                                  width: 768,
                                  slidesPerView: 2,
                                },
                              }}
                              id="main"
                              width="260"
                              height="200"
                              autoplay
                              spaceBetween={5}
                              slidesPerView={1}
                            >
                              {
                                  plans.data.map((data, i)=>{
                                      return (
                                        <SwiperSlide key={i} tag="li" style={{ listStyle: 'none' }}>
                                            <div style={{width: '100%', height: '100%'}}>
                                              <SinglePlan data={data} invest={invest} investBtn={investBtn}/>
                                            </div>
                                        </SwiperSlide>
                                      )
                                  })
                              }
                            </Swiper>
                            }
                      </SwiperWrapper>
                        )
                      )
                    }
                </div>
              )
            )
          }  


        <MasterPlan data={masterPlanData} showModal={showModal} setShowModal={setShowModal}/>

        <h3 style={{padding: '20px 5px 5px 20px', fontSize: '1rem'}}>INVESTMENT SUMMARY</h3>
        {
          changing ? <div className="center"><Spinner size="20px" /></div> : ''
        }
        
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
                    <p>Amount: <span style={{fontWeight: 'bold'}}>{data.amount} {data.currency}</span></p>
                    <p>Points: <span style={{fontWeight: 'bold'}}>{data.point ? data.point : 'Coming Soon...'}</span></p>
                </aside>
                <aside style={{borderLeft:'1px solid #ccc',paddingLeft: '5px'}} className="returns">
                    <p>Returns</p>
                    <p style={{fontWeight: 'bold'}}>{resolveInvestmentLifespan(data.returnPercentage, data.lifespan)}</p>
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
    setTimeout(()=>{
      dispatch(investPlan(data_))
    }, 100)
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
  width: 280px;
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
    padding: 20px 10px;
    display: flex;
    flex-flow: column nowrap;

    .top{
        width: 100%;
        height: 30px;
        display: flex;
        color: var(--bright-color);
        justify-content: flex-start;
        align-items: flex-start;
        border-bottom: 2px solid whitesmoke;
        p{
          font-size: 1.2rem;
          font-weight: bold;
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
      
      p{
        font-size: .75rem;
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

const SwiperWrapper = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: auto;
  padding: 10px 0;

  #title,#bp-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.swiper-container {
  width: 200px;
  max-height: 230px;
  margin-right: 10px;
}

#bp-640,
#bp-768 {
  display: none;
}

@media screen and (min-width: 640px) {
  .swiper-container {
    width: 900px;
  }

  #bp-480,
  #bp-768 {
    display: none !important;
  }

  #bp-640 {
    display: inline !important;
  }
}

@media screen and (min-width: 768px) {
  .swiper-container {
    width: 768px;
  }

  #bp-480,
  #bp-640 {
    display: none !important;
  }

  #bp-768 {
    display: inline !important;
  }
}

.swiper-pagination {
  bottom: 0;
  padding-bottom: 10px;
}

.swiper-wrapper {
  padding-inline-start: 0;
}

#thumbs.swiper-container {
  margin-bottom: 20px;
}

#thumbs .swiper-slide {
  cursor: pointer;
}

`
