import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getConfig, updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import { getUser } from "../../../redux/auth/auth";
import Cookies from "js-cookie";
import Spinner from "../../../loaders/Spinner";
import { resolveApi } from "../../../utils/resolveApi";

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Label
} from "../styles";


export default function Withdrawals({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config, update} = state.config;
  const {user} = state.auth;

  const initialState = {  
    maxTransferLimit: config.data.maxTransferLimit,
    minTransferLimit: config.data.minTransferLimit,
    allowTransfer: config.data.allowTransfer,
    transferCommonDiff: config.data.transferCommonDiff,
}


  useEffect(()=>{
    dispatch(getUser())
    dispatch(getConfig())

    // setTimeout(()=>{
    //   user.isLoading && config.isLoading  ? setLoading(true) : setLoading(false)
    // }, 2000 )

    user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

  }, [])

  return (
    
    //check if config exist
    isLoading ? <Loader_ /> :
    
    (
      <AdminWrapper>
        <SetForm config={config} update={update} initialState={initialState}/>
      </AdminWrapper>
    )    
  )
}





function SetForm({config, update, initialState}) {
    const {snap} = useSnap(.5);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch()
  
    
    const [inp, setInp] = useState(initialState)
  
  
    const getInput=(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value})
    }

    const submit = async(e)=>{
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
                    <span style={{fontSize: '1rem'}}>Transfer</span>
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

                <InputWrapper title="Max Transfer Amount">
                    <Label htmlFor="">Max Transfer Amount: <span className="item">{config.data.maxTransferLimit} {config.data.nativeCurrency}</span></Label>
                    <Input
                      disabled={!edit}
                      type="number"
                      value={inp.maxTransferLimit || ''}
                      name='maxTransferLimit'
                      onChange={getInput}
                    />
                </InputWrapper>
    
                <InputWrapper title="Min Transfer Amount">
                    <Label htmlFor="">Min Transfer Amount: <span className="item">{config.data.minTransferLimit} {config.data.nativeCurrency}</span></Label>
                    <Input
                      disabled={!edit}
                      type="number"
                      value={inp.minTransferLimit || ''}
                      name='minTransferLimit'
                      onChange={getInput}
                    />
                </InputWrapper>
    
                <InputWrapper title="Step factor amount for transfer (Common Diff)">
                    <Label htmlFor="">Transfer Amount Factor: <span className="item">{config.data.transferCommonDiff} {config.data.nativeCurrency}</span></Label>
                    <Input
                      disabled={!edit}
                      type="number"
                      value={inp.transferCommonDiff || ''}
                      name='transferCommonDiff'
                      onChange={getInput}
                    />
                </InputWrapper>
    
                <InputWrapper title="Allow transfer or disable it">
                    <Label htmlFor="">Allow Transfer?: <span className="item">{config.data.allowTransfer}</span></Label>
                    <Input
                      disabled={!edit}
                      type="text"
                      value={inp.allowTransfer || ''}
                      name='allowTransfer'
                      onChange={getInput}
                    />
                </InputWrapper>

            </Container>
        </Form>
      </div>
    )
}

