import React from 'react'
import Transactions from '../../components/user/transactions/Transactions'
import { resolveApi } from '../../utils/resolveApi';

export default function transactions({accesstoken, toggleState}) {
  return <Transactions accesstoken={accesstoken} toggleState={toggleState}/>
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
