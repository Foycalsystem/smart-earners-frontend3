import styled from 'styled-components'
import {
    SectionWrapper,
    Button,
    Section,
    SectionTitle,
    SectionSubTitle,
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

// Hero section

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
const HeroSectionWrapper = styled.div`
    width: 100%;
    height: fit-content;
    border: 1px solid red;
    background: whitesmoke;
    border: 2px solid transparent;

    .meso-layer{
        width: 90%;
        height: 100%;
        margin: 0px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        .left-side{
            width: 80%;
            caption h1{
                    font-size: 3rem;
                    margin: 15px 0;
                }
            p{ 
                    font-size: 1.1rem;
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
                margin: 30px auto;
                display: grid;
                place-items: center;
                box-shadow: rgba(100,100, 100,0.5) 0px 2px 8px 0px;
            }
        }
        } 
    
    @media ${device.tablet}{
    width: 100%;
    height: 50vh;
    background: whitesmoke;
    border: 2px solid transparent;

    .meso-layer{
        // width: 90%;
        // height: 100%;
        // margin: 0px auto;
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-around;
        // align-items: center;

        .left-side{
            width: 50%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: flex-start;
                caption h1{
                    font-size: 3rem;
                    margin-bottom: 15px;
                }
            p{ 
                    font-size: 1.1rem;
                    width: 80%;
                    margin: 10px 0 20px;
                    text-align: justify;
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
                margin: 30px 0 0 0;
                display: grid;
                place-items: center;
                box-shadow: rgba(100,100, 100,0.5) 0px 2px 8px 0px;
            }
        }
        }
    } 
`

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
const SwipeWrapper = styled.div`
    // margin: 20px auto;
    // width: 97%;
    // min-width: 200px;
    // display: flex;
    // justify-content: center;

    // .swiper{
    //     // width: 100%;
    //     display: flex;
    //     justify-content: center;

    //     @media (max-width: 920px){
    //         width: 100%;
    //     };
    //     @media (max-width: 820px){
    //         width: 450px;
    //     };
    //     @media (max-width: 500px){
    //         width: 450px;
    //     }
    //     @media (max-width: 490px){
    //         width: 350px;
    //     }
    // }
`


export {
    HeroSectionWrapper,
    HeroSectionSubTitle,
    HeroSectionText,
    HeroButton,
    CardWrapper,
    LandscapeCard,
    ServiceSectionWrapper,
    PlanSectionWrapper,
    StatAndTestimonyWrapper,
    AboutUsContainer,
    SwipeWrapper,
    PartnersWrapper,
    ImageCard,
    device
}