import { getNotif } from '../../../redux/admin/notifications';
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import moment from 'moment';
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Cookies from "js-cookie";
import { resolveApi } from "../../../utils/resolveApi"
import { getUser, handleRead } from '../../../redux/auth/auth';

export default function Notifications() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {user} = state.auth;
  const {read} = state.auth;
  const {notif} = state.notifications
  const [clicked, setClicked] = useState(false);
  const [notificationId, setNotificationId] = useState([])
  const [generalNotifications, setGeneralNotifications] = useState([])
  const [isActive, setActive] = useState(false)
  const [pending, setPending] = useState(false)


  useEffect(()=>{      
    dispatch(getNotif())
    dispatch(getUser())

    setTimeout(()=>{
      notif.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

  }, [])

  useEffect(()=>{
    setNotificationId(user.data.notifications || [])
  }, [user])

  useEffect(()=>{
    setGeneralNotifications(notif.data)
  }, [notif])
 

  const toggle = async(index, id)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()

      if(notificationId.includes(id)){
        setTimeout(()=>{
          dispatch(handleRead(id))
        }, 500)
        setPending(true)
      }
    }else{
      if(notificationId.includes(id)){
        dispatch(handleRead(id))
        setPending(true)
      }
    }
    
    setPending(false)
    if(clicked === index){
      return setClicked(null);
      
    }
    setClicked(index)
    setActive(true)
  }

  useEffect(()=>{
    if(read.msg){
      setPending(false)
    }
  }, [read])

  return (  
    isLoading ? <Loader_ /> : 
   <Wrapper>
    {pending ?<div className="center"> <Spinner size="20px" /> </div>: ''}
    {
      generalNotifications && generalNotifications.length < 1 ? '' :
      generalNotifications && generalNotifications.map((data, index)=>{
        return (
          <Accordion key={data._id}>
            <Title onClick={()=>toggle(index, data._id)}>
              {data.title && data.title.toUpperCase()}
              {
                notificationId.includes(data._id) ? <div className='newMessage'>New</div> : ''
              }
              
              <div style={{color: 'var(--bright-color', fontSize: '.55rem'}}>{data.createdAt && moment(data.createdAt).calendar()}</div>

              <div style={{position: 'absolute', top: '0', right: '10px'}}>
                {isActive && clicked === index ? <ArrowDropUpIcon />:<ArrowDropDownIcon/> }
              </div>
            
            </Title>
            <Content clicked={clicked} index={index} isActive={isActive}>{data.body}</Content>
          </Accordion>
        )
      })
    }
   </Wrapper>
  )
}


const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 10px;

  .center{
    display: flex;
    justify-content: center;
  }
`

const Accordion = styled.div`
  width: 100%;
  margin: 10px auto 15px auto;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Title = styled.div`
  width: 100%;
  padding: 10px 30px 10px 30px;
  cursor: pointer;
  font-size: .75rem;
  user-select: none;
  -webkit-user-select: none;
  font-weight: bold;
  position: relative;

  .newMessage{
    position: absolute;
    top: 5px;
    right: 40px;
    background: #ff401a;
    padding: 2px;
    color: #fff;
    font-size: .6rem;
    border-radius: 8px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Content = styled.div`
font-size: .9rem;
line-height: 1.5rem;
height: ${({isActive,  clicked, index})=>isActive && clicked === index ? "auto" : '0'};
padding: ${({isActive, clicked, index})=>isActive && clicked === index ? "0 30px 30px 30px" : '0'};
verflow: hidden;
opacity: ${({isActive,  clicked, index})=>isActive && clicked === index ? "1" : '0'};
transition: .3s;
display:  ${({isActive, clicked, index})=>isActive && clicked === index ? "block" : 'none'};

`