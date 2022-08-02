import { Provider } from 'react-redux';
import {GlobalStyle, ToggleBtn} from '../styles/globalStyle';
import axios from 'axios';
import {MdLightMode} from 'react-icons/md'
import Layouts from '../layouts/index'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import { store } from '../redux/store';
import {resolveApi} from '../utils/resolveApi'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import Preloader from '../loaders/Preloader';
import useToggle from '../hooks/toggles/toggles';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
    
  resolveApi.generateAccesstoken()
  resolveApi.authorize()
  resolveApi.resolveInvestment()
  resolveApi.removeUnverifiedusers()
  
  const router = useRouter()
  const { toggle, toggleState } = useToggle(); 
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    refreshtoken: '',
    accesstoken: '',
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
      type: Cookies.get('type')
    })
   

  }, [Cookies.get('refreshtoken')])
  
  return (
    <Provider store={store}>
      <Head>
        <title>SmartEarners</title>
      </Head>

      <GlobalStyle toggleState={toggleState}/>
      <ToggleBtn toggleState={toggleState} onClick={toggle}>
        <MdLightMode style={{color: toggleState ? '#fff' : '#000'}} />
      </ToggleBtn>
      

      <Layouts userInfo={userInfo} toggleState={toggleState}>
          <Component {...pageProps} userInfo={userInfo}/>
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

