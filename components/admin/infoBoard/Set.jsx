import styled from 'styled-components'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  handleAdd } from "../../../redux/admin/notifications";
import Spinner from "../../../loaders/Spinner";
import Cookies from 'js-cookie'
import { resolveApi } from '../../../utils/resolveApi';
import { resetNotif } from '../../../redux/admin/notifications';
import { toast } from 'react-toastify';


export default function Set() {
  const dispatch = useDispatch();
  const state = useSelector(state=>state)
  const {add} = state.notifications;
  const [pending, setPending] = useState(false)
  
  useEffect(()=>{
    // to clear any hanging msg from redux
    dispatch(resetNotif())
  }, [])

  const initialState = {
    title: '',
    body: ''
  } 
  const [inp, setInp] = useState(initialState);

  const getInp=(e)=>{
    const {name, value} = e.target;
    setInp({...inp, [name]: value})
  }

  const submit = async(e) => {
    e.preventDefault();
    dispatch(resetNotif())

    if(!Cookies.get('accesstoken')){
      await resolveApi.refreshTokenClinetSide()
    }

    dispatch(handleAdd(inp))
    setPending(true)

  }
  useEffect(()=>{
    setInp(initialState)
    if(add.msg){
      setPending(false)
      toast(add.msg, {
        type: add.status ? 'success' : 'error'
      })  
    }
  }, [add])
  
  return (
    <StyledContact>
      <h3 style={{textAlign: 'center', padding: '5px'}}>Push Notifications</h3>
       <form onSubmit={submit}>
          <input
            name="title"
            placeholder="Title"
            value={inp.title || ''}
            onChange={getInp}
          />
          <textarea
            name="body"
            placeholder="Message"
            value={inp.body || ''}
            onChange={getInp}
          ></textarea>
          {
            pending ? <div className="center">
              <Spinner size="20px" />
            </div>:''
          }            
          <input
            type="submit"
            value={pending ? 'Loading...' : 'Send'}
            disabled={pending}
          />
        </form>
    </StyledContact>
  )
}




const StyledContact = styled.section`
  width: 90%;
  min-width: 250px;
  height: 70vh;
  max-width: 500px;
  margin: 10px auto;
  
  .center{
    display: flex;
    justify-content: center;
  }
  
  input, textarea{
    width: 100%;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;

    &:focus{
      border: 2px solid green;
      outline: none;
    }
  }

  textarea{
    height: 100px;
    min-height: 100px;
    max-height: 450px;
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
