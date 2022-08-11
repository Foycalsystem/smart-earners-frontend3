import styled from 'styled-components'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import SocialLinks from '../../SocialLinks'


export default function ContactUs() {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      // process.env.NEXT_PUBLIC_SERVICE_ID,
      'service_khzu7f2',
      // process.env.NEXT_PUBLIC_TEMPLATE_ID,
      'template_oflpaz1',
      form.current,
      // process.env.NEXT_PUBLIC_PUBLIC_KEY)
      'LSiCmJNgAM1jgbTYo')

    .then((result)=> {
        console.log(result.text);

    }, (error) => {
      console.log(error.text)
    })
  }

  
  return (
    <StyledContact>
       <h3>Message Us</h3>
       <form ref={form} onSubmit={sendEmail}>
          <input disabled  name="sender_name" placeholder="Name" />
          <input disabled name="sender_email" placeholder="Email" />
          <textarea disabled  name="message" placeholder="Message Here..."></textarea>              
          <input disabled  type="submit" value="Send"/>
        </form>

       <div style={{display: 'flex', justifyContent: 'center'}}> <SocialLinks text={"Reach Us"}/> </div>

       <div style={{textAlign: 'center', marginTop: '30px', fontStyle: 'italic', fontSize: '.8rem'}}>
        <div>333 Fremount St, San Francisco, CA</div>
        <div>94105, United States</div>
       </div>
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
