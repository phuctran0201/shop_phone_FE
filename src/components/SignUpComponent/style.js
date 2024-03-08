import { Input, Modal } from "antd";
import styled from "styled-components";

export const WrapperModalSignUp=styled(Modal)`
width: 440px !important;
height:60% !important;
box-shadow: 0 0 70px 0 #ff7878,
0 0 72px 0 #ff7878,
0 0 75px 0 #ff7878;
.ant-modal-body{
    width: 400px !important;
    height:400px !important;
 position: relative;
 top: 60%;
 left: 60%;
 transform: translate(-50%,0%);

display: flex;
justify-content: space-between;
}

`

export const WrapperSiginIcon=styled.span`
font-size: 20px;
margin: 0 8px;
background-color: #ff7878;
background-image: linear-gradient(315deg, #black 0%, #ff0000 74%);
padding: 7px;
border-radius: 12px;
cursor: pointer;
`
export const WrapperSignUpRight=styled.form`
display: flex;

padding: 0 50px;
align-items: center;
flex-direction: column;
justify-content: center;
color: white;
`
export const WrapperSignUpInput=styled.div`
    width: 155%;
    height: 45px;
    margin-bottom: 15px;
    position: relative;
    border-bottom: 2px solid white;
    color:rgb(36, 36, 36);
`
export const WrapperSignUpInputItem=styled(Input)`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    padding: 0 15px;
    color: var(--white);
    font-size: 16px;
`
export const WrapperSignUpIconInput=styled.span`
position: absolute;
 right: 12px;
top:15px;
color:black;
`