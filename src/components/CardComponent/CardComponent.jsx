import React from "react";
import mall from "../../assets/images/chinhhang.png"
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import {
    StarFilled
  } from '@ant-design/icons';

const CardComponent=()=>{
    return(
        <div>
        <WrapperCardStyle
        bodyStyle={{padding:'10px'}}
        hoverable
        style={{
            width: "240px"
           
        }}
            cover={<img alt="example" src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" />}
        >
            <img src={mall} alt=""style={{width:'68px', height:'14px',position:'absolute',top:'-1px',left:'-1px',borderTopRightRadius:'3px'}}/>
            <StyleNameProduct>Iphone 15 promax</StyleNameProduct>
            <WrapperReportText>
               <span style={{marginRight:'4px'}}>
               <span>4,69</span> 
                <StarFilled  style={{color:'yellow', fontSize:'12px'}} /> 
               </span>
                <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
                
            </WrapperReportText>
            <WrapperPriceText><span style={{marginRight:'5px'}}>32.000.000đ</span> <WrapperDiscountText> -5%</WrapperDiscountText></WrapperPriceText>
        </WrapperCardStyle>
        </div>
    )
}
export default CardComponent