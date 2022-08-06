import React from 'react'
import styled from 'styled-components'
import { device } from './styles'


const ServiceCard = ({datum}) => {
  return (
    <StyledCard>
        <span>
            <figure style={{margin: '-6px'}}>{datum.emblem}</figure>
            <p>{datum.title}</p>
        </span>

        <p>{datum.description}</p>
    </StyledCard>
  )
}

const StyledCard =styled.section`
    width: 140px;
    border-radius: 5px;
    margin: 5px 2px;
    padding: 10px;
    font-size: .8rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    text-align: center;  
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    @media (max-width: 366px){
        width: 320px;
    }
    
    span p{
        font-weight: bold;
        margin: 5px;
    }

    @media ${device.tablet}{
        width: 250px;
    }
`

export default ServiceCard