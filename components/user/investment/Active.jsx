import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from '../../../loaders/Spinner';
// import { getTxn } from "../../../redux/invest/invest";
// import { useDispatch} from 'react-redux';

export default function Active({data, txn}) {
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
        <div style={{fontWeight: 'bold', margin: '0 0 10px 40px', color: 'var(--bright-color'}}>Active</div>
        <Wrapper>
            {
              isLoading ? <div className="center"><Spinner size="20px"/></div> :
              data && data.length < 1 ? <Msg /> :
              (
                data && data.map(data=>{
                  return (
                    <Card key={data._id}>
                      <div className="title">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>{data.type.toUpperCase()}</div>
                            <div style={{color: '#c20'}}>
                              {
                                data.userId.isAdmin ? 'Admin' : ''
                              }
                            </div>
                        </div>
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
                            <div style={{fontWeight: 600}}>Matures</div>
                            {
                              (function(){
                                let maturein = data && new Date(data.createdAt).getTime() / 1000 + data.lifespan
                                let formated = new Date(maturein * 1000);

                                return (
                                  <>
                                    <div style={{fontSize: '.7rem'}}>
                                      {month[new Date(formated).getMonth()]} {new Date(formated).getDate()}, {new Date(formated).getFullYear()}
                                    </div>
                                    <div style={{fontSize: '.7rem'}}>
                                    {new Date(formated).getHours()}  : {new Date(formated).getMinutes()} : {new Date(formated).getSeconds()}
                                    </div>
                                  </>
                                )
                              }())
                            }
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
              )

            }
            
        </Wrapper>
      </>
    )
}


const Msg = ()=>{

    return (
      <MsgWrapper className="none">
        You do not have active investment at the moment. Please choose a plan to begin now!
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
      width: 90%;
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

