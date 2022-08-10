import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import styled from 'styled-components';
import Spinner from "../../../loaders/Spinner";
import { getConfig } from "../../../redux/admin/web_config";
import { getNotif } from "../../../redux/admin/notifications";
import View from "./View.jsx";
import Set from "./Set.jsx";
import MovingText from "./MovingText.jsx";
import Cookies from 'js-cookie'
import { resolveApi } from '../../../utils/resolveApi';
import { resetNotif } from '../../../redux/admin/notifications';

import {
  AdminWrapper,
} from "../../admin/styles";




export default function Transactions({toggleState}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {notif} = state.notifications;
  const {config} = state.config;
  const [isLoading, setLoading] = useState(true)

  const [type, setType] = useState('set') // view, set and movingText
  useEffect(()=>{
    dispatch(getConfig())
    dispatch(getNotif())

    setTimeout(()=>{
        config.isLoadin && notif.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

  }, [])

  const changeType = async(t)=>{
    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }

    dispatch(resetNotif())

    if(t=='set'){
      setType('set')
    }
    else if(t=='view'){
      setType('view')
      dispatch(getNotif())
    }
    else if(t=='movingText'){
      setType('movingText')
      dispatch(getConfig())
    }
  }
  

  return (
    <div>
        {
            isLoading ? <Loader_ /> :

            <AdminWrapper>
            <Head type={type}>
                <div className="col">
                    <button onClick={()=>changeType('set')} className="set">Set</button>
                </div>


                <div className="col">
                    <button onClick={()=>changeType('view')} className="view">View</button>
                </div>

                <div className="col">
                    <button onClick={()=>changeType('movingText')} className="movingText">Moving Text</button>
                </div>
            </Head>
            {
                (
                (function(){
                    if(type==='view'){
                    return <View data={notif} />
                    }
                    else if(type==='set'){
                    return <Set />
                    }
                    else if(type==='movingText'){
                    return <MovingText data={config}/>
                    }
                    else{
                    return ''
                    }
                }())
                )
            }
            </AdminWrapper>
        }
      
    </div>
  )
}



const Head = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  .col{
    width: 100px;
    display: flex;
    align-items: center;
    flex-flow: column;
    font-size: .7rem;
    text-align: center;

    button{
      padding: 7px 5px;
      color: #fff;
      border: none;
      cursor: pointer;

      &:focus{
        outline: none;
      }
    }

    .set{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='set' ? '2px solid green': '1px solid #dfdfdf'}
    };

    .view{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='view' ? '2px solid green': '1px solid #dfdfdf'}
    };

    .movingText{
        background: transparent;
        color: var(--major-color-purest);
        border: ${({type})=>type==='movingText' ? '2px solid green': '1px solid #dfdfdf'}
    };
    
`