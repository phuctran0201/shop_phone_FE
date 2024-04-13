import { Card } from "antd";
import styled from "styled-components";

export const StyleNameProduct=styled.div`
    width:165px;
    font-weight:600;
    font-size:12px;
    line-height:16px;
    color:rgb(56,56,61);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

.ant-card-cover{
    margin-inline-start: 0;
    margin-inline-end: 0;
}
.ant-card-body{
    padding: 20px 15px  !important;
}
background-color: ${props => props.disabled ? '#ccc' : '#fff'};
cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`
export const WrapperStyleTextSell=styled.span`
font-size:15px;
line-height:24px;
color:rgb(120,120,120)
`