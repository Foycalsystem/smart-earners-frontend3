import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import Spinner from "../../../loaders/Spinner";
import {useSnap} from '@mozeyinedu/hooks-lab'
import { withdawalRequest, resetWithdrawal} from "../../../redux/admin/withdrawals";
import { getConfig } from "../../../redux/admin/web_config";
import { resolveApi } from "../../../utils/resolveApi"
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { 
  Wrapper,
  Form,
  InputWrapper,
  Input,
  Select,
} from "../styles";




export default function Withdrawals({userInfo}){

    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {snap} = useSnap()
    const [isLoading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [balanceExceed, setBalanceExceed] = useState(false)
    const [belowWithdrawalLimit, setBelowWithdrawalLimit] = useState(false)
    const [aboveWithdrawalLimit, setAboveWithdrawalLimit] = useState(false)
    const [outBoundWithdrawalAmount, setOutBoundWithdrawalAmount] = useState(false);
    const [pending, setPending] = useState(false)

    // clear any hanging msg from redux
    useEffect(()=>{
      dispatch(resetWithdrawal())
    }, [])

    const {user} = state.auth;
    const {config} = state.config;
    const {request} = state.withdrawal;

    const initialState = {
      walletAddress: '',
      amount: '',
      coin: ''
    }

    // clear any hanging msg from redux
    useEffect(()=>{
      dispatch(resetWithdrawal())
    }, [request])


    const [inp, setInp] = useState(initialState)

    const getInp =(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value});
    }

    const submit = async(e)=>{
      e.preventDefault()

      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      dispatch(withdawalRequest(inp))
      setPending(true)
    }

    const customId = "custom-id-yes"
    useEffect(()=>{
        if(request.msg){
            setPending(false)
            setInp({...inp, walletAddress:"", amount: ""})
            toast(request.msg, {
                type: request.status ? 'success' : 'error',
                toastId: customId
            })         
        }
    }, [request])

    useEffect(()=>{
      if(request.status){
        setInp(initialState)
        // setInp({...inp, walletAddress:"", amount: ""})
        setPending(false)
      }

    }, [request])

    useEffect(()=>{
      dispatch(getUser())
      dispatch(getConfig())

      user.isLoading ? setLoading(true) : setLoading(false)
  
      // setTimeout(()=>{
      //   user.isLoading ? setLoading(true) : setLoading(false)
      // }, 2000)
    }, [])

    useEffect(()=>{
      Number(inp.amount) > user.data.amount ? setBalanceExceed(true) : setBalanceExceed(false)
      Number(inp.amount) < config.data.minWithdrawalLimit ? setBelowWithdrawalLimit(true) : setBelowWithdrawalLimit(false)
      Number(inp.amount) > config.data.maxWithdrawalLimit ? setAboveWithdrawalLimit(true) : setAboveWithdrawalLimit(false)
      
      if(config.data.withdrawalFactors){
        config.data.withdrawalFactors.includes(Number(inp.amount)) ? setOutBoundWithdrawalAmount(false) : setOutBoundWithdrawalAmount(true)
      }

    }, [inp])


    useEffect(()=>{
      if(request.data){
        setShowModal(true)

      }
    }, [request])
  
    return (
    
        //check if user exist
    
        isLoading ?  <Loader_ /> :
        (
          <Wrapper>
              <div className="account-balance" style={{color: balanceExceed ? '#c20' : 'var(--major-color-purest)'}}>Account Balance: {user.data.amount} {config.data.nativeCurrency}</div>
              <Form onSubmit={submit}>
                <h3 className="title">Withdrawals</h3>
                
                {pending ? <div className="center"><Spinner size="20px"/></div> : ''}

                <InputWrapper>
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Enter Valid Wallet Address"
                    name='walletAddress'
                    value={inp.walletAddress || ''}
                    onChange={getInp}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Input
                    min={0}
                    type="number"
                    placeholder="Amount"
                    name='amount'
                    value={inp.amount || ''}
                    onChange={getInp}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Select onChange={getInp} name="coin" id="">
                      <option value={inp.coin}>--Select a Coin--</option>
                      {
                        config.data && config.data.withdrawalCoins.map((coin, i)=>{
                          return(
                            <option key={i} value={coin}>{coin}</option>
                          )
                        })
                      }
                  </Select>
                </InputWrapper>

                <div className="center">{request.isLoading ? <Spinner size="20px"/> : ""}</div>
                 
                <InputWrapper>
                  <Input
                    {...snap()}
                    disabled={balanceExceed || request.isLoading|| belowWithdrawalLimit || belowWithdrawalLimit || aboveWithdrawalLimit || outBoundWithdrawalAmount || pending}
                    type="submit"
                    value={pending ? 'Loading...' : 'Proceed'}
                  />
                </InputWrapper>

                <InputWrapper>
                    <div style={{fontSize: '.75rem', margin: '10px'}}>
                      <div style={{color: belowWithdrawalLimit ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Minimum Withdrawal Limit: {config.data.minWithdrawalLimit} {config.data.nativeCurrency}
                      </div>
                      <div style={{color: aboveWithdrawalLimit ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Maximum Withdrawal Limit: {config.data.maxWithdrawalLimit} {config.data.nativeCurrency}
                      </div>
                      <div style={{color: outBoundWithdrawalAmount ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Withdrawal Factor: {config.data.withdrawalCommonDiff} {config.data.nativeCurrency}
                      </div>
                    </div>
                </InputWrapper>

              </Form>
          </Wrapper>
        )    
    )
}


