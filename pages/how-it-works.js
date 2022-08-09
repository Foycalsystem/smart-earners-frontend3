import UserManual from "../components/public/userManual/UserManual.jsx"
import { resolveApi } from "../utils/resolveApi"

export default function userManual({userInfo}) {
  return <UserManual userInfo={userInfo}/>
}

// handle redirect if user sign up
export async function getServerSideProps(context){
  const cookies = context.req.cookies;
  const refreshtoken = cookies.refreshtoken;

  await resolveApi.refreshToken(context, refreshtoken)
  await resolveApi.resolveInvestment()
  await resolveApi.removeUnverifiedusers()

  return {
    props: {}
  }
}