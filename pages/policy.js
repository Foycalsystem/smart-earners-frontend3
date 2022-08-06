import Policy from "../components/public/policy/Policy"
import { resolveApi } from "../utils/resolveApi"

export default function policy({userInfo}) {
  return <Policy userInfo={userInfo}/>
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