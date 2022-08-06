import Index from "../components/public/home/Index";
import { resolveApi } from "../utils/resolveApi"


export default function Home({userInfo}) {
  return <Index userInfo={userInfo}/>
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