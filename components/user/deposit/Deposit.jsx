import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import Spinner from "../../../loaders/Spinner";
import {useSnap} from '@mozeyinedu/hooks-lab'
import Feedback from "../../Feedback";
import { getConfig } from "../../../redux/admin/web_config";
import conversionRate from "../../../utils/conversionRate";
import { makeDeposit } from "../../../redux/admin/deposit";


import { 
  Wrapper,
  Form,
  InputWrapper,
  Input,
} from "../styles";



export default function Deposit({userInfo}){
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {snap} = useSnap()
    const [isLoading, setLoading] = useState(true)

    const {user} = state.auth;
    const {config} = state.config;
    const {deposit} = state.deposit;

    const [feedback, setFeedback] = useState({
      msg: deposit.msg,
      status: false
    });

    const initialState = {
      amount: '',
    }

    const [inp, setInp] = useState(initialState)

    const getInp =(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value});
    }

    const submit =(e)=>{
      e.preventDefault()
      dispatch(makeDeposit(inp))
    }

    useEffect(()=>{
      // if(deposit.status){
      //   setInp(initialState)
      // }

      setFeedback({
        msg: deposit.msg,
        status: true
      });
    }, [deposit])

    useEffect(()=>{
      dispatch(getUser())
      dispatch(getConfig())
  
      setTimeout(()=>{
        user.isLoading ? setLoading(true) : setLoading(false)
      }, 2000)

      setFeedback({
        msg: '',
        status: false
      });

      }, [])

    useEffect(()=>{
      if(deposit.status){
        setInp(initialState)
        // redirect to coinbase commerce using the returned url (hostedUrl)
        window.open(deposit.data.hostedUrl)
      }
    }, [deposit])
   
    return (
    
        isLoading ? 
        (
          // set loading div
          <Loader_ />
        ) :
        (
          //check if empty
          !user.data ?
         
          (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{user.msg || 'No Data Currently Available'}</div>
          ):
          (
            <Wrapper>
              <div className="account-balance" style={{color: 'var(--major-color-purest)'}}>Total Balance: {user.data.amount} {config.data.nativeCurrency}</div>
              <Form onSubmit={submit}>
                <h3 className="title">
                  Deposit
                  <span>{inp.amount && ": "}{" "} {inp.amount && conversionRate.USD_TO_SEC(inp.amount, config.data.conversionRate)} {inp.amount && config.data.nativeCurrency}</span>
                </h3>
                
                <div className="center"> 
                  <Feedback
                    msg={deposit.msg}
                    status={deposit.status}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
                </div>

                <InputWrapper>
                  <Input
                    type="number"
                    placeholder="Enter Amount in Dollar"
                    name='amount'
                    value={inp.amount || ''}
                    onChange={getInp}
                  />
                </InputWrapper>

                <div className="center">{deposit.isLoading ? <Spinner size="20px"/> : ""}</div>
                 
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
    )
}


