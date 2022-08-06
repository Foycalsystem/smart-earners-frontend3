import { Signin } from "../components/public/auth/Signin.jsx"

export default function signin({userInfo}) {  

  return <Signin userInfo={userInfo}/>
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