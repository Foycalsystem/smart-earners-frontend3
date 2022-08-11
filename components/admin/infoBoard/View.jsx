import { useState, useEffect } from "react";
import Spinner from "../../../loaders/Spinner";
import moment from 'moment';
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function View({data}) {
  const [isLoading, setLoading] = useState(true)
  const [clicked, setClicked] = useState(false);
  const [isActive, setActive] = useState(false)
  const [generalNotifications, setGeneralNotifications] = useState([])

  useEffect(()=>{      
    setTimeout(()=>{
      data.isLoading ? setLoading(true) : setLoading(false)
    }, 500)

  }, [data])
 
  useEffect(()=>{    
    setGeneralNotifications(data.data || [])
  }, [data])

  const toggle = async(index, id)=>{ 

    if(clicked === index){
      return setClicked(null);
      
    }
    setClicked(index)
    setActive(true)
  }


  return (  
   <Wrapper>
    {  
      isLoading ? <div className="center"> <Spinner size="20px" /> </div> : 
      generalNotifications && generalNotifications.length < 1 ? '' :
      generalNotifications && generalNotifications.map((data, index)=>{
        return (
          <Accordion key={data._id}>
            <Title onClick={()=>toggle(index, data._id)}>
              {data.title && data.title.toUpperCase()}
              
              <div style={{color: 'var(--bright-color', fontSize: '.55rem'}}>{data.createdAt && moment(data.createdAt).calendar()}</div>

              <div style={{position: 'absolute', top: '0', right: '10px'}}>
                {isActive && clicked === index ? <ArrowDropUpIcon />:<ArrowDropDownIcon/> }
              </div>
            
            </Title>
            <Content clicked={clicked} index={index} isActive={isActive}>{data.body}</Content>
          </Accordion>
        )
      })
    }
   </Wrapper>
  )
}


const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 10px;

  .center{
    display: flex;
    justify-content: center;
  }
`

const Accordion = styled.div`
  width: 100%;
  margin: 10px auto 15px auto;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Title = styled.div`
  width: 100%;
  padding: 10px 30px 10px 30px;
  cursor: pointer;
  font-size: .75rem;
  user-select: none;
  -webkit-user-select: none;
  font-weight: bold;
  position: relative;

  .newMessage{
    position: absolute;
    top: 5px;
    right: 40px;
    background: #ff401a;
    padding: 2px;
    color: #fff;
    font-size: .6rem;
    border-radius: 8px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Content = styled.div`
font-size: .9rem;
line-height: 1.5rem;
height: ${({isActive,  clicked, index})=>isActive && clicked === index ? "auto" : '0'};
padding: ${({isActive, clicked, index})=>isActive && clicked === index ? "0 30px 30px 30px" : '0'};
verflow: hidden;
opacity: ${({isActive,  clicked, index})=>isActive && clicked === index ? "1" : '0'};
transition: .3s;
display:  ${({isActive, clicked, index})=>isActive && clicked === index ? "block" : 'none'};

`