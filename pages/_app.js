import { Provider } from 'react-redux';
import {GlobalStyle, ToggleBtn} from '../styles/globalStyle';
import axios from 'axios';
import {MdLightMode} from 'react-icons/md'
import Layouts from '../layouts/index'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import { store } from '../redux/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import Preloader from '../loaders/Preloader';
import ScrollToTop from "react-scroll-to-top";
import useToggle from '../hooks/toggles/toggles';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
import { resolveApi } from '../utils/resolveApi';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainer_ from '../components/ToastContainer';


function MyApp({ Component, pageProps }) {
  
  const router = useRouter()
  const { toggle, toggleState } = useToggle(); 
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    refreshtoken: '',
    accesstoken: '',
    status: '',
    type: ''
  });

  
  const handleChangeStart =(url)=> {
      NProgress.start()
  };

  const handleChangeComplete =(url)=>{
      setTimeout(()=> {
          NProgress.done();
      }, 1000)
  }
  
  // call apis that need to be called anytime the browser renders or refreshes
  resolveApi.refreshTokenClinetSide();
  // resolveApi.resolveInvestmentClientSide();
  resolveApi.resolve_In();
  resolveApi.removeUnverifiedusersClientSide();
  // resolveApi.resolveReferralContest();


  useEffect(()=>{
      
      setLoading(true)
      setTimeout(()=> {
        setLoading(false)
    }, 0)
      router.events.on('routeChangeStart', handleChangeStart)
      router.events.on('routeChangeComplete', handleChangeComplete);
      router.events.on('routeChangeError', handleChangeComplete);

      return ()=>{
          router.events.off('routeChangeStart', handleChangeStart)
          router.events.off('routeChangeComplete', handleChangeComplete);
          router.events.off('routeChangeError', handleChangeComplete);
      }
  }, [])


  useEffect(()=>{
    // get user info from the cookies

    setUserInfo({
      refreshtoken: Cookies.get('refreshtoken'),
      accesstoken: Cookies.get('accesstoken'),
      status: Cookies.get('status'),
      type: Cookies.get('type'),
    })
   

  }, [Cookies.get('refreshtoken')])
  
  return (
    <Provider store={store}>
       <ScrollToTop smooth color="var(--major-color-purest)" style={{background: 'rgba(0,0,0,.2)'}}/>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <GlobalStyle toggleState={toggleState}/>
      <ToggleBtn toggleState={toggleState} onClick={toggle}>
        <MdLightMode style={{color: toggleState ? '#fff' : '#000'}} />
      </ToggleBtn>
      {
        process.env.NEXT_PUBLIC_MODE === 'test' ? 
          <div style={{
            position: 'fixed', 
            top: 0, 
            right: '40px', 
            color: '#fff', 
            background: 'red', 
            padding: '2px', 
            fontSize: '.7rem', 
            zIndex: 10000
          }}>
            {`(${process.env.NEXT_PUBLIC_MODE} mode)`}
          </div> : ''
      }
      

      <Layouts userInfo={userInfo} toggleState={toggleState}>
          <ToastContainer_ />
          <Component {...pageProps} userInfo={userInfo} toggleState={toggleState}/>
      </Layouts>
      
    </Provider>
  )
}

export default MyApp

