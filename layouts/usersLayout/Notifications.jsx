import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 
import styled from 'styled-components'
import { useRouter } from 'next/router';
import {useSelector, useDispatch} from 'react-redux';
import { getNotif } from '../../redux/admin/notifications';
import { useEffect, useState} from 'react';


export default function Notifications({notificationId}) {
  const router = useRouter()
  const state = useSelector(state=>state);
  const dispatch = useDispatch();
  const {notif} = state.notifications;
  const [allNotificationId, setAllNotificationId] = useState([])
  
  const handleShowNotif =()=>{
    router.push('/dashboard/notifications')
  }

  useEffect(()=>{
    setAllNotificationId(notif.data || [])
  }, [notif])

  useEffect(()=>{
    dispatch(getNotif())
  }, [])
 

  return (
    <NotificationWrapper notificationId={notificationId}>
        <NotificationsNoneIcon title="Toggle notifications panel" style={{fontSize: '1.5rem'}} onClick={handleShowNotif}/>
         <span className="alert" onClick={handleShowNotif}>{notificationId.length < 1 ?allNotificationId.length : notificationId.length}</span>
    </NotificationWrapper>
  )
}


const NotificationWrapper = styled.div`
    position: relative;
    cursor: pointer;
    z-index: 1000;

    .alert{
        min-width: 18px;
        min-height: 18px;
        display: flex;
        justify-content: center;
        align-items; center;
        border-radius: 50%;
        position: absolute;
        top: -1px;
        font-weight: bold;
        font-size: .6rem;
        right: -4px;
        background: ${({notificationId})=>notificationId.length > 0 ? 'red' : '#888'};
    }
`
