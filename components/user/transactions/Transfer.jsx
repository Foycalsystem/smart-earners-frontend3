import styled from 'styled-components';
import filter from "@mozeyinedu/filter";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import date from '../date/data';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


import {
  Header_Table,
} from '../../admin/styles';


export default function Transfer({toggleState, data, id}) {
    const [inp, setInp] = useState('');
    const [filteredData, setFilter] = useState(data);
    const [clicked, setClicked] = useState(false)
  
    useEffect(()=>{
        const newData = filter({
        data: data,
        keys: [ "amount", "id", "accountNumber"],
        input: inp
        })

        setFilter(newData)

    }, [inp, data])

    
    const toggle =(index)=>{
      if(clicked === index){
        return setClicked(null)
      }
      setClicked(index)
    }

    
    return (
        <div>
          <Header_Table>
            {
              data.length < 1 ? '' :
              (
                <div className="row">
                  <div className="search">
                      <input
                      type="text"
                      placeholder="Search by amount, account number, id"
                      value={inp || ''}
                      onChange={(e)=>setInp(e.target.value)}
                      />
                      <div className="icon"><SearchIcon /></div>
                  </div>
                </div>
              )
            }
          </Header_Table>
          {
            data.length < 1 ? <Msg />:
            <Wrapper>
                {
                  filteredData && filteredData.map((data, index)=>{
                   return (
                    <Card toggleState={toggleState} key={data._id}>
                      <div style={
                        (function(){
                          if(id === data.sender._id){
                           return {color: '#c20'}
                          }
                          else if(id === data.receiver._id){
                            return {color: 'green'}
                          }
                        }())
                      }  onClick={()=>toggle(index)} className='arrow'>
                        {clicked==index ? <ArrowDropUpIcon />:< ArrowDropDownIcon/> }
                      </div>
                      {
                        (function(){
                          if(id === data.sender._id){
                            return (
                              <div>
                                <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                <div className='item'>
                                  <span>You sent the sum of </span><span style={{fontWeight: 'bold'}}>{data.amount} {data.currency}</span> <span>to </span> <span style={{fontWeight: 'bold'}}>{data.receiver ? data.receiver.username : '(User Removed)'}</span>
                                </div>

                                {
                                  clicked === index ?
                                  <div className="dropdown">
                                    <div>Receiver: {data.receiver ? data.receiver.username : '(User Removed)'}</div>
                                    <div>Account No: {data.accountNumber}</div>
                                    <div>Id: {data._id}</div>
                                  </div> : null
                                }

                              </div>
                              
                            )
                          }
                          else if(id === data.receiver._id){
                            return (
                              <div>
                                <div style={{cursor: 'pointer', fontSize: '.6rem'}} onClick={()=>toggle(index)}>{date.createdDate(data)}</div>
                                <div className='item'>
                                  <span>You received the sum of </span><span style={{fontWeight: 'bold'}}>{data.amount} {data.currency}</span> <span>from </span> <span>{data.sender.username}</span>
                                </div>

                                {
                                  clicked === index ?
                                  <div className="dropdown">
                                    <div>Sender: {data.sender.username}</div>
                                    <div>Account No: {data.accountNumber}</div>
                                    <div>Id: {data._id}</div>
                                  </div> : null
                                }
                              </div>
                            )
                          }
                          
                          
                        }())
                      }
                    </Card> 
                   ) 
                  })
                }
            </Wrapper>
          }
          
        </div>
    )
}



const Wrapper = styled.div`
  width: 98%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  margin: auto;

  @media (max-width: 366px){
    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
  }

` 

const Card = styled.div`
  width: 180px;
  min-height: 70px;
  cursor: default;
  margin: 10px auto;
  padding: 2px 10px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .item{
    font-size: .65rem;
    // line-height: .3rem;
  }

  .track{
    text-align: center;
    margin:10px auto 1px auto;
    padding: 5px;
    cursor: pointer;
    background: #e5e5e5;
    font-weight: bold;
    
  }

  .arrow {
    cursor: pointer;
    position: absolute;
    top: -2px;
    font-weight: bold;
    right: 2px;
  }
  @media (max-width: 366px){
    width: 300px;
  }

  .dropdown{
    margin-top: 2px;
    position: absolute;
    top: 60px;
    left: 0px;
    font-size: .65rem;
    right: 0px;
    padding: 5px 10px;
    width: 100%;
    min-height: 100px;
    z-index:1;
    background: ${({toggleState})=>toggleState ? 'var(--light-theme)' : 'var(--dark-theme)'};
  }
`



const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        No Any Transfer Transaction At The Moment
      </MsgWrapper>
    )
}


const MsgWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`
