import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getConfig, updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Link from 'next/link';
import Spinner from "../../../loaders/Spinner";
import { resolveApi } from "../../../utils/resolveApi";
import Cookies from "js-cookie";

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Header,
  Label
} from "../styles";
import { useRouter } from "next/router";

export default function Investment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config, update} = state.config;
  const {user} = state.auth;

  const initialState = {  
    masterPlanAmountLimit: config.data.masterPlanAmountLimit,
    investmentLimits: config.data.investmentLimits,
}


  useEffect(()=>{
    setLoading(true)
    dispatch(getConfig())

    // setTimeout(()=>{
    //   config.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)

    user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

  }, [])

  return (
    <>
      <Header>
        <Link href='/admin/investment' passHref>
          <a className={router.asPath === '/admin/investment' ? 'active' : ''}>Config</a>
        </Link>
        <Link href='/admin/investment/transactions' passHref>
          <a className={router.asPath === '/admin/investment/transactions' ? 'active' : ''}>Transactions</a>
        </Link>
        <Link href='/admin/investment/plans' passHref>
          <a className={router.asPath === '/admin/investment/plans' ? 'active' : ''}>Plans</a>
        </Link>
      </Header>

    {
      isLoading ? <Loader_ /> :
      
      (
        <AdminWrapper>
          <SetForm config={config} update={update} initialState={initialState}/>
        </AdminWrapper>
      )
      
    }
    </>
       
  )
}





function SetForm({config, update, initialState}) {
    const {snap} = useSnap(.5);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
  
    
    const [inp, setInp] = useState(initialState)
  
  
    const getInput=(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value})
    }

    const submit= async(e)=>{
        e.preventDefault();
        if(!Cookies.get('accesstoken')){
          await resolveApi.refreshTokenClinetSide()
        }
        dispatch(updateConfig(inp));
        setInp(initialState);
        setEdit(false)
    }

    useEffect(()=>{
      setInp(initialState);
    }, [config])
  
    return (
      <div>
        <Form style={{position: 'relative'}}>
            {
              !update.isLoading ? "" : 
              (
                <div style={{
                  position: 'absolute', 
                  top: 0,
                  bottom:0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent:'center',
                  alignItems: 'center',
                  zIndex: 2
                  }}>
                    <Spinner size="20px"/>
    
                </div>
              )
            }

            <Container>

                <div {...snap()} onClick={()=>setEdit(!edit)} className="title">
                    <span  style={{fontSize: '1rem'}}>Investment</span>
                    <span className="edit">
                        <EditIcon />
                    </span>
                </div>

                {
                    edit ?
                    (
                        <button onClick={submit} className="btn">Submit</button>
                    ): ''
                }

                  <InputWrapper title="Mininmum amount for Master Plan">
                      <Label htmlFor="">Master Plan Mininum Amount: <span className="item">{config.data.masterPlanAmountLimit} {config.data.nativeCurrency}</span></Label>
                      <Input
                        disabled={!edit}
                        type="number"
                        value={inp.masterPlanAmountLimit || ''}
                        name='masterPlanAmountLimit'
                        onChange={getInput}
                      />
                  </InputWrapper>

                  <InputWrapper title="Max active investment per user">
                      <Label htmlFor="">Max Active Investment: <span className="item">{config.data.investmentLimits}</span></Label>
                      <Input
                        disabled={!edit}
                        type="number"
                        value={inp.investmentLimits || ''}
                        name='investmentLimits'
                        onChange={getInput}
                      />
                  </InputWrapper>

            </Container>
        </Form>
      </div>
    )
}
