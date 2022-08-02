import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdClose, MdMenu} from 'react-icons/md'


export default function PopUpModal({showModal, setFeedback, setShowModal, userInfo, children, title}) {
    const closeMenu =(e)=>{
        if(e.target === e.currentTarget){
            setShowModal(false)
            setFeedback({
                msg: '',
                status: false
            })
        }
     }

     const closeMenu2=()=>{
        setShowModal(false);
        setFeedback({
            msg: '',
            status: false
        })
     }
     
     useEffect(() => {
        if(showModal){
            // get the body and set overflow to hidden
            document.body.style.overflow = 'hidden'
        }else{
            // get the body and set overflow to auto
            document.body.style.overflow = 'auto'
        }
       
     }, [showModal])
     


  return (
    <Modal_ show={showModal} onClick={closeMenu}>
        <Content>
            <Close onClick={closeMenu2} className="close"><MdClose color="#fff" /></Close>
            <div className="title">{title}</div>
            <div>{children}</div>
        </Content>
    </Modal_>
  )
}


const Modal_ = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    z-index: 1000000000;
    transition: all .4s;
    opacity: ${({show})=>show ? 1 : 0};
    visibility: ${({show})=>show ? 'visible' : 'hidden'};
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    // width: 80%;
    max-width: 600px;
    min-height: 200px;
    max-height: 500px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    transition: all .3s;
    transform: translateY(${({show})=>show ? '-1000%' : 0});

    .title{
        width: 100%;
        height: 30px;
        color: #fff;
        text-align: center;
        font-weight: 600;
        border-radius: 4px 4px 0 0;
        padding: 5px;
        background: var(--major-color-purest)
    }
`

const Close = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    cursor pointer;
`