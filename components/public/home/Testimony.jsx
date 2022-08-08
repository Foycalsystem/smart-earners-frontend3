import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import {useEffect,} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Spinner from '../../../loaders/Spinner';
import { getSelectedTestimonials, handleRemove, handleDelete, handleResetTestim } from '../../../redux/testimonials/testimonials';
import { SectionTitle } from '../../../styles/globalStyle'
import {Swiper, SwiperSlide } from 'swiper/react'
import Avatar from 'react-avatar';
import styled from 'styled-components';
import moment from 'moment';
import { HeroSectionSubTitle } from './styles';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { resolveApi } from '../../../utils/resolveApi';

import {
    Navigation,
    Pagination,
    Scrollbar, 
    A11y,
    Autoplay
} from "swiper/core";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectFade } from 'swiper';


export default function Testimony({userInfo}) {

    const dispatch = useDispatch()
    const state = useSelector(state=>state)
    const {selectedTestimonials} = state.testimonial


     // clear any hanging msg from redux
     useEffect(()=>{
        dispatch(handleResetTestim())
    }, [])

    useEffect(()=>{
        dispatch(getSelectedTestimonials())
    }, [])


  return (
    <div>
        <SectionTitle style={{margin: '-10px'}}>Testimonials</SectionTitle>
        { 
            selectedTestimonials && selectedTestimonials.isLoading ? 
            (
                // set loading div
                <div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
                    <Spinner size='20px'/>
                </div>
            ):
            (
                // display data, first check if empty
                selectedTestimonials.data.length < 1 ?
                (
                    <div style={{textAlign: 'center'}}>---</div>
                )
                :
                (
                    <Swiper
                        style={{minHeight: '200px', padding: '20px 0'}}
                        className='swipper'
                        modules={[Navigation, EffectFade, Autoplay, Pagination, Scrollbar, A11y]}
                        loop
                        scrollbar={{draggable: true}}
                        autoplay = { {delay: 4000}}
                        pagination = {{ clickable: true}}
                        effect="creative">
                        
                        {selectedTestimonials.data.map(data => {
                            return (
                                <SwiperSlide key={data._id}>
                                    <Card_1 data={data} userInfo={userInfo}/>
                                </SwiperSlide>
                            )
                        })}
            
                    </Swiper>
                )
            )
        }
    </div>
  )
}


function Card_1({data, userInfo}){
    const {snap} = useSnap(.5)
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {del, remove} = state.testimonial

     // clear any hanging msg from redux
     useEffect(()=>{
        dispatch(handleResetTestim())
      }, [])

    const deleteT =async(id)=>{
        if(!Cookies.get('accesstoken')){
            await resolveApi.refreshTokenClinetSide()
        }
        dispatch(handleDelete(id))
    }

    const removeT =async(id)=>{
        if(!Cookies.get('accesstoken')){
            await resolveApi.refreshTokenClinetSide()
        }
        dispatch(handleRemove(id))
    }

    useEffect(()=>{
        if(remove.msg){
            toast(remove.msg, {
                type: remove.status ? 'success' : 'error'
            })         
        }
    }, [])

    useEffect(()=>{
        if(del.msg){
            toast(del.msg, {
                type: del.status ? 'success' : 'error'
            })         
        }
    }, [del, remove])

    return (
        <>        
            <Avatar style={{userSelect: 'none', marginBottom: '2px'}} src='/me.jpg' size="100" round={true}/>
            <div style={{textAlign: 'center', fontSize: '.8rem'}}>{data.body}</div>
            <HeroSectionSubTitle style={{fontSize: '1rem', margin: '2px'}}>{data.name}</HeroSectionSubTitle>
            <div style={{color: '#F1AD00', fontSize: '.8rem'}}>{moment(data.date).calendar()}</div>       
            {
                userInfo.type === 'admin' ? 
                (
                <Action className="actions" style={{position: 'absolute', display: 'hidden', top: '0px'}}>
                    <DeleteForeverIcon {...snap()} onClick={()=>deleteT(data._id)} className='del'/>
                    <DoDisturbOnIcon {...snap()} onClick={()=>removeT(data._id)} className='remove'/>
                </Action>

                ): ''
            }
        </>
    )
}


const Action = styled.div`
    display: hidden;

    &:hover{
        display: block;
    }

    .del, .remove{
        cursor: pointer;

        &:hover{
            opacity: .5
        }
    }

    .del{
        color: #c20;
    }

    .remove{
        color: var(--bright-color)
    }
`