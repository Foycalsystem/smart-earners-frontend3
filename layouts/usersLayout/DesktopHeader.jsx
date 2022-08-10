import styled from 'styled-components';
import Image from 'next/image'
import Link from 'next/link';
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import { MdClose, MdMenu} from 'react-icons/md';
import { ToggleMenu } from '../../styles/globalStyle';
const logo = '/onboadinglogo.png';
import NavAuthBtn from '../../components/navAuthBtn/NavAuthBtn'
import SideMenuModal from '../../components/modals/sideMenuModal/SideMenuModal';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import Notifications from './Notifications';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MovingInfo from './MovingInfo';


export default function DesktopHeader({userInfo, notificationId, movingInfo}) {
    const [stick, setStick] = useState(false)
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=>{
        window.onscroll=(e)=>{
            window.pageYOffset >= 100 ? setStick(true) : setStick(false)
        }
    }, []) 

    const navLinks =[
        {
            link: 'Dashboard',
            url: '/dashboard',
            icon: <DashboardRoundedIcon style={{fontSize: '.8rem'}}/>
        },
        {
            link: 'Deposit',
            url: '/dashboard/deposit',
            icon: <SavingsIcon />
        },
        {
            link: 'Withdrawals',
            url: '/dashboard/withdrawals',
            icon: <CreditScoreIcon />
        },
        {
            link: 'Transfer',
            url: '/dashboard/transfer',
            icon: <CurrencyExchangeIcon />
        },
        {
            link: 'Transactions',
            url: '/dashboard/transactions',
            icon: <PaidIcon />
        },
        {
            link: 'Referral',
            url: '/dashboard/referrals',
            icon: <PeopleAltIcon />
        },
        {
            link: 'Home',
            url: '/',
            icon: <HomeIcon />
        },
    ]

    const profileNavLink = [
        {
            link: 'Profile',
            url: '/dashboard/profile',
            icon: <PersonIcon style={{fontSize: '1rem'}}/>
        },
    ]


  return (
    <Header stick={stick}>
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

            <div className="extralNavLink">

                 {/* profile & dashboard nav link btns */}
                {
                profileNavLink.map((link, i)=>{
                    return (
                        <Link key={i} href={link.url} passHref>
                            <a style={{borderRadius: '50%', padding: '2px'}} className={link.url === router.asPath ? 'active-icon link-icon' : 'link-icon'}>{link.icon}</a>
                        </Link>
                    )
                })
                }

                {/* notifaction btn */}
                <Notifications notificationId={notificationId}/>

            </div>

            {/* signup, signup, logout and dashboard btns*/}
            <div className="navAuthBtn">
                <NavAuthBtn setShowMenu={setShowMenu} userInfo={userInfo} />
            </div>
           
            
        </Top>

        <Bottom stick={stick}>
            <MovingInfo movingInfo={movingInfo}/>
        </Bottom>

        {/* sibe menu */}
        
        <SideMenuModal navLinks={navLinks} userInfo={userInfo} showMenu={showMenu} setShowMenu={setShowMenu}/>

        
    </Header>
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
    }

    .extralNavLink{
        display: flex;
        position: absolute;
        transition: .3s;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;

        @media (min-width: 920px){
            right: 150px;
        };
    }

    .navAuthBtn{
        right: 20px;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        height: 100%;
        display: inline-block;
        
        @media (max-width: 920px){
           display: none;
        };
    }
`

const Bottom = styled.div`
    width: 100%;
    height 25px;
    z-index: 1000;
    padding: 0 20px;
    text-align: center;
    box-shadow: 2px 2px 5px #000;
    background: var(--major-color-faded);
    position: ${({stick})=>stick ? 'fixed' : 'static'};
    top: ${({stick})=>stick ? '0' : ''};
    left: ${({stick})=>stick ? '0' : ''};
`