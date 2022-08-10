import { MdClose, MdMenu} from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react';
import { ToggleMenu } from '../../../styles/globalStyle';
import styled from "styled-components";
import { ScrollBar } from '../../../styles/globalStyle';
import {useRouter} from 'next/router'
const logo = '/onboadinglogo.png';
import NavAuthBtn from '../../navAuthBtn/NavAuthBtn';
import { CopyRight } from '../../../styles/globalStyle';
import SocialLinks from '../../SocialLinks';


export default function SideMenuModal({showMenu, setShowMenu, navLinks, userInfo}) {
    
    const closeMenu =(e)=>{
        if(e.target === e.currentTarget){
             setShowMenu(false)
        }

     }
     const closeMenu2 =(e)=>{
         e.stopPropagation()
         setShowMenu(false)
     }
     
     useEffect(() => {
        if(showMenu){
            // get the body and set overflow to hidden
            document.body.style.overflow = 'hidden'
        }else{
            // get the body and set overflow to auto
            document.body.style.overflow = 'auto'
        }
       
     }, [showMenu])
     


  return (
    <SideMenuModal_ className='mobile-menu' show={showMenu} onClick={closeMenu} >
        <SideMenuModalContainer userInfo={userInfo} show={showMenu} >
            <div style={{position: 'absolute', right: '10px', top: '10px'}}>
                <ToggleMenu onClick={closeMenu2} className="mobile-menu togglemenu-wrapper">
                    {showMenu ? <MdClose className='togglemenu'/> : <MdMenu className='togglemenu' />}
                </ToggleMenu>
            </div>
                <SideMenu navLinks={navLinks} setShowMenu={setShowMenu} userInfo={userInfo} showMenu={showMenu} />
        </SideMenuModalContainer>
    </SideMenuModal_>
  )
}


function SideMenu({navLinks, userInfo, showMenu, setShowMenu}) {
    const router = useRouter()
    
    
  return (
    <div className="content">
        <SideMenuRow1>
            <div className="logo">
                <Link  href='/' passHref>
                    <a onClick={()=>setShowMenu(false)}><Image width='100' height='65' src={logo} alt="logo" /></a>
                </Link>
            </div>
        </SideMenuRow1>

        <SideMenuRow2 style={{position: 'relative'}}>
            <div className="navLink">
            {
                navLinks.map((link, i)=>{
                    return (
                        <Link key={i} href={link.url} passHref>
                            <a onClick={()=>setShowMenu(false)}>
                                <div className={link.url === router.asPath ? 'side-menu-active-icon icon' : 'icon'}>
                                    {link.icon}
                                </div>
                                <div className={link.url === router.asPath ? 'side-menu-active-link link' : 'link'}>
                                    {link.link}
                                </div>
                            </a>
                        </Link>
                    )
                })
            }
            </div>
            <div style={{display: 'flex', left: '50%', transform: 'translateX(-50%)', justifyContent: 'center', position: 'absolute', bottom: '50px'}}>
                <SocialLinks />
            </div>
        </SideMenuRow2>

        <SideMenuRow3>
            <div className="nav">
                <NavAuthBtn setShowMenu={setShowMenu} userInfo={userInfo} />
            </div>
            <CopyRight>
                &copy; {new Date().getFullYear() > 2022 ? '2021 - ' + new Date().getFullYear() : 2022} Smart Earners
            </CopyRight>
        </SideMenuRow3>
    </div>
  )
}


const SideMenuModal_ = styled.div`
    background: rgba(0,0,0,.6);
    z-index: 1000000000;
    transition: all .6s;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: ${({show})=>show ? 1 : 0};
    visibility: ${({show})=>show ? 'visible' : 'hidden'};

    @media (min-width: 920px){
      display: none;
      
  }
`

const SideMenuModalContainer = styled.div`
    background: var(--major-color-purest);
    transition: all .5s;
    transform: translateX(${({show})=>show ? 0 : '-150%'});
    position: fixed;
    top: 0;
    bottom: 0;
    width: 220px;
    left: 0;

    .content{
      transition: all .4s;
      opacity: ${({show})=>show ? 1 : 0};
      visibility: ${({show})=>show ? 'visible' : 'hidden'};
      width: 100%;
      height: 100%;
    }
`


const SideMenuRow1 = styled.div`
    height: 90px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .logo{
        width: 100px;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    };
`
const SideMenuRow2 = styled.div`
    height: calc(100% - 90px - 70px);
    overflow-y: auto;
    padding: 10px;
    background: var(--major-color-deep);
    
    ${ScrollBar()}

    .navLink {

        a {
            display: block;
            width: 100%;
            padding: 5px;
            display: flex;
            align-items: flex-end;
            font-size: 1.2rm;
            margin-bottom: 5px;
            color: #fff;

            div {
                padding: 5px 8px;
                display: block;
                font-size: 1rem;
                
                &:hover {
                    opacity:.6
                }
            }

            .icon{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                padding: 18px;
                align-items: center;
            }
        }
    }
`
const SideMenuRow3 = styled.div`
    height: 70px;

    .nav {
        height: 70%;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
    }
    
`