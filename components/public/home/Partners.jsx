import Image from 'next/image'
import styled from 'styled-components'
import {
    PartnersWrapper
} from './styles'

import SectionTitle from "./SectionTitle"

const Partners = () => {
  return (
    <PartnersWrapper>
      <SectionTitle subtitle={"We never walk alone, our strategic and key partners over the years"}> OUR PARTNERS </SectionTitle>

      
        <Card>       

            <ImageCard>
              <Image src={"/trademarks/infinox.png"}  layout="intrinsic" width="50" height="30" alt="partners" />
            </ImageCard>

            <ImageCard>
              <Image src={"/trademarks/bnc.png"}  layout="intrinsic" width="70" height="30" alt="partners" />
            </ImageCard>

            <ImageCard>
              <Image src={"/trademarks/fxtm.png"}  layout="intrinsic" width="40" height="20" alt="partners" />
            </ImageCard>

            <ImageCard>
              <Image src={"/trademarks/afx-logo.png"}  layout="intrinsic" width="30" height="30" alt="partners" />
            </ImageCard>
            
        
        </Card>
      </PartnersWrapper>
  )
}

export default Partners

const Card = styled.div`
  display: flex;
  justify-content: center;
`

const ImageCard = styled.div`
 display: inline-block;
 margin : auto 5px

`