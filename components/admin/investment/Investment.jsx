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
    //general config 
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

    // withdrawal connfig
    maxWithdrawalLimit: config.data.maxWithdrawalLimit,
    minWithdrawalLimit: config.data.minWithdrawalLimit,
    withdrawalCoins: config.data.withdrawalCoins + ",",
    withdrawalCommonDiff: config.data.withdrawalCommonDiff,
    pendingWithdrawalDuration: config.data.pendingWithdrawalDuration,

    // transfer config
    maxTransferLimit: config.data.maxTransferLimit,
    minTransferLimit: config.data.minTransferLimit,
    allowTransfer: config.data.allowTransfer,
    transferCommonDiff: config.data.transferCommonDiff,

    // investment config
    masterPlanAmountLimit: config.data.masterPlanAmountLimit,
    investmentLimits: config.data.investmentLimits,

    // referral
    referralBonusPercentage: config.data.referralBonusPercentage,
    referralBonusPercentageForMasterPlan: config.data.referralBonusPercentageForMasterPlan,
    referralBonusMaxCountForMasterPlan: config.data.referralBonusMaxCountForMasterPlan,

    // moving text
    movingText: config.data.movingText,
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

                   {/* ============================hidden input for proper update============================ */}
              <>
                {/* moving text */}
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.movingText || ''}
                      name='movingText'
                      onChange={getInput}
                  />

                  {/* investment */}
                  {/* <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.masterPlanAmountLimit || ''}
                      name='masterPlanAmountLimit'
                      onChange={getInput}
                    />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.investmentLimits || ''}
                      name='investmentLimits'
                      onChange={getInput}
                    /> */}

                  {/* referral */}
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralBonusPercentage || ''}
                      name='referralBonusPercentage'
                      onChange={getInput}
                    />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralBonusPercentageForMasterPlan || ''}
                      name='referralBonusPercentageForMasterPlan'
                      onChange={getInput}
                    />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralBonusMaxCountForMasterPlan || ''}
                      name='referralBonusMaxCountForMasterPlan'
                      onChange={getInput}
                  />

                  {/* transfer */}
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.maxTransferLimit || ''}
                      name='maxTransferLimit'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.minTransferLimit || ''}
                      name='minTransferLimit'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.transferCommonDiff || ''}
                      name='transferCommonDiff'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.allowTransfer || ''}
                      name='allowTransfer'
                      onChange={getInput}
                  />

                  {/* withdrawal */}
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.maxWithdrawalLimit || ''}
                      name='maxWithdrawalLimit'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.minWithdrawalLimit || ''}
                      name='minWithdrawalLimit'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.withdrawalCommonDiff || ''}
                      name='withdrawalCommonDiff'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.withdrawalCoins || ''}
                      name='withdrawalCoins'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.pendingWithdrawalDuration || ''}
                      name='pendingWithdrawalDuration'
                      onChange={getInput}
                  />


                  {/* general onfig */}
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.customerSupport || ''}
                        name='customerSupport'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.verifyEmail || ''}
                        name='verifyEmail'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.unverifyUserLifeSpan || ''}
                        name='unverifyUserLifeSpan'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.nativeCurrency || ''}
                        name='nativeCurrency'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.tradeCurrency || ''}
                        name='tradeCurrency'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.conversionRate || ''}
                        name='conversionRate'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.totalMembers || ''}
                        name='totalMembers'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.totalInvestors || ''}
                        name='totalInvestors'
                        onChange={getInput}
                    />
                  <Input
                        disabled={!edit}
                        type="hidden"
                        value={inp.totalSecPaid || ''}
                        name='totalSecPaid'
                        onChange={getInput}
                    />
              </>


            </Container>
        </Form>
      </div>
    )
}
