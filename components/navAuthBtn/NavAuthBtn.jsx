import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import { logout } from '../../redux/auth/auth.js'
import Link from 'next/link';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';
import styled from 'styled-components'
import Spinner from '../../loaders/Spinner.js';


export default function NavAuthBtn({ userInfo, setShowMenu, portriat}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setLoading] = useState(true)
    const path = router.pathname;
    
    const handleLogout =()=>{
        dispatch(logout());
        Cookies.remove('accesstoken')
        Cookies.remove('refreshtoken')
        Cookies.remove('type')
        Cookies.remove('msg')
        Cookies.remove('status')

        setShowMenu(false)

        setTimeout(()=>{
            router.push('/');
        }, 1000)
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 500)
    })

    return (
        <NavBtn portriat={portriat}>
        {
            isLoading ? <Spinner size="25px"/> :
            (
                Cookies.get('refreshtoken') ? 
                (
                    (function(){
                        if(path.includes('dashboard')){
                            // check if user is admin
                            if(userInfo.type ==='admin'){
                                return (
                                    <>
                                        <Link href='/admin' passHref>
                                            <a title="Admin" onClick={()=>setShowMenu(false)} className='admin'>
                                                <AdminPanelSettingsIcon />
                                            </a>
                                        </Link>
                                        <a onClick={handleLogout}>Logout</a>
                                    </>
                                )
                            }else{
                                return (
                                    <a onClick={handleLogout}>Logout</a>
                                )
                            }
                        }
                        else if(path.includes('admin')){
                            return (
                                <>
                                    <Link  href='/dashboard'  passHref>
                                        <a title="Dashboard" onClick={()=>setShowMenu(false)} className='dashboard'>
                                            <AccountCircleIcon />
                                        </a>
                                    </Link>
                                    <a onClick={handleLogout}>Logout</a>
                                </>
                            )
                        }
                        else{
                            // check if user is admin
                            if(userInfo.type ==='admin'){
                                return (
                                    <>
                                        <Link  href='/dashboard'  passHref>
                                            <a title="Dashboard" onClick={()=>setShowMenu(false)} className='dashboard'>
                                                <AccountCircleIcon />
                                            </a>
                                        </Link>
                                        <Link href='/admin' passHref>
                                            <a title="Admin" onClick={()=>setShowMenu(false)} className='admin'>
                                                <AdminPanelSettingsIcon />
                                            </a>
                                        </Link>
                                        <a onClick={handleLogout} className='logout' >Logout</a>
                                    </>
                                )
                            }else{
                                return (
                                    <>
                                        <Link  href='/dashboard'  passHref>
                                            <a title="Dashboard" onClick={()=>setShowMenu(false)} className='dashboard'>
                                                <AccountCircleIcon />
                                            </a>
                                        </Link>
                                        <a onClick={handleLogout}>Logout</a>
                                    </>
                                )
                            }
                        }
                        
                    }())                
                ):
                (
                    <>
                        <Link href='/signup' assHref>
                            <a onClick={()=>setShowMenu(false)} className={router.asPath === '/signup' ? 'signup active' : 'nav-btn signup'}>Sign Up</a>
                        </Link>
                        <Link href='/signin' assHref>
                            <a onClick={()=>setShowMenu(false)} className={router.asPath === '/signin' ? 'signup active' : 'nav-btn signup'}>Sign in</a>
                        </Link>
                        
                    </>
                )
            )
        }
        </NavBtn>
  )
}


const NavBtn = styled.div`
    display: flex; 
    height: 100%;
    justify-content: center;
    flex-direction: ${({portriat})=>portriat ? 'column' : 'row'};
    align-items: ${({portriat})=>portriat ? 'center' : 'center'};

    a {
        font-weight: bold;
        padding: 5px 3px;
        cursor: pointer;
        color: #fff;
        

        &: hover {
            opacity: .5
        }
    };

    .dashboard {
        font-size: 3rem;
    };
    .admin {
        font-size: 3rem;
        color: var(--bright-color)
    };
`
