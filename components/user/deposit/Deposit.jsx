import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import Spinner from "../../../loaders/Spinner";
import {useSnap} from '@mozeyinedu/hooks-lab'
import { getConfig } from "../../../redux/admin/web_config";
import conversionRate from "../../../utils/conversionRate";
import { makeDeposit, handleResetDeposit } from "../../../redux/admin/deposit";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { resolveApi } from "../../../utils/resolveApi"


import { 
  Wrapper,
  Form,
  InputWrapper,
  Input,
} from "../styles";



export default function Deposit(){
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {snap} = useSnap()
    const [isLoading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)

    const {user} = state.auth;
    const {config} = state.config;
    const {deposit} = state.deposit;

     // clear any hanging msg from redux
    useEffect(()=>{
      dispatch(handleResetDeposit())
    }, [deposit])


    const initialState = {
      amount: '',
    }

    const [inp, setInp] = useState(initialState)

    const getInp =(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value});
    }

    const submit = async(e)=>{
      e.preventDefault()

      setPending(true)
      if(!Cookies.get('accesstoken')){
        await resolveApi.refreshTokenClinetSide()
      }
      dispatch(makeDeposit(inp))
    }

    useEffect(()=>{      
      dispatch(getUser())
      dispatch(getConfig())
  
      setTimeout(()=>{
        user.isLoading ? setLoading(true) : setLoading(false)
      }, 500)
    }, [])
    

    useEffect(()=>{
      if(deposit.msg){
        setPending(false)
        toast(deposit.msg, {
          type: deposit.status ? 'success' : 'error'
        })         
      }

      if(deposit.status){        
        // redirect to coinbase commerce using the returned url (hostedUrl)
        window.open(deposit.data.hostedUrl)
        setInp(initialState)
      }
    }, [deposit])
   
    return (
    
        isLoading ?  <Loader_ /> :
        (
          <Wrapper>
              <div className="account-balance" style={{color: 'var(--major-color-purest)'}}>Account Balance: {user.data.amount} {config.data.nativeCurrency}</div>
              <Form onSubmit={submit}>
                <h3 className="title">
                  Deposit
                  <span>{inp.amount && ": "}{" "} {inp.amount && conversionRate.USD_TO_SEC(inp.amount, config.data.conversionRate)} {inp.amount && config.data.nativeCurrency}</span>
                </h3>

                <InputWrapper>
                  <Input
                    autoFocus
                    type="number"
                    placeholder="Enter Amount in Dollar"
                    name='amount'
                    value={inp.amount || ''}
                    onChange={getInp}
                  />
                </InputWrapper>

                <div className="center">{pending ? <Spinner size="20px"/> : ""}</div>
                 
                <InputWrapper>
                  <Input
                    {...snap()}
                    disabled={deposit.isLoadingt}
                    type="submit"
                    value={deposit.isLoading ? 'Loading...' : 'Proceed'}
                  />
                </InputWrapper>

                <InputWrapper>
                    <div style={{fontSize: '.7rem', textAlign: 'center', margin: '10px'}}>
                      1 {config.data.tradeCurrency} = {config.data.conversionRate} {config.data.nativeCurrency}
                    </div>
                </InputWrapper>

              </Form>
            </Wrapper>
        )    
    )
}

