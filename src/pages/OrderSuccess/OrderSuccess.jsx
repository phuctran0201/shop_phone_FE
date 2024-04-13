import React, { useEffect, useMemo, useState } from "react";
import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperItemOrderInfo, WrapperLeft, WrapperListOrder, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal, WrapperValue } from "./style";
import { Checkbox,Form ,Radio} from "antd";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slices/orderSlide';
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from "../../components/Message/Message";
import * as UserService from '../../service/UserSevice';
import * as OrderService from '../../service/OrderService';
import {
    DeleteOutlined,MinusOutlined,PlusOutlined,
  } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { convertPrice, isJsonString } from "../../Ultis";

import { useLocation, useNavigate } from "react-router";
import { orderContant } from '../../contant';
const OrderSuccess = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
};
    const [isLoading, setIsLoading] = useState(false); 
  
    const location = useLocation()
    const {state} = location
    
   
    useEffect(() => {
      let timer;
      if (isLoading) {
          timer = setTimeout(() => {
              setIsLoading(false);
          }, 3000); 
      } else {
          setIsLoading(false); 
      }
      return () => clearTimeout(timer);
  }, [isLoading]);
    
    return (
      <>
      <LoadingComponent isLoading={isLoading}>
    <div style={{ background: '#f5f5fa', maxWidth: '100%', height: '100vh' }}>
            <div style={{ height: '100%', maxWidth: '100%', margin: '0 auto' }}>
                <h3 style={{padding:" 15px  50px"}}>Đơn hàng đặt thành công</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap:'70px'}}>
                    <WrapperLeft>
                    <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                      <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo >
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name} style={{backgroundColor:"#ccc"}}>
                      <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '20px', }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <WrapperValue>
                <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}<sup>đ</sup></span>
              </WrapperValue>
                    </WrapperLeft>
                    
                </div>
            </div>
        </div>
        </LoadingComponent>
        </>
    )
  }
export default OrderSuccess