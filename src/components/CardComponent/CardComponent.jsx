import React from "react";
import mall from "../../assets/images/chinhhang.png"
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import {
    StarFilled
  } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { convertPrice } from "../../Ultis";



const CardComponent=(props)=>{
    const navigate=useNavigate();
    const {countInStock,description,image,name,price,rating,type,discount,sold,id}=props
    const handleDetailsProduct=(id)=>{
        navigate(`/product-details/${id}`)
    }
    return(
        <div>
        <WrapperCardStyle
        hoverable
        
        style={{
            width: "240px",
          
        }}
            cover={<img alt="example" src={image}/>}
            onClick={()=>handleDetailsProduct(id)}
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
            <WrapperPriceText><span style={{marginRight:'5px'}}>{convertPrice(price)}<sup>₫</sup></span> <WrapperDiscountText> -{discount}%</WrapperDiscountText></WrapperPriceText>
        </WrapperCardStyle>
        </div>
    )
}
export default CardComponent