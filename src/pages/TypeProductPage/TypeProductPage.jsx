import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
const TypeProductPage=()=>{
    return(
        <div style={{padding:'10px 120px 0 ',background:'#efefef'}}>
            <Row style={{flexWrap:'nowrap'}}>
                <WrapperNavbar span={4} >
                    <NavbarComponent/>
                </WrapperNavbar>
                <WrapperProducts span={20}>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                <div style={{textAlign:'center', marginTop:'10px'}}>
                <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange}  />
                </div>
                </WrapperProducts>
            </Row>
            
            
        </div>
    )
}
export default TypeProductPage