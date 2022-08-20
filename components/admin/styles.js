import styled from 'styled-components';
import { ScrollBar } from '../../styles/globalStyle';

const AdminWrapper = styled.div`
    width: 100%;
`

const Form = styled.form`
    width: 100%;
    padding: 10px;
`

const InputWrapper = styled.div`
    min-width: 100px;
    height: auto;
    position: relative;
    margin: 10px 5px;

    .item {
        color: #972309;
    }

    label{
      font-size: .8rem;
      font-weight: bold;
    }
`

const Input = styled.input`
    display: block;
    width: 100%;
    border: none;
    padding: 5px;
    box-shadow: 1px 3px 3px 0px #ccc;
    font-weight: 600;

    &:focus {
        outline: none;
        border: 1px solid #ccc;
        box-shadow: 1px 3px 3px 0px #ccc;
    }
`

const Label = styled.label`
    width: 100%;
    padding: 5px;
    display: block;
    font-size: .7rem;
    font-weight: 600;
    user-select: none;
    -webkit-user-select: none;
`
    
const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    margin-bottom: 20px;
    display: grid;
    border: 1px solid #f1f1f1;
    border-bottom: 2px solid #aaa;
    grid-template-columns: repeat( auto-fit, minmax(150px, 1fr));
    position: relative;

    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: -12px;
        background: #f1f1f1;
        padding: 2px 4px;
        border-radius: 5px;
        cursor: pointer;
        left: 5px;
        user-select: none;
        -webkit-user-select: none;

        &:hover{
            opacity: .8;
        }

        .edit{
            padding: 3px 15px;
            width: 20px;
            display: block;
            display: flex;
            margin-left: 5px;
            justify-content: center;
            background: var(--major-color-purest);
            color: #fff;
            align-items: center;
            height: 100%;
        }
    }

    .btn{
        position: absolute;
        top: -12px;
        right: 5px;
        display: inline-block;
        width: 100px;
        background: #f1f1f1;
        background: var(--bright-color);
        border: none;
        color: #fff;
        padding: 5px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;

        &:hover{
            opacity: .8;
        }
    }
    
    span, input{
        font-size: .7rem;
        word-break: break-all
    }
`

const TransactionStyle = styled.div`
    width: 100%;
    padding: 10px;
`

const Title = styled.div`
`

const Header = styled.div`
    height: 30px;
    margin: 0 10px;
    display: flex;
    border-bottom: 2px solid var(--major-color-purest);

    a{
        font-weight: bold;
        margin-right: 5px;
        display: block;
    }

    .active{
        color: var(--bright-color);
    }
`
const Header_Table = styled.div`
  margin-bottom: 0px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );

  .row{
    padding: 3px;
    font-size: .8rem;
    justify-self: center;
  }

  .search{
    width: 250px;
    height: 30px;
    border: 1px solid var(--major-color-purest);
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon{
    width:30px;
    background: var(--major-color-purest);
    height: 100%;
    display: flex;
    color:#fff;
    justify-content: center;
    align-items: center;
  }
  input{
    width: calc(100% - 30px);
    padding: 0 8px;
    border: none;

    &:focus{
      outline: none;
      // border: 2px solid green;
    }
  }
  `

  const Table = styled.div`
  padding: 0 10px;
  overflow: auto;
  margin: 0px auto 10px auto;

  ${ScrollBar()}

  table{
    font-size: .7rem;
    margin: auto;
    border-spacing: 0.5rem;
    height: 100%;
    border-collapse: collapse;
    width: 1000px;
    text-align: left;
    cursor: default;
  }

  td, th {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    padding: 0.25rem;
  }

  th{
    background: var(--major-color-purest);
    color: #fff;
  }

  tr:nth-child(even) {
    background: #ddd;
  }

  tbody tr:hover {
    background: var(--major-color-30A);
  }

`


export {
    AdminWrapper,
    Form,
    InputWrapper,
    Container,
    Label,
    Input,
    TransactionStyle,
    Header,
    Title,
    Header_Table,
    Table
}