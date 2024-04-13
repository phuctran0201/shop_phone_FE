import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImgSmall=styled(Image)`
height:64px !important;
width:64px !important;
border-radius:5px;
`
export const WrapperStyleColImg=styled(Col)`
flex-basis:unset;
display:flex;
`
export const WrapperStyleNameProduct=styled.h1`
    
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`
export const WrapperStyleTextSell=styled.span`
font-size:15px;
line-height:24px;
color:rgb(120,120,120);
`
export const WrapperPriceProduct=styled.div`
background:rgb(250,250,250);
border-radius:4px;
`
export const WrapperPriceTextProduct=styled.h1`
font-size: 24px;
font-weight: 600;
 line-height: 150%;
 padding:10px;
 margin-top:10px;
`
export const WrapperAddressProduct=styled.div`
 span.address{
    color: rgb(39, 39, 42);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 80%;
    margin-left:5px;
 }
 span.changeAddress{
    margin:10px ;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    flex: 1;
    color: rgb(10, 104, 255);
 }
`
export const WrapperQualityProduct=styled.div`
margin:20px 0 ;
display:flex;
gap:5px;
align-items:center;
width:150px;
`
export const WrapperBtnQualityProduct=styled.span`
border-radius:4px;
border:1px solid #ccc;
color: rgb(36, 36, 36);
padding:6px;
`
export const WrapperInputNumber=styled(InputNumber)`
.ant-input-number-handler-wrap{
    display:none !important;
}
`