import { Col, Image, InputNumber, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import imgProductBig from "../../assets/images/imgBig.png.webp"
import imgProductSmall from "../../assets/images/imgsmall.webp"
import { WrapperAddressProduct, WrapperBtnQualityProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImg, WrapperStyleImgSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import * as ProductService from "../../service/ProductService";
import * as message from "../../components/Message/Message";
import {
    PlusOutlined,
    MinusOutlined
  } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router";
import SignInComponent from "../SignInComponent/SignInComponent";
import { addOrderProduct, resetOrder } from "../../redux/slices/orderSlide";
import { convertPrice, initFacebookSDK } from "../../Ultis";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/ComentComponent";
  
const ProductDetailsComponent=({idProduct})=>{
    const navigate=useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const order = useSelector((state) => state.order)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
   const [numProduct,setNumProduct]=useState(1);
   const user = useSelector((state) => state.user);
   const dispatch=useDispatch();

    const onChange = (value) => {
        setNumProduct(Number(value))
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    const fetchGetDetailsProduct= async ()=>{
        const res=await ProductService.getDetailsProduct(idProduct);
        return res?.body;
      
    }

    const { data: productDetails } = useQuery({
        queryKey: ['product-details',idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
        // retry: 3,
        // retryDelay: 100000000000
      });
      

      const handleChangeNumProduct=(type,limited)=>{
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
      }
    
      const handleAddOrderProduct=()=>{
        if(!user?.id){
            setIsModalOpen(true);
        }else{
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?.id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                message.success('Đã thêm vào giỏ hàng')
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?.id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
      }
      useEffect(() => {
        initFacebookSDK()
    }, [])
      
      useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item?.product === productDetails?.id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])
    return(
        <div>
            <Row  style={{padding:'16px', background:'#fff'}} >
            <Col span={10} style={{borderRight:'1px solid #e5e5e5', paddingRight:'8px'}}>
                <Image src={productDetails?.image} alt="Image Product" preview={false}/>
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
                <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                <div>
                <Rate allowHalf disabled defaultValue={productDetails?.rating} value={productDetails?.rating} />
                <WrapperStyleTextSell> (140)</WrapperStyleTextSell>
                <WrapperStyleTextSell> | Đã bán {productDetails?.sold}+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                    {convertPrice(productDetails?.price)}<sup>₫</sup>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>  
                <div style={{fontWeight:'600',fontSize:'16px',lineHeight:'150%'}}>Thông tin vận chuyển</div>
                <WrapperAddressProduct style={{display: 'flex', alignItems: 'center'}}>
                    <span>Giao đến: </span>
                    <span className="address" style={{color:"#4682B4"}}>{user?.address}</span>
                
                    <span className="changeAddress" >Đổi</span>
                </WrapperAddressProduct>
                <LikeButtonComponent
                     dataHref={ process.env.REACT_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/" 
                        : window.location.href
                    } 
                    />
                <div  style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div>Số lượng</div>
                    <WrapperQualityProduct>
                    <WrapperBtnQualityProduct>
                    <MinusOutlined style={{fontSize:'20px'}} onClick={()=>handleChangeNumProduct("decrease",numProduct === 1)}/>
                    </WrapperBtnQualityProduct>
                    
                    <WrapperInputNumber min={1} max={10}  value={numProduct} onChange={onChange} size="default" style={{width:'40px'}} />
                    <WrapperBtnQualityProduct>
                    <PlusOutlined style={{fontSize:'20px'}} onClick={()=>handleChangeNumProduct("increase", numProduct === productDetails?.countInStock)}/>
                    </WrapperBtnQualityProduct>
                    
                    </WrapperQualityProduct>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'6px', margin:'20px 0'}}>
                    <ButtonComponent onClick={handleAddOrderProduct} size='large' textButton="Chọn mua" style={{
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
                {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>}
            </Col>
            <CommentComponent 
                   dataHref={process.env.REACT_APP_IS_LOCAL 
                    ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                    : window.location.href
                } 
                    width="1270" 
                />
            </Row>
            <div>
       
        {isModalOpen && <SignInComponent visible={isModalOpen} onCancel={handleCancel} />}
    </div>
        </div>
    )
}
export default ProductDetailsComponent