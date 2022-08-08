import React from 'react'
import Contest from '../../../components/user/referrals/Contest'
import { resolveApi } from '../../../utils/resolveApi';

export default function contset({accesstoken}) {
  return <Contest accesstoken={accesstoken}/>
}



// handle redirect if user sign up
export async function getServerSideProps(context){
  const cookies = context.req.cookies;
  const refreshtoken = cookies.refreshtoken;
  const accesstoken = cookies.accesstoken;

  await resolveApi.refreshToken(context, refreshtoken)
  await resolveApi.resolveInvestment()
  await resolveApi.removeUnverifiedusers()

  if(!refreshtoken){
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
      props: {}
    }
  }else{
    return {
        redirect: {
            destination: '/dashboard/referrals',
            permanent: false,
          },
      props: {accesstoken: accesstoken ? accesstoken : null}
    }
  }
}
