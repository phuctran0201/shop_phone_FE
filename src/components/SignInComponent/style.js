import { Input, Modal } from "antd";
import styled from "styled-components";
import InputComponent from "../InputComponent/InputComponent";

export const WrapperModalSignIn=styled(Modal)`
width: 840px !important;
height:60%;
box-shadow: 0 0 70px 0 #ff7878,
0 0 72px 0 #ff7878,
0 0 75px 0 #ff7878;
.ant-modal-body{
    width: 840px !important;
    height:65% !important;
 position: relative;
 top: 50%;
 left: 50%;
 transform: translate(-50%,0%);

display: flex;
justify-content: space-between;
}

`
export const WrapperSiginLeft=styled.div`
width: 500px;
background-color: #ff7878;
background-image: linear-gradient(315deg, #ff7878 0%, #ff0000 74%);
clip-path : polygon(0 0,100% 0,70% 100%, 0% 100%);
color: white;
padding: 150px 20px;
text-align: center;
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
export const WrapperSiginRight=styled.form`
display: flex;
width: 340px;
padding: 0 20px;
align-items: center;
flex-direction: column;
justify-content: center;
color: white;
`
export const WrapperSiginInput=styled.div`
    width: 100%;
    height: 45px;
    margin-bottom: 15px;
    position: relative;
    border-bottom: 2px solid white;
    color:rgb(36, 36, 36);
`
export const WrapperSiginInputItem=styled(InputComponent)`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    padding: 0 15px;
    color: var(--white);
    font-size: 16px;
`
export const WrapperSiginIconInput=styled.span`
position: absolute;
 right: 12px;
top:15px;
color:black;
cursor:pointer;
`