import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPlans } from '../../../redux/investmentPlans/investmentPlans.js';
import styled from 'styled-components';
import { SectionTitle } from '../../../styles/globalStyle.js';
import { SectionSubTitle } from '../../../styles/globalStyle.js';
import resolveInvestmentLifespan from '../../../utils/resolveInvestmentLifeSpan.js';
import Spinner from '../../../loaders/Spinner';
import {useRouter} from 'next/router'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation]);

import {
  PlanSectionWrapper,
  SwipeWrapper
} from './styles'


const Plans = ({userInfo}) => {
    const dispatch = useDispatch()
    const state = useSelector(state=>state);
    const {plans} = state.plans;
    

  
    useEffect(()=>{
        dispatch(getPlans())
    }, [])

  return (
    <PlanSectionWrapper>
       <SectionTitle>INVESTMENT PLANS</SectionTitle>
       {
        plans.isLoading ? 
        (
            <div style={{display: 'flex', justifyContent: 'center'}}><Spinner size='25px'/></div>
        ):
        (
            plans.data.length < 1 ?
            (
                <h4 style={{textAlign: 'center', fontWeight: '500'}}>Coming Soon...</h4>
            ):
            (
                <>
                    <h4 style={{textAlign: 'center', fontWeight: '500'}}>Find the Package Plan that is most convenient for you</h4>
                    <SwiperWrapper>
                        {
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
                                plans.data.map((data, i)=>{
                                    return (
                                      <SwiperSlide key={i} tag="li" style={{ listStyle: 'none' }}>
                                          <div style={{width: '100%', height: '100%'}}>
                                              <SinglePlan data={data}/>
                                          </div>
                                      </SwiperSlide>
                                    )
                                })
                            }
                          </Swiper>
                          }
                    </SwiperWrapper>
                </>
            )
        )
       }  
    </PlanSectionWrapper>
  )
}

export default Plans

const SinglePlan = ({data}) => {
  const router = useRouter()

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
            <button onClick={()=>router.push('/dashboard')}>Invest Now</button>
        </section>
    </StyledSinglePlan>
  )
}


const StyledSinglePlan = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right,var(--major-color-purest),#6babc9);
  color: #fff;
  user-select: none;

  @media (min-width: 400px){
    width: 300px;
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
    width: 300px;
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
