import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getConfig, updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';

import {
  AdminWrapper,
    Form,
    InputWrapper,
    Container,
    Input,
    Label
  } from "../styles";
import TextLoader from "../../../loaders/TextLoader";

export default function WebConfig({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config} = state.config;

  const initialState = {  
    customerSupport: config.data.customerSupport,
    verifyEmail: config.data.verifyEmail,
    allowTransfer: config.data.allowTransfer,
    unverifyUserLifeSpan: config.data.unverifyUserLifeSpan,
    conversionRate: config.data.conversionRate,
    nativeCurrency: config.data.nativeCurrency,
    tradeCurrency: config.data.tradeCurrency,
    totalMembers: config.data.totalMembers,
    totalInvestors: config.data.totalInvestors,
    totalSecPaid: config.data.totalSecPaid,
}


  useEffect(()=>{
    setLoading(true)
    dispatch(getConfig())

    setTimeout(()=>{
      config.isLoading ? setLoading(true) : setLoading(false)
    }, 1000)

  }, [])


  return (
    
    //check if config exist
    isLoading ? 
    (
      // set loading div
      <Loader_ />
    ) :
    (
      //check if empty

      !config.status ? 
      (
          <div style={{textAlign: 'center'}}>{config.msg || 'No data currently available'}</div>
      ):
      (
        <AdminWrapper>
          <SetForm config={config} initialState={initialState}/>
        
        </AdminWrapper>
      )
    )    
  )
}





function SetForm({config, initialState}) {
    const {snap} = useSnap(.5);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch()
    const [inp, setInp] = useState(initialState)
  
  
    const getInput=(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value})
    }

    const submit=(e)=>{
        e.preventDefault();
        dispatch(updateConfig(inp));
        
        setInp(initialState);
    }

    useEffect(()=>{
      setInp(initialState);
    }, [config])

  
    return (
      <Form>
          <Container>

              <div {...snap()} onClick={()=>setEdit(!edit)} className="title">
                  <span  style={{fontSize: '1rem'}}>General Config</span>
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

              <InputWrapper title="Allow users to have access to the customer support system">
                  <Label htmlFor="">Allow Custumer Support?: <span className="item">{config.data.customerSupport}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.customerSupport || ''}
                      name='customerSupport'
                      onChange={getInput}
                  />
              </InputWrapper>
              

              <InputWrapper title="Users wont be sent email for verifcation and during password reset, this will be done directly">
                  <Label htmlFor="">Allow Email Verification?: <span className="item">{config.data.verifyEmail}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.verifyEmail || ''}
                      name='verifyEmail'
                      onChange={getInput}
                  />
              </InputWrapper>


              <InputWrapper title="Number of time in seconds unverifed users are allowed to stay in the database. 0 means they stay forever">
                  <Label htmlFor="">Unverified User&apos;s Lifespan: <span className="item">{config.data.unverifyUserLifeSpan}</span></Label>
                  <Input
                      disabled={!edit}
                      type="number"
                      value={inp.unverifyUserLifeSpan || ''}
                      name='unverifyUserLifeSpan'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Native currency of the app">
                  <Label htmlFor="">Native Currency: <span className="item">{config.data.nativeCurrency}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.nativeCurrency || ''}
                      name='nativeCurrency'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Exchange currency of the app" >
                  <Label htmlFor="">Trade Currency: <span className="item">{config.data.tradeCurrency}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.tradeCurrency || ''}
                      name='tradeCurrency'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Whatever the value is (in the native currency), is equivalent to 1 of the trade currency" >
                  <Label htmlFor="">Conversion Rate: <span className="item">{config.data.conversionRate} -- (1 { config.data.tradeCurrency} = {config.data.conversionRate} {config.data.nativeCurrency})</span></Label>
                  <Input
                      disabled={!edit}
                      type="number"
                      value={inp.conversionRate || ''}
                      name='conversionRate'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Native currency of the app">
                  <Label htmlFor="">Total Members: <span className="item">{config.data.totalMembers}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.totalMembers || ''}
                      name='totalMembers'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Native currency of the app">
                  <Label htmlFor="">Total Investors: <span className="item">{config.data.totalInvestors}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.totalInvestors || ''}
                      name='totalInvestors'
                      onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Native currency of the app">
                  <Label htmlFor="">Total SEC Paid: <span className="item">{config.data.totalSecPaid} {config.data.nativeCurrency}</span></Label>
                  <Input
                      disabled={!edit}
                      type="text"
                      value={inp.totalSecPaid || ''}
                      name='totalSecPaid'
                      onChange={getInput}
                  />
              </InputWrapper>

          </Container>
      </Form>
    )
}

