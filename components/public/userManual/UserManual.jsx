import styled from "styled-components"
import Link from 'next/link';
import Image from 'next/image'

const Img =({url})=>{
  return <ImageCard>
          <Image src={`/hw/${url}`} width="200" height="300" alt="Hero Flat Characters" />
        </ImageCard>
}




import {PolicyContainer, SubTitle, SubTitle2, SubTitleHeader, SubTitle3, ImageCard, Title} from '../policy/styles'

export default function UserManual() {
  return (
    <PolicyContainer>
      <Title>HOW IT WORKS</Title>

      <p><strong>TeamSmartearners</strong> is Founded with the aim to Create 100% Transparent trading experience for anyone who wants to invest in the forex market and make sustainable income.</p>

      <p>We have the best and upgraded forex trading bot, which is the latest, expensive and most efficient one of the 2022/23 season. We have put this bot the test, running efficiently, And we structure our Platform for a better and easier investment opportunity to our investors to manage their funds and account, monitor the progress of their investment, as well as providing Education and Mentorship for our customers.</p>

      <p>Our Services are unbeatable, with our interest in successful and prosperous traders who will create high trading volume in the market, we are proud that we helped many customers make revenue and become experts in the forex market.</p>

      <ul>

        <li>From Our Website <Link href="/"><a style={{display: 'inline', color: 'blue'}}>teamsmartearners.com </a></Link> Navigate Through the Left Navigation bar, To Register or Sign in to an account</li>

        <Img url='1.jpeg'/>

        <li>For Registration, Click on the Sign up button, fill in the provided box with your account Information {`(Email, Username, Password)`}</li>
        
        <Img url='2.jpeg'/>

        <li>After Registration, check your email for account verification link, click on the link to verify your account (always check the spam folder)</li>

        <li>Email Verification last for 24 hours, and your account will be deleted if not completed within the timeframe.</li>

        <li>For Sign in, From the Navigation bar, Click the Sign in button, and Log into your account using your registered email or Username, with a password combination.</li>

        <Img url='3.jpeg'/>

        <li>You have successfully logged into your Account</li>

        <li>From your Dashboard, Navigate through the Investment Plans, and choose a suitable Investment plan that suits your earnings goal.</li>

        <li>More investment Plans can be found by scrolling Leftward on the Investment Banners.</li>

        <Img url='4.jpeg'/>

        <li>To Fund your account, Click through the Deposit Button from the lower Navigation Menu, Enter an Amount Dollars, and the SEC equivalent will be displayed, Click the Proceed Button, and choose any of your desired Crypto options to make your payment.</li>

        <Img url='5.jpeg'/>

        <li>Once your Account is Funded, You can choose your Investment Plan and start your journey to make money from the forex Market.</li>
        
      </ul>

      <SubTitle2>Tips {'&'} Guide</SubTitle2>

      <SubTitle3>Deposit</SubTitle3>

      <ul>

        <li>Deposit Are based in crypto currency (Litecoin, Dogecoin, Bitcoin, Etherum, USDT)++</li>

        <li>There’s no minimum and Maximum deposit, underpayment and overpayment will be calculated based on the crypto amount deposited, deposit are reflected instantly after 1-2 Block confirmations on the crypto network. You can request a reciept for your payment on the Coinbase page, after payment</li>

        <Img url='6.jpeg'/>

      </ul>

      <SubTitle3>Investment Summary</SubTitle3>

      <ul>

        <li>Details of your active investment, percentage, expected returns, start and End date.</li>

        <Img url='7.jpeg'/>

      </ul>

      <SubTitle3>Matured </SubTitle3>

      <ul>

        <li>Details of All your Previous investments (Only the Last five are showed )</li>

        <Img url='8.jpeg'/>

      </ul>

      <SubTitle3>Withdrawal </SubTitle3>

      <ul>
            
          <li>Withdrawal request can be submitted via the withdrawal page, which is accessible through the Withdrawal button on the menu.</li>

          <Img url='9.jpeg'/>

      </ul>

      <SubTitle3>Transfer </SubTitle3>

      <ul>
            
          <li>The Transfer Option makes it easier to send and receive funds from other users, family or friends.</li>
          
          <Img url='10.jpeg'/>

          <li>This funds can be withdrawn or used also to purchase an investment plan.</li>

          <li>Go to your Profile to copy your account number, the account number is used to make a transfer, each account number is allocated to a single account.</li>

          <li>Please transfer to users you trust, as a successful payment cannot be refunded.</li>

          <li><strong>NB:</strong> If you send payment to a wrong account number, report immediately to our support using any of the the contact us option</li>

      </ul>

      <SubTitle3>Transaction</SubTitle3>

      <ul>
            
          <li>This Page carries a history display of all your account activities {`(Deposit, withdrawal, transfer)`}</li>

          <li>On this Page you can also check the status of a pending payment, or deposit, or even track the status of your Deposit</li>

          <Img url='11.jpeg'/>

      </ul>


      <SubTitle3>Referral </SubTitle3>

      <p>We value our members, and the referral System gives you the opportunity to invite your family and friends, or colleagues from the internet.</p>

      <ul>
            
          <li>From the Referral page, you can copy your referral link and share with friends, or even a referral code that can be submitted later, if your downlines have registered without a link, so this way, you don't loose your bonus.</li>

          <Img url='12.jpg'/>

      </ul>

      <SubTitle3>Referral History</SubTitle3>

      <p>This same page, you can access the referral history by clicking the button, this will display all your referrals, and the amount there have generated for you</p>

      <p>For more information or guides, please visit the contact us, and use any the medium of the page to reach out to us.</p>

      <p>Thanks for being a Part of Our Community, Always to Serve you better!</p>

      <em style={{fontSize: '.9rem'}}>SmartEarners</em>
          
    </PolicyContainer>
  )
}

