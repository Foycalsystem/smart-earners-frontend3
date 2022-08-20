import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../../loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { useRouter } from "next/router";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { handleAdd, getPlans, handleUpdate, handleDelete, handleResetPlan } from "../../../../redux/investmentPlans/investmentPlans";
import styled from 'styled-components'
import Spinner from '../../../../loaders/Spinner';
import resolveInvestmentLifespan from "../../../../utils/resolveInvestmentLifeSpan";
import { resolveApi } from "../../../../utils/resolveApi";
import Cookies from "js-cookie";
import { getUser } from "../../../../redux/auth/auth";
import { toast } from 'react-toastify';


import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation]);

import {
  AdminWrapper,
  InputWrapper,
  Header,
} from "../../styles";




export default function Plans() {
  const router = useRouter()
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const {plans} = state.plans;
  const {user} = state.auth;
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(true)

  console.log(plans)
  const initialState = {
    type: '',
    amount: '',
    lifespan: '',
    returnPercentage: '',
    point: '',
  }
  const [initial, setInitial] = useState(initialState)

  useEffect(()=>{
    dispatch(handleResetPlan())
    dispatch(getPlans())
    dispatch(getUser())


    setTimeout(()=>{
      user.isLoading && plans.isLoading ? setLoading(true) : setLoading(false)
    }, 1000)

    
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
            <div style={{textAlign: 'center'}}>---</div>
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
  const [pending, setPending] = useState(false)

  useEffect(()=>{
    // to clear any hanging msg from redux
    dispatch(handleResetPlan())
  }, [add])


  const initialState = {
    type: '',
    amount: '',
    lifespan: '',
    returnPercentage: '',
    point: '',
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

    setPending(true)
    const updatingData = {
      id: inp.id, 
      data: {
        type: inp.type,
        amount: inp.amount,
        lifespan: inp.lifespan,
        returnPercentage: inp.returnPercentage,
        point: inp.point,
      }
    }
    if(!Cookies.get('accesstoken')){
      setTimeout(()=>{
        !update ? dispatch(handleAdd(inp)) : dispatch(handleUpdate(updatingData))
      }, 500)
    }else{
      !update ? dispatch(handleAdd(inp)) : dispatch(handleUpdate(updatingData))
    }
  }

  useEffect(()=>{
    if(add.msg){
      setPending(false)
      toast(add.msg, {
        type: add.status ? 'success' : 'error'
      })  
      
      if(add.status){
        setInp(initialState)
        setInitial(initialState)
        setUpdate(false)
      }
      
    }
  }, [add])

  const handleReset = async()=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }
    setInitial(initialState)
    setUpdate(false)
  }

  return (
    <Plan>
      <form onSubmit={submit}>
        <div className="title">{update ? "Update a Plan" : "Add a Plan"}</div>

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

          <InputWrapper>
            <label htmlFor="">Points:</label>
            <input
              type="number"
              name='point'
              placeholder="Point"
              value={inp.point || ''}
              onChange={getInp}
            />
          </InputWrapper>

        <div className="center">{pending? <Spinner size='20px'/> : ""}</div>

        <InputWrapper>
          <input
            disabled={add.isLoading}
            type="submit"
            value={pending ? 'Loading...' : (update ? 'Update Plan' : 'Add Pann')}
          />
        </InputWrapper>
        
        {
          !update ? '':
          <InputWrapper>
            <input
              onClick={handleReset}
              disabled={pending}
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
        <Swiper
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 500,
              slidesPerView: 1,
            },
            300: {
              width: 280,
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
            data.map((data, i)=>{
              return (
                <SwiperSlide key={i} tag="li" style={{ listStyle: 'none' }}>
                  <div style={{width: '100%', height: '100%'}}>
                    <SinglePlan data={data} setUpdate={setUpdate} update={update} setInitial={setInitial} initial={initial}/>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </AllPlan>
    </Plan>
  )
}

const SinglePlan = ({setUpdate, data, setInitial}) => {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  const {deletePlan, add} = state.plans

  useEffect(()=>{
    // to clear any hanging msg from redux
    dispatch(handleResetPlan())
  }, [])


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
      point: data.point,
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

    if(deletePlan.msg){
      toast(deletePlan.msg, {
        type: deletePlan.status ? 'success' : 'error'
      })         
    }
  }

  useEffect(()=>{
    if(deletePlan.msg){
      toast(deletePlan.msg, {
        type: deletePlan.status ? 'success' : 'error'
      })         
    }
  }, [])

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
            <div className="actions">
              <div className="actionBtn" onClick={()=>handleEdit(data)}>
                <EditIcon  style={{color: 'var(--bright-color', fontSize: '1.7rem'}}/>
              </div>
              <div className="actionBtn" onClick={()=>handleDelete_(data._id)}>
                <DeleteForeverIcon style={{color: '#c20', fontSize: '1.7rem'}} />
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

  p{
    font-size: .8rem;
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

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`