import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import {
    RightOutlined
  } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router";
const ProductDetailsPage=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    return(
        <div style={{padding:'0 120px', background:'#efefef', height:'1000px'}}>
            <h5 style={{marginTop:'0',paddingTop:'10px'}}><span style={{ cursor:"pointer"}} onClick={()=>navigate("/")}>Trang chủ </span><RightOutlined /> Chi tiết sản phẩm</h5>
            <ProductDetailsComponent idProduct={id}/>
        </div>
    )
}
export default ProductDetailsPage