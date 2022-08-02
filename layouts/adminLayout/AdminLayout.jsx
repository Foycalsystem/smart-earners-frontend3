import React, {useRef, useState, useEffect} from 'react'
import Header_ from './Header';
import styled from 'styled-components';
import SideMenu_ from './SideMenu';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Head from 'next/head';



export default function AdminLayout({children, userInfo, toggleState}) {
    const [showMenuLargeScreen, setShowMenuLargeScreen] = useState(false)
    const [showMenuSmallScreen, setShowMenuSmallScreen] = useState(false)

    return (
      <>
        <Head>
          <title>{process.env.adminTitle}</title>
        </Head>
        <Header>
          <Header_
            userInfo={userInfo}
            setShowMenuLargeScreen={setShowMenuLargeScreen}
            showMenuLargeScreen={showMenuLargeScreen}
            setShowMenuSmallScreen={setShowMenuSmallScreen}
            showMenuSmallScreen={showMenuSmallScreen}
          />
        </Header>

        <Main>
          <SideBarWrapper toggleState={toggleState} showMenuSmallScreen={showMenuSmallScreen} showMenuLargeScreen={showMenuLargeScreen}>

              <div className="toggle-btn">
                  <div onClick={()=>setShowMenuLargeScreen(!showMenuLargeScreen)} className="toggle toggle-large-screen">
                      {
                          showMenuLargeScreen ? <NavigateNextIcon /> : < NavigateBeforeIcon/>
                      }
                  </div>

                  <div onClick={()=>setShowMenuSmallScreen(!showMenuSmallScreen)} className="toggle toggle-small-screen">
                      {
                          showMenuSmallScreen ? <NavigateBeforeIcon /> : <NavigateNextIcon />
                      }
                  </div>

              </div>
              <SideMenu_ />
          </SideBarWrapper>

          <MainWrapper toggleState={toggleState}>
              {children}
          </MainWrapper>
        </Main>   
      </>
    )
}


const Header = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  right: 0;
  height: 60px;
  background: var(--major-color-purest)
`
const Main = styled.div`
  width: 100%;
  min-height: calc(100% - 55px);

  @media (max-width: 920px){
   
  }
`
const SideBarWrapper = styled.div`
  width: 170px;
  position: fixed;
  transform: translateX(0%);
  z-index: 1000;
  transition: .4s;
  background: ${({toggleState})=>toggleState ? 'var(--light-theme)' : 'var(--dark-theme)'};
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 2px 2px 3px #999;


  .icon{
    font-size: 2.5rem;
  }

  .toggle-btn{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative
  }

  .toggle{
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    color: #fff;
    background: var(--major-color-purest);

}

.toggle-large-screen{
    display: flex;

    @media (max-width: 980px){
        display: none;
    }
}

.toggle-small-screen{
    display: flex;

    @media (min-width: 980px){
        display: none;
    }
}

  transform: ${({showMenuLargeScreen})=>showMenuLargeScreen ? 'translateX(0%)' : 'translateX(-80%)'};


  @media (max-width: 980px){
    transform: ${({showMenuSmallScreen})=>showMenuSmallScreen ? 'translateX(0%)' : 'translateX(-120%)'};
  }
`

const MainWrapper = styled.div`
  background: ${({toggleState})=>toggleState ? 'var(--light-theme)' : 'var(--dark-theme)'};
  height: 100%;
  transition: .3d;
  padding-top: 60px;
  margin-left: 35px;
  @media (max-width: 980px){
    margin-left: 0
  }

`