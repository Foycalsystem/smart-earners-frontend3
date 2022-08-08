import styled from 'styled-components';
import { RiCloseLine} from 'react-icons/ri'
import { useEffect } from 'react';

function Feedback({msg, status, feedback, setFeedback}){

    // handle close feedback msg
    const handleClose =()=>{
        setFeedback({
            msg: '',
            status: false
        })
    }

    return (
        
        feedback.status ? (
            msg ? 
            (
                status ? 
            (
                <Success>
                    <Close onClick={handleClose}>
                        <RiCloseLine />
                    </Close>
                    {msg}
                </Success>
            ) :
            (
                <Error>
                    <Close onClick={handleClose}>
                        <RiCloseLine />
                    </Close>
                    {msg}
                </Error>
            )
            ): ''
        ):''
    )
}

export default Feedback


export const Error = styled.small`
    background: rgb(243 100 69 / 37%);
    color: rgb(219 70 20);
    border: 1px solid rgb(219 70 20);
    padding: 10px;
    text-align: center;
    font-style: italic;
    fony-size: .9rem;
    position: relative;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 8px;
`

export const Success = styled.small`
    background: rgb(99 227 174 / 43%);
    color: rgb(4 72 53);
    border: 1px solid rgb(4 72 53);
    padding: 10px;
    text-align: center;
    font-style: italic;
    position: relative;
    font-size: .8rem;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 8px;
`
export const Close = styled.small`
    right: 2px;
    top: 2px;
    width: 16px;
    height: 16px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: .8rem;
    opacity: .5;
    position: absolute;
`