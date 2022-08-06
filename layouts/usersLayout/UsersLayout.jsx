import { Main, Header, Footer } from '../../styles/globalStyle'
import { useState, useEffect } from "react";
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { CopyRight } from '../../styles/globalStyle';
import { mobileAndTabletCheck } from '../../utils/mobileAndTabletCheck';
import Head from 'next/head';




export default function DashboardLayout({children, userInfo}) {

  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
      setIsMobile(mobileAndTabletCheck(window))

      // setIsMobile(true)

  }, [])

  const notificationData = [
    {
        title: 'Greatings',
        body: 'Hello everyone! Welcome to SmartEarners',
        date: new Date()
    },
    {
        title: 'CONVERSION RATE',
        body: 'Conversion Rate is 500 SE  / 1 USD',
        date: new Date()
    },
    {
        title: 'SMARTEARNERS',
        body: 'SmartEarners is live now. We are here to server you',
        date: new Date()
    },
    {
        title: 'Greatings',
        body: 'Hello everyone',
        date: new Date()
    },
    {
        title: 'Greatings',
        body: 'Hello everyone',
        date: new Date()
    },
    {
        title: 'Greatings',
        body: 'Hello everyone',
        date: new Date()
    },
    {
        title: 'Greatings',
        body: 'Hello everyone',
        date: new Date()
    },
    {
      title: 'Greatings',
      body: 'Hello everyone',
      date: new Date()
    },
    {
        title: 'Greatings',
        body: 'Hello everyone',
        date: new Date()
    },
  ]

  const movingInfo = [
    'Current Exchange Rate: 500 SEC / 1 USD,',
    'Recent Payouts: 02645785 -> USDT,',
    'Total Available Sec: 2000599778 SEC,'
  ]

  return (
    <>
      <Head>
        <title>{process.env.dashboardTitle}</title>
      </Head>
      <Header headerHeight="90px">
        {
          isMobile ?
          <MobileHeader
              movingInfo={movingInfo}
              userInfo={userInfo}
              notificationData={notificationData} /> :
          <DesktopHeader
              movingInfo={movingInfo}
              userInfo={userInfo}
              notificationData={notificationData} />
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
