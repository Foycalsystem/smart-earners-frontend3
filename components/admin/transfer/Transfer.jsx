import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { getConfig, updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import { useRouter } from "next/router";
import { getUser } from "../../../redux/auth/auth";
import Link from 'next/link';
import Cookies from "js-cookie";
import Spinner from "../../../loaders/Spinner";
import { resolveApi } from "../../../utils/resolveApi";

import {
  AdminWrapper,
  Form,
  InputWrapper,
  Container,
  Header,
  Input,
  Label
} from "../styles";


export default function Withdrawals({userInfo}) {
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
     referralContestStarts: config.data.referralContestStarts,
     referralContestStops: config.data.referralContestStops,
     allowReferralContest: config.data.allowReferralContest,
     startContestReg: config.data.startContestReg,
     referralContestPrize: config.data.referralContestPrize + ",",
 
     // moving text
     movingText: config.data.movingText,
}


  useEffect(()=>{
    dispatch(getUser())
    dispatch(getConfig())

    setTimeout(()=>{
      user.isLoading && config.isLoading  ? setLoading(true) : setLoading(false)
    }, 500 )

    // user.isLoading && config.isLoading ? setLoading(true) : setLoading(false)

  }, [])

  return (
    <>
     <Header>
          <Link href='/admin/transfer' passHref>
            <a className={router.asPath === '/admin/transfer' ? 'active' : ''}>Config</a>
          </Link>
          <Link href='/admin/transfer/transactions' passHref>
            <a className={router.asPath === '/admin/transfer/transactions' ? 'active' : ''}>Transactions</a>
          </Link>
      </Header>
      {
        //check if config exist
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
                  <Input
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
                    />

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
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralContestStarts || ''}
                      name='referralContestStarts'
                      onChange={getInput}
                    />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralContestStops || ''}
                      name='referralContestStops'
                      onChange={getInput}
                    />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.allowReferralContest || ''}
                      name='allowReferralContest'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.referralContestPrize || ''}
                      name='referralContestPrize'
                      onChange={getInput}
                  />
                  <Input
                      disabled={!edit}
                      type="hidden"
                      value={inp.startContestReg || ''}
                      name='startContestReg'
                      onChange={getInput}
                  />

                  {/* transfer */}
                  {/* <Input
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
                  /> */}

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

