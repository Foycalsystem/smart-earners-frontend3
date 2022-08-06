import React from 'react'
import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import styled from 'styled-components'
import {
  ServiceSectionWrapper,
} from './styles'
import { SectionTitle } from '../../../styles/globalStyle'
import ServiceCard from './ServiceCard'

const data = [
  {
    id: 1,
    emblem: <MonetizationOnIcon fontSize='medium' style={{color: 'var(--bright-color'}}/>,
    title: "Crypto Integration",
    description: "Easier and Convnient way to fund and withdraw from your Account",
       
  },

  {
    id: 2,
    emblem:  <WorkspacesIcon fontSize='medium' style={{color: 'var(--bright-color'}} />,
    title: "Savings and Investment",
    description: "Easy Forex Solution for Everyone to make subsequent  Income while we trade the market",
     
  },

  {
    id: 3,
    emblem:  <SavingsIcon fontSize='medium' style={{color: 'var(--bright-color'}}/>,
    title: "SAFE AND SECURE",
    description: "Our servers is fully protected from attacks. We use one of the most experienced, trusted, protected and mitigated system",
  },
]


const OurServices = () => {
  return (
      <ServiceSectionWrapper>
       
          <SectionTitle subtitle={"Your financial thrive is our priority hence we have curated these amazing financial services"}>
            OUR SERVICES
          </SectionTitle>

          <CardWrapper className="meso-layer">
                {
                  data && data.map((each, idx) => (<ServiceCard key={idx} datum={each} />)  )
                }
          </CardWrapper>
      </ServiceSectionWrapper>
  )
}

export default OurServices

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

  @media (max-width: 366px){
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  }
`