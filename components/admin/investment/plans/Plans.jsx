import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../../loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Link from 'next/link';
import { useRouter } from "next/router";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { handleAdd, getPlans, handleUpdate, handleDelete } from "../../../../redux/investmentPlans/investmentPlans";
import styled from 'styled-components'
import Spinner from '../../../../loaders/Spinner';
import Feedback from "../../../Feedback";
import resolveInvestmentLifespan from "../../../../utils/resolveInvestmentLifeSpan";
import { resolveApi } from "../../../../utils/resolveApi";
import Cookies from "js-cookie";
import { getUser } from "../../../../redux/auth/auth";



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

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Header,
  Title,
  Label
} from "../../styles";




export default function Plans() {
  const router = useRouter()
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const {plans} = state.plans;
  const {user} = state.auth;
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true)

  const initialState = {
    type: '',
    amount: '',
    lifespan: '',
    returnPercentage: '',
  }
  const [initial, setInitial] = useState(initialState)

  useEffect(()=>{
    dispatch(getPlans())
    dispatch(getUser())

    // setTimeout(()=>{
    //   plans.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)

    user.isLoading && plans.isLoading ? setLoading(true) : setLoading(false)
  }, [])

  


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

      <AdminWrapper>
        <SetPlan update={update} setUpdate={setUpdate} setInitial={setInitial} initial={initial}/>
      </AdminWrapper>

      <h3 style={{textAlign: 'center'}}>Investment Plans</h3>

      {
        plans.isLoading ? <Loader_ /> : 
        (
          plans.data.length < 1 ?
          (
            <div style={{textAlign: 'center'}}>{'No data currently available'}</div>
          ):
          (
            <AdminWrapper>
              <GetPlans setUpdate={setUpdate} update={update} setInitial={setInitial} initial={initial} data={plans.data}/>
            </AdminWrapper>
          )
        )
      }
    </div>
  )
}

function SetPlan({update, initial, setUpdate, setInitial}){
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {add} = state.plans;

  //feedback
  const [feedback, setFeedback] = useState({
    msg: add.msg,
    status: false
  });

  useEffect(()=>{

    // show feedback
    setFeedback({
      msg: add.msg,
      status: true
    });
  }, [add])

  const initialState = {
    type: '',
    amount: '',
    lifespan: '',
    returnPercentage: '',
  }

  const [inp, setInp] = useState(initialState)
  const getInp=(e)=>{
    const {name, value} = e.target;
    setInp({...inp, [name]:value})
  }

  useEffect(()=>{
    setInp(initial)
  }, [update])

  const submit= async(e)=>{
    e.preventDefault()
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }

    const updatingData = {
      id: inp.id, 
      data: {
        type: inp.type,
        amount: inp.amount,
        lifespan: inp.lifespan,
        returnPercentage: inp.returnPercentage,
      }
    }
    !update ? dispatch(handleAdd(inp)) : dispatch(handleUpdate(updatingData))

  }

  const handleReset = async()=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    setInitial(initialState)
    setUpdate(false)
  }

  //clear form input
  useEffect(()=>{

    if(add.status){
      setInitial(initialState)
      setUpdate(false)
    }

  }, [add])


  return (
    <Plan>
      <form onSubmit={submit}>
        <div className="title">{update ? "Update a Plan" : "Add a Plan"}</div>

        <div className="center"> 
          <Feedback
            msg={add.msg}
            status={add.status}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </div>

        <InputWrapper>
          <label htmlFor="">Type:</label>
          <input
            autoFocus
            type="text"
            name='type'
            placeholder="Type"
            value={inp.type || ''}
            onChange={getInp}
          />
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="">Amount:</label>
          <input
            type="number"
            min={0}
            name='amount'
            placeholder="amount"
            value={inp.amount || ''}
            onChange={getInp}
          />
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="">Return Percentage:</label>
          <input
            type="number"
            min={0}
            name='returnPercentage'
            placeholder="Return Percentage"
            value={inp.returnPercentage || ''}
            onChange={getInp}
          />
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="">Lifespan:</label>
          <input
            type="number"
            min={0}
            name='lifespan'
            placeholder="lifespan"
            value={inp.lifespan || ''}
            onChange={getInp}
          />
        </InputWrapper>

        <div className="center">{add.isLoading ? <Spinner size='20px'/> : ""}</div>

        <InputWrapper>
          <input
            disabled={add.isLoading}
            type="submit"
            value={add.isLoading ? 'Loading...' : (update ? 'Update Plan' : 'Add Pann')}
          />
        </InputWrapper>
        {
          !update ? '':
          <InputWrapper>
            <input
              onClick={handleReset}
              disabled={add.isLoading}
              type="reset"
              value='Cancel'
            />
          </InputWrapper>
        }
      </form>
    </Plan>
  )
}

function GetPlans({setUpdate, update, data, setInitial, initial}){

  return (
    <Plan>
      <AllPlan>
        <SwipeWrapper_>
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
                {data.map((each, idx) => 
                    (
                      <SwiperSlide key={idx} className='swipe'>
                          <SinglePlan data={each} setUpdate={setUpdate} update={update} setInitial={setInitial} initial={initial}/>
                      </SwiperSlide>
                    )
                ) }
            </Swiper>
          </SwipeWrapper_>   
      </AllPlan>
    </Plan>
  )
}

const SinglePlan = ({setUpdate, data, setInitial}) => {
  const dispatch = useDispatch()


  const handleEdit = async(data)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }

    setUpdate(true);
    setInitial({
      id: data._id,
      type: data.type,
      amount: data.amount,
      lifespan: data.lifespan,
      returnPercentage: data.returnPercentage,
    })
    window.scroll({
      top:0,
      left:0,
      behavior: 'smooth'
    })
  }

  const handleDelete_ = async(id)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    dispatch(handleDelete(id))
  }

  return (
    <StyledSinglePlan>
        <section className="content">
            <span className="top">
                  <p>{ data.type && data.type.toUpperCase() }</p>
            </span>

            <span className="bottom">
                <aside className="amount">
                    <p>Amount</p>
                    <p style={{fontSize: '.9rem', fontWeight: 'bold'}}>{data.amount} {data.currency}</p>
                </aside>
                <aside style={{borderLeft:'1px solid #ccc',paddingLeft: '5px'}} className="returns">
                    <p>Returns</p>
                    <p style={{fontSize: '.9rem', fontWeight: 'bold'}}>{resolveInvestmentLifespan(data.returnPercentage, data.lifespan)}</p>
                </aside>
            </span>
            <div className="actions">
              <div className="actionBtn" onClick={()=>handleEdit(data)}>
                <EditIcon  style={{color: 'var(--bright-color', fontSize: '2rem'}}/>
              </div>
              <div className="actionBtn" onClick={()=>handleDelete_(data._id)}>
                <DeleteForeverIcon style={{color: '#c20', fontSize: '2rem'}} />
              </div>
            </div>
        </section>
    </StyledSinglePlan>
  )
}



const StyledSinglePlan = styled.div`
  width: 330px;
  height: 190px;
  background-image: linear-gradient(to right,var(--major-color-purest),#6babc9);
  color: #fff;
  user-select: none;

  @media (min-width: 400px){
    width: 300px;
  }

  .content{
    width: 100%;
    padding: 20px;
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
      justify-content: space-between;
      margin: 10px 0;
      
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

const Plan = styled.div`
  margin-bottom: 30px;
  form{
    width: 90%;
    max-width: 400px;
    margin: 10px auto;

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