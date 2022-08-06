import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getConfig, updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import { resolveApi } from "../../../utils/resolveApi";
import Cookies from "js-cookie";


import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Input,
  Label
} from "../styles";
import Spinner from "../../../loaders/Spinner";

export default function Referrals({userInfo}) {
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const [isLoading, setLoading] = useState(true)
  const {config, update} = state.config;

  const initialState = {  
    referralBonusPercentage: config.data.referralBonusPercentage,
    referralBonusPercentageForMasterPlan: config.data.referralBonusPercentageForMasterPlan,
    referralBonusMaxCountForMasterPlan: config.data.referralBonusMaxCountForMasterPlan,
}


  useEffect(()=>{
    dispatch(getConfig())

    // setTimeout(()=>{
    //   config.isLoading ? setLoading(true) : setLoading(false)
    // }, 1000)
    config.isLoading ? setLoading(true) : setLoading(false)

  }, [])

  return (
    
    //check if config exist
    isLoading ? <Loader_ />:
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
                  <span style={{fontSize: '1rem'}}>Referrals</span>
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
  
              <InputWrapper title="Percentage returns to referrers after the initial investment by their downliners">
                  <Label htmlFor="">Bonus Percenatge: <span className="item">{config.data.referralBonusPercentage}</span></Label>
                  <Input
                    disabled={!edit}
                    type="number"
                    value={inp.referralBonusPercentage || ''}
                    name='referralBonusPercentage'
                    onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Percentage returns to referrers after the initial investment by their downliners when they invest for master plans">
                  <Label htmlFor="">Master Plans' Bonus Percenatge: <span className="item">{config.data.referralBonusPercentageForMasterPlan}</span></Label>
                  <Input
                    disabled={!edit}
                    type="number"
                    value={inp.referralBonusPercentageForMasterPlan || ''}
                    name='referralBonusPercentageForMasterPlan'
                    onChange={getInput}
                  />
              </InputWrapper>

              <InputWrapper title="Number of times master plans investors will return the referral bonuses to their referrers">
                  <Label htmlFor="">Master plan bonus counts: <span className="item">{config.data.referralBonusMaxCountForMasterPlan}</span></Label>
                  <Input
                    disabled={!edit}
                    type="number"
                    value={inp.referralBonusMaxCountForMasterPlan || ''}
                    name='referralBonusMaxCountForMasterPlan'
                    onChange={getInput}
                  />
              </InputWrapper>

          </Container>
      </Form>
    )
}

