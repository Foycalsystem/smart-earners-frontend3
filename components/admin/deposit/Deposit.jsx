import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { AdminWrapper } from "../styles";
import Loader_ from "../loader/Loader";
import { getUser } from "../../../redux/auth/auth";
import { getConfig } from "../../../redux/admin/web_config";


export default function Deposit({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {user} = state.auth;
  const {config} = state.config;
  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getConfig())

    // setTimeout(()=>{
    //   user.isLoading && config.isLoading  ? setLoading(true) : setLoading(false)
    // }, 2000 )

    user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

  }, [])


  return (
    
    <>
      <div></div>
      {
        //check if deposit exist
        isLoading ?  <Loader_ /> :
        (
          <AdminWrapper>
            Deposit Config Coming soon...
          </AdminWrapper>
        )
      }
    </>
    
  )    
}
