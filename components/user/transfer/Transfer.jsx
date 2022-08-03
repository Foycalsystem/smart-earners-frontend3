import { getUser } from "../../../redux/auth/auth";
import { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import Spinner from "../../../loaders/Spinner";
import {useSnap} from '@mozeyinedu/hooks-lab'
import Feedback from "../../Feedback";
import PopUpModal from "../../modals/popUpModal/PopUpModal";
import { checkUser, payUser } from "../../../redux/admin/transfer";
import { getConfig } from "../../../redux/admin/web_config";

import { 
  Wrapper,
  Form,
  InputWrapper,
  Input,
} from "../styles";



export default function Transfer({userInfo}){
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const {snap} = useSnap()
    const [isLoading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [balanceExceed, setBalanceExceed] = useState(false)
    const [belowTransferLimit, setBelowTransferLimit] = useState(false)
    const [aboveTransferLimit, setAboveTransferLimit] = useState(false)
    const [outBoundTransferAmount, setOutBoundTransferAmount] = useState(false)
    const {user} = state.auth;
    const {config} = state.config;
    const {check} = state.transfer;

    const [feedback, setFeedback] = useState({
      msg: check.msg,
      status: false
    });

    const initialState = {
      accountNumber: '',
      amount: ''
    }

    const [inp, setInp] = useState(initialState)

    const getInp =(e)=>{
      const {name, value} = e.target;
      setInp({...inp, [name]:value});
    }

    const submit =(e)=>{
      e.preventDefault()
      dispatch(checkUser(inp))
    }
    

    useEffect(()=>{

      // show feedback
      setFeedback({
        msg: check.msg,
        status: true
      });

      if(check.status){
        setShowModal(true);
        setInp(initialState);

        // hide any feedback before poping up
        setFeedback({
          msg: '',
          status: false
        });
      }
    }, [check])


    useEffect(()=>{
      dispatch(getUser())
      dispatch(getConfig())
  
      setTimeout(()=>{
        user.isLoading ? setLoading(true) : setLoading(false)
      }, 2000)
    }, [])


    useEffect(()=>{
      Number(inp.amount) > user.data.amount ? setBalanceExceed(true) : setBalanceExceed(false)
      Number(inp.amount) < config.data.minTransferLimit ? setBelowTransferLimit(true) : setBelowTransferLimit(false)
      Number(inp.amount) > config.data.maxTransferLimit ? setAboveTransferLimit(true) : setAboveTransferLimit(false)
      
      if(config.data.transferFactors){
        config.data.transferFactors.includes(Number(inp.amount)) ? setOutBoundTransferAmount(false) : setOutBoundTransferAmount(true)
      }

    }, [inp])  

    return (
    
        //check if user exist
    
        isLoading ? 
        (
          // set loading div
          <Loader_ />
        ) :
        (
          <Wrapper>
              <div className="account-balance" style={{color: balanceExceed ? '#c20' : 'var(--major-color-purest)'}}>Total Balance: {user.data.amount} {user.data.nativeCurrency}</div>
              <Form onSubmit={submit}>
                <h3 className="title">Transfer</h3>

                <div className="center"> 
                  <Feedback
                    msg={check.msg}
                    status={check.status}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
                </div>

                <InputWrapper>
                  <Input
                    min={0}
                    autoFocus
                    type="number"
                    placeholder="Account Number"
                    name='accountNumber'
                    value={inp.accountNumber || ''}
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

                <div className="center">{check.isLoading ? <Spinner size='20px'/> : ""}</div>
                 
                <InputWrapper>
                  <Input
                    {...snap()}
                    disabled={balanceExceed || belowTransferLimit || belowTransferLimit || aboveTransferLimit || outBoundTransferAmount || check.isLoading}
                    type="submit"
                    value={check.isLoading ? 'Loading...' : 'Transfer'}
                  />
                </InputWrapper>

                <InputWrapper>
                    <div style={{fontSize: '.75rem', margin: '10px'}}>
                      <div style={{color: belowTransferLimit ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Minimum transfer Limit: {config.data.minTransferLimit} {config.data.nativeCurrency}
                      </div>
                      <div style={{color: aboveTransferLimit ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Maximum transfer Limit: {config.data.maxTransferLimit} {config.data.nativeCurrency}
                      </div>
                      <div style={{color: outBoundTransferAmount ? '#c20' : 'var(--major-color-purest'}} className="center err">
                        Transfer Factor: {config.data.transferCommonDiff} {config.data.nativeCurrency}
                      </div>
                    </div>
                </InputWrapper>

              </Form>
                <PayUser data={check.data} showModal={showModal} config={config} setShowModal={setShowModal}/>
          </Wrapper>
        )    
    )
}


function PayUser({data, showModal, setShowModal, config}){
  const dispatch = useDispatch();
  const state = useSelector(state=>state);
  const {pay} = state.transfer;
  const [feedback, setFeedback] = useState({
    msg: pay.msg,
    status: false
  });

  const closePop =()=>{
    setShowModal(false)
  }

  const proceed =()=>{
    const userData = {
      amount: data.amount,
      accountNumber: data.accountNumber
    }

    dispatch(payUser(userData));
  }

  useEffect(()=>{
    setFeedback({
      msg: '',
      status: false
    });
  }, [])

  useEffect(()=>{
    setFeedback({
      msg: pay.msg,
      status: true
    });
  }, [pay])

  return (
    <PopUpModal title="Transfer" showModal={showModal} setFeedback={setFeedback} setShowModal={setShowModal}>
      <div style={{width: '300px', padding: '20px'}}>
        <div className="center"> 
            <Feedback
              msg={pay.msg}
              status={pay.status}
              feedback={feedback}
              setFeedback={setFeedback}
            />
        </div>

        <div style={{textAlign: 'center', justifyContent: "space-between"}}>
            You are About to Transfer the sum of <span style={{fontWeight: 'bold'}}>{data.amount} {config.data.nativeCurrency}</span> to <span  style={{fontWeight: 'bold'}}>{data.username}</span>
        </div>

        <div style={{marginTop: '20px'}} className="center">{pay.isLoading ? <Spinner size='20px'/> : ""}</div>

        <div style={{
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            display: 'flex',
            justifyContent: "space-around"
        }}>
          <button
            onClick={closePop}
            style={{
              cursor: 'pointer',
              borderRadius: '3px',
              padding: '6px 8px',
              background: '#c20',
              color: '#fff',
              fontWeight: 600,
              border: 'none'
            }}>Cancel</button>

          <button
            onClick={proceed}
            disabled={pay.isLoading}
            style={{
              cursor: 'pointer',
              borderRadius: '3px',
              padding: '6px 8px',
              background: 'var(--major-color-purest)',
              color: '#fff',
              fontWeight: 600,
              border: 'none'
            }}>{pay.isLoading ? 'Loading...' : 'Proceed'}</button>
            
        </div>
      </div>
  </PopUpModal>
  )
}