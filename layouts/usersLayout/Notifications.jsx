import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 
import styled from 'styled-components'
import { useRouter } from 'next/router';
import { getNotif } from '../../redux/admin/notifications';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';

export default function Notifications({notificationId}) {
  const router = useRouter()
  const dispatch = useDispatch();
  
  const handleShowNotif =()=>{
    router.push('/dashboard/notifications')
  }

  useEffect(()=>{
    dispatch(getNotif())
  }, [])
 

  return (
    <NotificationWrapper notificationId={notificationId}>
        <NotificationsNoneIcon title="Toggle notifications panel" style={{fontSize: '1.5rem'}} onClick={handleShowNotif}/>
         <span className="alert" onClick={handleShowNotif}>{notificationId.length}</span>
    </NotificationWrapper>
  )
}


const NotificationWrapper = styled.div`
    position: relative;
    cursor: pointer;
    z-index: 1000;

    .alert{
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items; center;
        border-radius: 50%;
        position: absolute;
        top: -1px;
        font-weight: bold;
        font-size: .7rem;
        right: -4px;
        background: ${({notificationId})=>notificationId.length > 0 ? 'red' : '#888'};
    }
`
