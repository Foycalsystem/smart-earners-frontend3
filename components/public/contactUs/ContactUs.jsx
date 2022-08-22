import styled from 'styled-components'
import { useState, useEffect } from 'react'
import SocialLinks from '../../SocialLinks'
import { getConfig } from '../../../redux/admin/web_config'
import { useDispatch, useSelector } from 'react-redux';
import { resetMsg, handleSendAdmin } from '../../../redux/message/message';
import Spinner from '../../../loaders/Spinner';
import Loader_ from '../../user/loader/Loader'
import { toast } from 'react-toastify';

export default function ContactUs() {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)
  const {config} = state.config
  const {sendAdmin} = state.message
  const [isLoading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [disbale, setDisbale] = useState(false)


  // clear any hanging msg from redux
  useEffect(()=>{
    dispatch(resetMsg())
  }, [sendAdmin])

  useEffect(()=>{
    dispatch(getConfig())

    setTimeout(()=>{
      config.isLoading ? setLoading(true) : setLoading(false)
    }, 1000)

  }, [])

  // handle form
  const initialState = {
    email: '',
    subject: '',
    message: '',
  }
  const [inp, setInp] = useState(initialState)
  const getInp =(e)=>{
    const {name, value} = e.target;
    setInp({...inp, [name]:value});
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setPending(true)
    dispatch(handleSendAdmin(inp))
  }



  const customId = "custom-id-yes"
  useEffect(()=>{
    if(sendAdmin.msg){
      toast(sendAdmin.msg, {
        type: sendAdmin.status ? 'success' : 'error',
        toastId: customId
      })         
    }
  }, [sendAdmin])

  useEffect(()=>{
    if(sendAdmin.status){        
      setInp(initialState)
      setPending(false)
    }
    if(sendAdmin.msg){  
      setPending(false)
    }
  }, [sendAdmin])
   
  return (
    isLoading ? <Loader_ /> :
    <StyledContact>
      <h3>Message us</h3>
      <form onSubmit={sendEmail}>
          
          <InputWrapper>
            <input
              disabled={config.data.customerSupport && config.data.customerSupport.toLowerCase() !== 'yes' || disbale}
              name="email"
              value={inp.email || ""}
              onChange={getInp}
              placeholder="Email"
            />
          </InputWrapper>

          <InputWrapper>
            <input
              disabled={config.data.customerSupport && config.data.customerSupport.toLowerCase() !== 'yes' || disbale}
              name="subject"
              value={inp.subject || ""}
              onChange={getInp}
              placeholder="Subject"
            />
          </InputWrapper>

          <InputWrapper>
            <textarea
              disabled={config.data.customerSupport && config.data.customerSupport.toLowerCase() !== 'yes' || disbale}
              name="message"
              value={inp.message || ""}
              onChange={getInp}
              placeholder="Message Here..."
            ></textarea>     
          </InputWrapper>

          {
            pending ? <div className="center"><Spinner size="20px" /></div> : ''
          }
          <InputWrapper>
            <input
              disabled={config.data.customerSupport && config.data.customerSupport.toLowerCase() !== 'yes' || pending || disbale}
              type="submit"
              value={pending ? "Loading..." : "Send"}
            />
          </InputWrapper>
         
      </form>

      {
        config.data.customerSupport && config.data.customerSupport.toLowerCase() === 'yes' ? 
        (
          <>
            <div style={{display: 'flex', justifyContent: 'center'}}> <SocialLinks text={"Reach us"}/> </div>
            <div style={{textAlign: 'center', marginTop: '30px', fontStyle: 'italic', fontSize: '.8rem'}}>
              <div>333 Fremount St, San Francisco, CA</div>
              <div>94105, United States</div>
            </div>
          </>
        ): ''
      }
    </StyledContact>
  )
}




const StyledContact = styled.section`
  width: 90%;
  height: 70vh;
  max-width: 500px;
  padding: 10px;
  margin: 20px auto;

  h3{
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 20px;
  }

  .center{
    display: flex;
    justify-content: center
  }
`
const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 25px;
    position: relative;
  
  input, textarea{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:focus{
      border: 2px solid green;
      outline: none;
    }
  }

  textarea{
    height: 80px;
    max-height: 250px;
    min-height: 50px;
    resize: vertical;
    padding: 10px;
  }

  input[type="submit"]{
    background: var(--bright-color);
    cursor: pointer;
    padding: 5px;
    color: #fff;
    font-weight: 400;
    font-size: 1.2rem;
  }
`