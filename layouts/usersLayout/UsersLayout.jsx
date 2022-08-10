import { Main, Header, Footer } from '../../styles/globalStyle'
import { useState, useEffect } from "react";
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { CopyRight } from '../../styles/globalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { mobileAndTabletCheck } from '../../utils/mobileAndTabletCheck';
import Head from 'next/head';
import { getConfig } from '../../redux/admin/web_config';


export default function DashboardLayout({children, userInfo}) {
  const state = useSelector(state=>state)
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false);
  const {config} = state.config;
  const {user} = state.auth;
  const [notificationId, setNotificationId] = useState([])

  useEffect(()=>{
      setIsMobile(mobileAndTabletCheck(window))
      dispatch(getConfig())
      setIsMobile(false)

  }, [])

  useEffect(()=>{
    setNotificationId(user.data.notifications || [])
  }, [user])

  const movingInfo = config

  return (
    <>
      <Head>
        <title>{process.env.dashboardTitle}</title>
      </Head>
      <Header headerHeight="90px">
        {
          isMobile ? 
          <MobileHeader
              notificationId={notificationId}
              movingInfo={movingInfo}
              userInfo={userInfo} /> :
          <DesktopHeader
              notificationId={notificationId}
              movingInfo={movingInfo}
              userInfo={userInfo} />
        }
      </Header>

      <Main userInfo={userInfo} height={{headerHeight: '90px', footerHeight: '50px'}}>
          {children}
      </Main>

      <Footer style={{background: 'var(--major-color-purest)', display: 'flex', justifyContent: 'center', alignItems: 'center'}} footerHeight='50px'>
          <CopyRight>
                  &copy; {new Date().getFullYear() > 2022 ? '2021 - ' + new Date().getFullYear() : 2022} Smart Earners
          </CopyRight>
      </Footer> 
    </>
  )
}
