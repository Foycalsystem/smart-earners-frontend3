import { ResetPasswordRequest } from "../components/public/auth/ResetPasswordRequest"


export default function resetPasswordReq({userInfo}) {
  return <ResetPasswordRequest userInfo={userInfo}/>
}


// handle redirect if user sign in,
export const getServerSideProps =(context)=>{
  const cookies = context.req.cookies;
  const refreshtoken = cookies.refreshtoken;
  const status = cookies.status;

  const handlePath=()=>{
    if(refreshtoken && status === 'admin'){
      return '/admin'
    }
    else if(refreshtoken && status !== 'admin'){
      return '/dashboard'
    }else{
      
    }
  }
  const path = handlePath();

  if(refreshtoken){
    return {
      redirect: {
        destination: path,
        permanent: false
      }
    }
  }else{
    return {
      props: {}
    }
  }
}