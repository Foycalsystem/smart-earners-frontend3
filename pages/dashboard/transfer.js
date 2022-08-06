import React from 'react'
import Transfer from '../../components/user/transfer/Transfer'
import { resolveApi } from '../../utils/resolveApi';

export default function transfer({accesstoken}) {
  return <Transfer accesstoken={accesstoken}/>
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
