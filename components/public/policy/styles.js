import styled from 'styled-components'

const PolicyContainer = styled.div`
    width: 100%;
    margin: auto;
    max-width: 1100px;
    text-align: justify;
    font-size: 1rem;
    padding: 10px 20px;

    .accept-statement {
      text-align: center;
      color: #606060;
      margin: 10px;
    }

    p{
      color: #606060;
      margin-bottom: 10px;
      margin-left: 28px;
      font-size: .9rem;
    }
    ul li{
      list-style-type: square;
      margin: 18px;
      margin-left: 46px;
      font-size: .9rem;
    }
`
const Title = styled.h1`
    font-size: 1.3rem;
    margin-bottom: 10px;
`
const SubTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 6px;
  font-weight: 500
`

const SubTitle2= styled.h3`
  margin-top: 15px;
  margin-bottom: 6px;
  font-weight: 500;
`

const SubTitle3= styled.h4`
  margin-top: 15px;
  margin-bottom: 6px;
  font-weight: 500;
`

const ImageCard = styled.div`
    display: flex;
    margin-left: 70px
`


const SubTitleHeader = styled.h2`
  font-weight: 500
`

export {
  PolicyContainer,
  Title,
  ImageCard,
  SubTitle,
  SubTitle2,
  SubTitleHeader,
  SubTitle3
}