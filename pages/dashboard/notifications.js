import React from 'react'
import Notifications from '../../components/user/notifications/Notifications'
import { resolveApi } from '../../utils/resolveApi';

export default function notifications({accesstoken}) {
  return <Notifications accesstoken={accesstoken} />
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
      props: {accesstoken: accesstoken ? accesstoken : null}
    }
  }
}

