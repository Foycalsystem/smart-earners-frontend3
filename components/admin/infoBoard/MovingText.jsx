import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import Loader_ from "../loader/Loader";
import { updateConfig} from "../../../redux/admin/web_config";
import EditIcon from '@mui/icons-material/Edit';
import {useSnap} from '@mozeyinedu/hooks-lab';
import Spinner from "../../../loaders/Spinner";


export default function MovingText({data}) {
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const state = useSelector(state=>state);
  const {config} = state.config;

  const initialState = {  
    movingText: data.data.movingText,
 }
 
  const {snap} = useSnap(.5);
  const [edit, setEdit] = useState(false);
  const [inp, setInp] = useState(initialState)

  useEffect(()=>{
    setTimeout(()=>{
      data.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

  }, [data])

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
  }, [data])

  return (
    
    //check if config exist
    isLoading ? <div style={{display: 'flex', justifyContent:'center'}}> <Spinner size="20px" /> </div> : 
      !data.status ? 
      (
          <div style={{textAlign: 'center'}}>{data.msg || 'No data currently available'}</div>
      ):
      <Form>

        <Container>

          <div {...snap()} onClick={()=>setEdit(!edit)} className="title">
              <span  style={{fontSize: '1rem'}}>Moving Info</span>
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

          <InputWrapper title={data.data.movingText}>
              <Label htmlFor="">Moving Text: <div className="item">{data.data.movingText}</div></Label>
              <Input
                  disabled={!edit}
                  type="text"
                  value={inp.movingText || ''}
                  name='movingText'
                  onChange={getInput}
              />
          </InputWrapper>

        </Container>
    </Form>
    )    
}








import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    padding: 10px;
`

const InputWrapper = styled.div`
    min-width: 100px;
    height: auto;
    position: relative;
    margin: 10px 5px;

    .center{
      display: flex;
      justify-content: center;
    }

    .item {
        color: #972309;
    }
`

const Input = styled.input`
    display: block;
    width: 100%;
    border: none;
    padding: 10px;
    box-shadow: 1px 3px 3px 0px #ccc;
    font-weight: 600;

    &:focus {
        outline: none;
        border: 1px solid #ccc;
        box-shadow: 1px 3px 3px 0px #ccc;
    }
`

const Label = styled.label`
    width: 100%;
    padding: 5px;
    display: block;
    font-size: .7rem;
    font-weight: 600;
    user-select: none;
    -webkit-user-select: none;
`
    
const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    margin-bottom: 20px;
    display: grid;
    border: 1px solid #f1f1f1;
    border-bottom: 2px solid #aaa;
    grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
    position: relative;

    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: -12px;
        background: #f1f1f1;
        padding: 2px 4px;
        border-radius: 5px;
        cursor: pointer;
        left: 5px;
        user-select: none;
        -webkit-user-select: none;

        &:hover{
            opacity: .8;
        }

        .edit{
            padding: 3px 15px;
            width: 20px;
            display: block;
            display: flex;
            margin-left: 5px;
            justify-content: center;
            background: var(--major-color-purest);
            color: #fff;
            align-items: center;
            height: 100%;
        }
    }

    .btn{
        position: absolute;
        top: -12px;
        right: 5px;
        display: inline-block;
        width: 100px;
        background: #f1f1f1;
        background: var(--bright-color);
        border: none;
        color: #fff;
        padding: 5px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;

        &:hover{
            opacity: .8;
        }
    }
    
    span, input{
        font-size: .7rem;
        word-break: break-all
    }
`
