import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from '../../../loaders/Spinner';
// import {useDispatch} from 'react-redux';
// import { getTxn } from "../../../redux/invest/invest";

export default function Mature({data, txn}) {
    // const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)

    // useEffect(()=>{
    //   dispatch(getTxn())
    // }, [])

    useEffect(()=>{
      if(!txn.isLoading){
        setTimeout(()=>{
          setLoading(false)
        }, 1600)
      }
    }, [txn])

    const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return (
      <>
        <div style={{fontWeight: 'bold', margin: '0 0 10px 40px'}}>Matured</div>
        {
            isLoading ? <div className="center"><Spinner size="20px"/></div> :
            data.length < 1 ? <Msg /> :
            <Wrapper>
            {
            data && data.slice(0, 5).map(data=>{
                return (
                  <Card key={data._id}>
                    <div className="title">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>{data.type.toUpperCase()}</div>
                      <div className="line">
                        <div className="progres"></div>
                      </div>
                    </div>
                    <div className="body">
                      <div className="left">
                        <div style={{marginBottom: '4px'}}>
                          <div style={{fontWeight: 600}}>Started</div>
                          <div style={{fontSize: '.7rem'}}>
                            {month[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getDate()}, {new Date(data.createdAt).getFullYear()}
                          </div>
                          <div style={{fontSize: '.7rem'}}>
                            {new Date(data.createdAt).getHours()} : {new Date(data.createdAt).getMinutes()} : {new Date(data.createdAt).getSeconds()
                          }</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 600}}>Amount</div>
                          <div style={{fontSize: '.7rem'}}>{data.amount} {data.currency}</div>
                        </div>
                      </div>
                      <div className="right">
                        <div style={{marginBottom: '4px'}}>
                            <div style={{fontWeight: 600}}>Matured</div>
                            <div style={{fontSize: '.7rem'}}>
                            {month[new Date(data.updatedAt).getMonth()]} {new Date(data.updatedAt).getDate()}, {new Date(data.updatedAt).getFullYear()}
                            </div>
                            <div style={{fontSize: '.7rem'}}>
                              {new Date(data.updatedAt).getHours()} : {new Date(data.updatedAt).getMinutes()} : {new Date(data.updatedAt).getSeconds()
                            }</div>
                        </div>
                        <div>
                          <div style={{fontWeight: 600}}>Returns {data.returnPercentage}%</div>
                          <div style={{fontSize: '.7rem'}}>{data.rewards.toFixed(2)} {data.currency}</div>
                        </div>
                      </div>
                    </div>
                </Card>
                )
            })
            }
            </Wrapper>
        }
      </>
    )
}


const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        You do not have any matured investment at the moment. Please choose a plan to begin now!
      </MsgWrapper>
    )
}


const Wrapper = styled.div`
 width: 98%;
 max-width: 1200px;
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
 margin: auto;
 grid-gap: 10px;
` 

const Card = styled.div`
  width: 260px;
  height: 130px;
  border-radius: 5px;
  margin: 10px auto;
  padding: 5px;
  box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;

  .title{
    text-align: left;
    height: 25px;
    
  }

  .line{
    height: 3px;
    width: 100%;
    border: 1px solid green;
    display: flex;
    align-items: center;   
    
    .progres{
      width: 100%;
      height: 2px;
      background: green;
    }
  }

  .body{
    height: calc(100% - 25px);
    display: flex;
    align-items: center;

    .left, .right{
      width: 50%;
      height: 100%;
      padding-top: 3px;
      font-size: .9rem

    }
  }

`
const MsgWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  box-shadow: 2px 2px 4px #aaa, -2px -2px 4px #aaa;
`
