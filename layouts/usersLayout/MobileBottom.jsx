import styled from 'styled-components';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Link from 'next/link'
import SavingsIcon from '@mui/icons-material/Savings';
import { useRouter } from 'next/router';

export default function MobileBottom() {
    const router = useRouter()
    
    const bottomNavLinks =[
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
        }
    ]

  return (
    <BottomNav>
        {
            bottomNavLinks.map((link, i)=>{
                return (
                    <div key={i}>
                        <Link href={link.url} passHref>
                            <a className="linkWrapper">
                                <div className={link.url === router.asPath ? 'active-icon link-icon' : 'link-icon'}>
                                    {link.icon}
                                </div>
                                <div className={link.url === router.asPath ? 'active-link link' : 'link bottom-link'}>
                                    {link.link}
                                </div>
                            </a>
                        </Link>
                    </div>
                )
            })
        }
    </BottomNav>
  )
}




const BottomNav = styled.div`
    width: 100%;
    box-shadow: -2px -2px 5px #ccc;
    height: 50px;
    background: #f5f5f5;
    display: flex;
    padding: 0 5px;
    bottom: 0;
    color: var(--major-color-purest);
    left: 0;
    right: 0;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    --webkit-user-select: none;

    .linkWrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin: 0 2px;
    }

    .link-icon {
        border-radius : 50%;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .link{
        margin-top: 0px;
        font-size: .6rem;
    }

    .bottom-link {
        color: var(--major-color-purest);
    }
`