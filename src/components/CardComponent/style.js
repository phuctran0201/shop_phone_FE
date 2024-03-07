import { Card } from "antd";
import styled from "styled-components";

export const StyleNameProduct=styled.div`
    font-weight:600;
    font-size:12px;
    line-height:16px;
    color:rgb(56,56,61);
`
export const WrapperReportText=styled.div`
    color:rgb(128,128,137);
    font-size:11px;
    display:flex;
    align-items:center;
    margin:6px 0 4px;
`
export const WrapperPriceText=styled.div`
color:#d70018;
font-size:16px;
font-weight:500;

`
export const WrapperDiscountText=styled.span`
color:#d70018;
font-size:12px;
font-weight:400;

`

export const WrapperCardStyle=styled(Card)`
width:210px;
& img{
    height:210px;
    width:210px
}
position:relative;

`