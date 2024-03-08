import { Col, Image, InputNumber, Rate, Row } from "antd";
import React from "react";
import imgProductBig from "../../assets/images/imgBig.png.webp"
import imgProductSmall from "../../assets/images/imgsmall.webp"
import { WrapperAddressProduct, WrapperBtnQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImg, WrapperStyleImgSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";

import {
    PlusOutlined,
    MinusOutlined
  } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
  const onChange = (value) => {
    console.log('changed', value);
  };
const ProductDetailsComponent=()=>{
    return(
        <div>
            <Row  style={{padding:'16px', background:'#fff'}} >
            <Col span={10} style={{borderRight:'1px solid #e5e5e5', paddingRight:'8px'}}>
                <Image src={imgProductBig} alt="Image Product" preview={false}/>
                <Row style={{ paddingTop:"10px",justifyContent:'space-between'}}>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small"preview={false}/>
                    </WrapperStyleColImg>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small" preview={false}/>
                    </WrapperStyleColImg>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small" preview={false}/>
                    </WrapperStyleColImg>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small" preview={false}/>
                    </WrapperStyleColImg>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small" preview={false}/>
                    </WrapperStyleColImg>
                    <WrapperStyleColImg span={4}>
                    <WrapperStyleImgSmall src={imgProductSmall} alt="Image Product Small" preview={false}/>
                    </WrapperStyleColImg>
                
                </Row>
            </Col>
            <Col span={14} style={{ padding:'0 10px '}}>
                <WrapperStyleNameProduct>Apple iPhone 15 Pro Max</WrapperStyleNameProduct>
                <div>
                <Rate disabled defaultValue={5} />
                <WrapperStyleTextSell> (140)</WrapperStyleTextSell>
                <WrapperStyleTextSell> | Đã bán 100+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                    30.990.000<sup>₫</sup>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>  
                <div style={{fontWeight:'600',fontSize:'16px',lineHeight:'150%'}}>Thông tin vận chuyển</div>
                <WrapperAddressProduct style={{display: 'flex', alignItems: 'center'}}>
                    <span>Giao đến: </span>
                    <span className="address" > Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội</span>
                
                    <span className="changeAddress" >Đổi</span>
                </WrapperAddressProduct>

                <div>
                    <div>Số lượng</div>
                    <WrapperQualityProduct>
                    <WrapperBtnQualityProduct>
                    <MinusOutlined style={{fontSize:'20px'}} />
                    </WrapperBtnQualityProduct>
                    
                    <WrapperInputNumber min={1} max={10} defaultValue={1} onChange={onChange} size="default" style={{width:'40px',paddingLeft:'4px'}} />
                    <WrapperBtnQualityProduct>
                    <PlusOutlined style={{fontSize:'20px'}}/>
                    </WrapperBtnQualityProduct>
                    
                    </WrapperQualityProduct>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'6px', margin:'20px 0'}}>
                    <ButtonComponent size='large' textButton="Chọn mua" style={{
                        background:'rgb(255, 66, 78)',
                        color:'#fff',width:'220px',
                        fontWeight:'700'}}>

                    </ButtonComponent>
                    <ButtonComponent size='large' textButton="Mua trả góp - trả sau" style={{
                        background:'rgb(255, 255, 255)',
                        color:'rgb(10, 104, 255)',
                        width:'220px',
                        borderColor:'rgb(10, 104, 255)',
                        fontWeight:'700'}}>

                    </ButtonComponent>
                </div>
            </Col>
            </Row>
        </div>
    )
}
export default ProductDetailsComponent