import styled from 'styled-components';
import Image from 'next/image'
import Link from 'next/link';
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import { MdClose, MdMenu} from 'react-icons/md';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import BalanceIcon from '@mui/icons-material/Balance';
import HelpIcon from '@mui/icons-material/Help';
import { ToggleMenu } from '../../styles/globalStyle';
const logo = '/onboadinglogo.png';
import NavAuthBtn from '../../components/navAuthBtn/NavAuthBtn'
import SideMenuModal from '../../components/modals/sideMenuModal/SideMenuModal';



export default function Header_({userInfo}) {
    const [stick, setStick] = useState(false)
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false);

    useEffect(()=>{
        window.onscroll=(e)=>{
            window.pageYOffset >= 120 ? setStick(true) : setStick(false)
        }
    }, []) 

    const navLinks =[
        {
            link: 'Home',
            url: '/',
            icon: <HomeIcon />
        },
        {
            link: 'Contact Us',
            url: '/contact-us',
            icon: <PermContactCalendarIcon />
        },
        {
            link: 'How it Works',
            url: '/user-manual',
            icon: <MenuBookIcon />
        },
        {
            link: 'Terms',
            url: '/tc',
            icon: <LocalPoliceIcon />
        },
        {
            link: 'Privacy Policy',
            url: '/policy',
            icon: <BalanceIcon />
        },
        {
            link: 'How it Works',
            url: '/how-it-works',
            icon: <BalanceIcon />
        }
    ]

  return (
    <Header>
        <Top>
            {/* toggle for side menu */}
            <ToggleMenu onClick={()=>setShowMenu(!showMenu)} className="togglemenu-wrapper">
                {
                    showMenu ? <MdClose className='togglemenu'/> : <MdMenu className='togglemenu'/>
                    
                }
            </ToggleMenu>

            {/* logo */}
            <div className="logo">
                <Link href='/' passHref>
                    <a><Image width='100' height='65' src={logo} alt="logo" /></a>
                </Link>
            </div>

            {/* nav links */}
            <div className="navLink">
            {
                navLinks.map((link, i)=>{
                    return (
                        <Link  key={i} href={link.url} passHref>
                            <a>
                                <div className={link.url === router.asPath ? 'active link' : 'link'}>{link.link}</div>
                            </a>
                        </Link>
                    )
                })
            }
            </div>

            {/* signup, signup, logout and dashboard btns*/}
            <div className='navAuthBtn'>
                <NavAuthBtn setShowMenu={setShowMenu} userInfo={userInfo} />
            </div>
        </Top>

        <Bottom stick={stick}>
            <MoveingInfo />
        </Bottom>

        {/* sibe menu */}
        
        <SideMenuModal navLinks={navLinks} userInfo={userInfo} showMenu={showMenu} setShowMenu={setShowMenu}/>
    </Header>
  )
}

function MoveingInfo(){
    return(
        <marquee behavior="smooth" direction="" style={{fontSize: '.8rem'}}>
            <span style={{color: 'gold'}}>Hello! </span><span>--- Welcome to SmartEarners Investment. --- </span><span style={{color: 'gold'}}>We Trade it, You Learn & Earn it</span>
        </marquee>
    )
}



const Header = styled.div`
    width: 100%;
    height: 90px;
    color: #fff;
    z-index: 1000;
`

const Top = styled.div`
    width: 100%;
    height: calc(100% - 25px);
    background: var(--major-color-purest);
    position: relative;
    padding: 2px 30px;
    user-select: none;
    --webkit-user-select: none;

    .togglemenu-wrapper {
        display: none;
        position: absolute;
        transition: .3s;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);

        &:hover{
            color: #fff;
        };
        
        @media (max-width: 920px){
            display: flex;
        }
    }

    .logo{
        display: flex;
        width: 100px;
        height:100%;
        position: absolute;
        transition: .3s;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        align-items: center;
        justify-content: center;
        
        @media (max-width: 920px){
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    };

    .navAuthBtn{
        height: 100%;
        display: flex;
        position: absolute;
        transition: .3s;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        align-items: center;
        justify-content: center;

        @media (max-width: 920px){
            display: none;
        }
    }

    .navLink {
        display: flex;
        position: absolute;
        transition: .3s;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;

        a {
            padding: 5px;
            display: block;
            font-size: .9rem !important;
            
            &:hover {
                opacity:.6
            }
        };

        @media (max-width: 920px){
            display: none
        };
`

const Bottom = styled.div`
    width: 100%;
    height 25px;
    padding: 0 20px;
    text-align: center;
    z-index: 1000;
    box-shadow: 2px 2px 5px #000;
    position: ${({stick})=>stick ? 'fixed' : 'static'};
    top: ${({stick})=>stick ? '0' : ''};
    left: ${({stick})=>stick ? '0' : ''};
    background: var(--major-color-faded);
`