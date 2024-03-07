import React from "react";
import mall from "../../assets/images/chinhhang.png"
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import {
    StarFilled
  } from '@ant-design/icons';

const CardComponent=()=>{
    return(
        <div>
        <WrapperCardStyle
        
            hoverable
            bodyStyle={{padding:'10px'}}
            style={{
            width: 240,
            }}
            cover={<img alt="example" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" />}
        >
            <img src={mall} style={{width:'68px', height:'14px',position:'absolute',top:'-1px',left:'-1px',borderTopRightRadius:'3px'}}/>
            <StyleNameProduct>Iphone 15 promax</StyleNameProduct>
            <WrapperReportText>
               <span style={{marginRight:'4px'}}>
               <span>4,69</span> 
                <StarFilled  style={{color:'yellow', fontSize:'12px'}} /> 
               </span>
                <span> | Đã bán 100+</span>
                
            </WrapperReportText>
            <WrapperPriceText>32.000.000đ <WrapperDiscountText> -5%</WrapperDiscountText></WrapperPriceText>
        </WrapperCardStyle>
        </div>
    )
}
export default CardComponent