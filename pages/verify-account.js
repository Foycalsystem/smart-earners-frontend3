import VerifyAccount from "../components/public/auth/VerifyAccount.jsx"
import { resolveApi } from "../utils/resolveApi.js";

export default function verifyAccount({userInfo}) {
  return <VerifyAccount userInfo={userInfo}/>
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
