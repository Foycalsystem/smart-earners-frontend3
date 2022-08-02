import { Main, Header, Footer } from '../../styles/globalStyle'
import Header_ from './Header';
import { CopyRight } from '../../styles/globalStyle';
import PostFeedback from './PostFeedback';
import Head from 'next/head';


export default function PublicLayout({children, userInfo}) {

    return (
      <>
        <Head>
          <title>{process.env.homeTitle}</title>
        </Head>
        <Header headerHeight="90px">
          <Header_ userInfo={userInfo}/>
        </Header>

        <Main userInfo={userInfo} height={{headerHeight: '90px', footerHeight: '50px'}}>
            <PostFeedback />
            {children}
        </Main>

        <Footer style={{background: 'var(--major-color-purest)', display: 'flex', justifyContent: 'center', alignItems: 'center'}} footerHeight='50px'>
            <CopyRight>
                    &copy; {new Date().getFullYear() > 2022 ? '2021 - ' + new Date().getFullYear() : 2022} Smart Earners
            </CopyRight>
        </Footer> 
      </>
    )
}