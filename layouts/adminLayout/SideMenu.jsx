import React from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {useRouter} from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { ScrollBar } from '../../styles/globalStyle';



export default function SideMenu_() {
const router = useRouter()

  const navLinks =[
    {
      link: 'Config',
      url: '/admin',
      icon: <SettingsIcon />
    },
    {
      link: 'Users',
      url: '/admin/users',
      icon: <PersonIcon />
    },
    {
        link: 'Deposit',
        url: '/admin/deposit',
        icon: <SavingsIcon />
    },
    {
        link: 'Investment',
        url: '/admin/investment',
        icon: <SavingsIcon />
    },
    {
        link: 'Withdrawals',
        url: '/admin/withdrawals',
        icon: <CreditScoreIcon />
    },
    {
        link: 'Transfer',
        url: '/admin/transfer',
        icon: <CurrencyExchangeIcon />
    },
    {
        link: 'Referral',
        url: '/admin/referrals',
        icon: <PeopleAltIcon />
    },
    {
      link: 'Info Board',
      url: '/admin/information-board',
      icon: <PeopleAltIcon />
    },
    {
      link: 'Home',
      url: '/',
      icon: <HomeIcon />
    },
]

  return (
    <SideMenu>
      <IconBar>
        {
          navLinks.map((link, i)=>{
            return (
              <Link key={i} href={link.url} passHref>
                  <IconWrapper active={link.url === router.asPath}>

                      <div style={{marginRight: '15px'}} title={link.link} className={link.url === router.asPath ? 'side-menu-active-link' : ''}>
                          {link.link}
                      </div>

                      <div title={link.link} className={link.url === router.asPath ? 'side-menu-active-link' : ''}>
                          {link.icon}
                      </div>

                  </IconWrapper>
              </Link>
            )
          })
        }
      </IconBar>
    </SideMenu>
  )
}



const SideMenu = styled.div`
  width: 100%;
  height: 100%;
`

const IconBar = styled.div`
  min-width: 90%;
  height: 100%;
  display: flex;
  padding: 5px;
  flex-direction column;
`

const IconWrapper = styled.a`
  height: 35px;
  border-radius: 7px;
  margin: 4px 0;
  user-select: none;
  -webkit-user-select: none;
  padding: 3px;
  display: flex;
  border: ${({active})=>active ? '1px solid var(--bright-color)' : '1px solid var(--major-color-30A)'};
  align-items: center;
  justify-content: flex-end;
`

export {
  SideMenu,
  IconBar,
  IconWrapper,

}