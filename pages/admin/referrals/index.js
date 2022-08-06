import React from 'react'
import Referrals from '../../../components/admin/referrals/Referrals';
import { resolveApi } from "../../../utils/resolveApi";

export default function index({accesstoken}) {
  return <Referrals accesstoken={accesstoken}/>
}



// handle redirect if user sign in
export async function getServerSideProps(context){
  const cookies = context.req.cookies;
  const refreshtoken = cookies.refreshtoken;
  const accesstoken = cookies.accesstoken;
  const type = cookies.type;

  await resolveApi.refreshToken(context, refreshtoken)
  await resolveApi.resolveInvestment()
  await resolveApi.removeUnverifiedusers()

  if(!refreshtoken){
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
      props: {accesstoken: accesstoken ? accesstoken : null}
    }
  }
  else if(refreshtoken && type !=='admin'){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
      props: {accesstoken: accesstoken ? accesstoken : null}
    }
  }
  else{
    return {
      props: {accesstoken: accesstoken ? accesstoken : null}
    }
  }
}