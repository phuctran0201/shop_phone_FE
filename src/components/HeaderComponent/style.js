import { Row } from "antd";
import styled from "styled-components";
export const WrapperHeader=styled(Row)`
padding: 10px 120px;
background-color:#D70018;
align-items:center;
gap:16px;
flex-wrap:nowrap;
`
export const WrapperTextHeader=styled.span`
font-size:18px;
color:#fff;
font-weight:bold;
text-align:left;

`
export const WrapperHeaderAccount=styled.div`
display:flex;
align-items:center;
color:#fff;
gap:10px;

`
export const WrapperTextHeaderSmall=styled.span`
font-size:12px;
color:#fff;
white-space:nowrap;
padding:0 10px !important;
`
export const WrapperTextPopup=styled.p`
cursor:pointer;
margin:0;
padding:10px;
&:hover{
    background:#A9A9A9;
    color:#343a40;
}
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`