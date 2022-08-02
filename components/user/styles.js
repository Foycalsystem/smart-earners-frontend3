import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  .account-balance{
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.2rem;

  }

  .center{
    display: flex;
    justify-content: center;
    align-items: center'
  }
`

const Form = styled.form`
  width: 70%;
  min-width: 200px;
  max-width: 400px;
  margin: auto;
  padding: 20px 10px;

  .title{
    test-align: center;
    
  }
`
const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  display block;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 5px;

  &:focus{
    outline: none;
    border: 2px solid green;
  }

  &[type="submit"]{
    color: #fff;
    background: var(--major-color-purest);
    cursor: pointer;
  }
`
const Select = styled.select`
  width: 100%;
  display block;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 5px;

  &:focus{
    outline: none;
    border: 2px solid green;
  }
`


export {
    Wrapper,
    Form,
    InputWrapper,
    Input,
    Select
}