import React from "react";
import mall from "../../assets/images/chinhhang.png"
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import {
    StarFilled
  } from '@ant-design/icons';

const CardComponent=(props)=>{
    const {countInStock,description,image,name,price,rating,type,discount,sold}=props
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
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
               <span style={{marginRight:'4px'}}>
               <span>{rating}</span> 
                <StarFilled  style={{color:'yellow', fontSize:'12px'}} /> 
               </span>
                <WrapperStyleTextSell> | Đã bán {sold}+</WrapperStyleTextSell>
                
            </WrapperReportText>
            <WrapperPriceText><span style={{marginRight:'5px'}}>{price}<sup>₫</sup></span> <WrapperDiscountText> -{discount}%</WrapperDiscountText></WrapperPriceText>
        </WrapperCardStyle>
        </div>
    )
}
export default CardComponent