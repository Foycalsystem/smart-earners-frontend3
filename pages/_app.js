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
import useToggle from '../hooks/toggles/toggles';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
import { resolveApi } from '../utils/resolveApi';

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
  
  resolveApi.refreshTokenClinetSide();
  resolveApi.resolveInvestmentClientSide();
  resolveApi.removeUnverifiedusersClientSide();


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
      

      <Layouts userInfo={userInfo} toggleState={toggleState}>
          <Component {...pageProps} userInfo={userInfo} toggleState={toggleState}/>
      </Layouts>


      {/* {
        loading ? <Preloader /> : 
        (
          <>
            <GlobalStyle toggleState={toggleState}/>
            <ToggleBtn toggleState={toggleState} onClick={toggle}>
              <MdLightMode style={{color: toggleState ? '#fff' : '#000'}} />
            </ToggleBtn>
            
            <Layouts userInfo={userInfo} toggleState={toggleState}>
                <Component {...pageProps} userInfo={userInfo} />
            </Layouts>
          </>
        )
      } */}
    </Provider>
  )
}

export default MyApp

