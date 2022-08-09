import styled from 'styled-components'
import {
    Button,
    SectionTitle,
    SectionText
} from '../../../styles/globalStyle'



const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };

const Wrapper = styled.div`
    width: 100%;
    margin: 10px auto;

    .meso-layer{
        margin: 5px auto;
        padding: 10px;
        display:flex;
        flex-flow: row wrap;
        justify-content: center;
        gap:5px;
    }

`
const HeroSectionWrapper = styled(Wrapper)`
    width: 100%;
    background: var(--major-color-30A);
    margin:3px auto;

    p{ 
        font-size: 1rem;
        width: 100%;
        margin: 10px 0 20px;
        text-align: center;
    }
    button{
        width: 200px;
        height: 35px;
        outline: none;
        border: none;
        border-radius: 20px;
        background: var(--bright-color);
        color: #fff;
        font-weight: 600;
        font-size: 1.09rem;
        margin: 10px auto;
        display: grid;
        place-items: center;
        box-shadow: rgba(100,100, 100,0.5) 0px 2px 8px 0px;

        @media (max-width: 500px){
            margin: 10px auto;
        }
    }

    aside{
        width: 100%;
        max-width: 400px;
    }
    .right-side{
        display: flex;
        height: 33vh;
        width: 60%;
    }

    @media (min-width: 600px){
        .right-side{
            height: 40vh;
        }
    }

    @media (min-width: 800px){
        aside{
            margin auto 20px;
        }

        .left-side{
            padding: 20px;
        }
    }
`

const HeroSectionTitle = styled(SectionTitle)``

const HeroSectionSubTitle = styled.div`
    color: var(--major-color-purest);
    font-weight: bolder;
    font-size: 1.2rem;
    margin: 10px auto;
    svg{
        color: var(--bright-color);
    }
`
const HeroSectionText = styled(SectionText)`
    padding: 10px;
    margin: 10px 0;
    text-align: center;
    font-size: 1.09rem;

`
const HeroButton = styled(Button)`
    margin-top: 100px;
    margin-bottom: 30px;

    &:hover{
        color: #fff;
    }
    
`

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`
const LandscapeCard = styled.div`
    width: 300px;
    height: 270px;
    background: ${({bg})=>bg};
    margin: 15px;
    box-shadow: 2px 2px 3px #aaa, -2px -2px 3px #aaa;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ImageCard = styled.div`
    width: fit-content;
    height: fit-content;
    margin: 10px;
`

const ServiceSectionWrapper = styled(Wrapper)``

const PlanSectionWrapper = styled(Wrapper)``

const StatAndTestimonyWrapper = styled(Wrapper)``

const AboutUsContainer = styled(Wrapper)`


`

const PartnersWrapper = styled(Wrapper)`
    background: var(--major-color-30A);

    .content {
        // width: 70%;
        margin: 20px auto; 
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: center;
    }
`


export {
    HeroSectionWrapper,
    HeroSectionSubTitle,
    HeroSectionTitle,
    HeroSectionText,
    HeroButton,
    CardWrapper,
    LandscapeCard,
    ServiceSectionWrapper,
    PlanSectionWrapper,
    StatAndTestimonyWrapper,
    AboutUsContainer,
    PartnersWrapper,
    ImageCard,
    device
}