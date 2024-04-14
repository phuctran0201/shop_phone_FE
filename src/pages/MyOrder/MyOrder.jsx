import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { convertPrice, isJsonString } from "../../Ultis";
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from "./style";
import { useLocation, useNavigate } from "react-router";
import * as OrderService from '../../service/OrderService';
import { useQuery } from '@tanstack/react-query';
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as message from "../../components/Message/Message";
import { useSelector } from 'react-redux';
import { Radio,Space } from 'antd';
import Loading from '../../components/LoadingComponent/LoadingComponent'
import ModalComponent from "../../components/ModalComponent/ModalComponent";
const MyOrder=()=>{
    const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [value, setValue] = useState(1);
  const onChange = (e) => {

    setValue(e.target.value);
  };
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
 
  const mutationCancel = useMutationHooks(
    async (data) => {
        const {  accessToken, ...rests } = data;
        
        try {
            const response = await OrderService.cancelOrder(accessToken, {...rests });
            return response; 
        } catch (error) {
            throw error; 
        }
    }
    
  )
  
  const handleCanceOrder =async (order) => {
    try { 
        let storageData = localStorage.getItem('accessToken');
    if (storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData);
       
        const response = await mutationCancel.mutateAsync({accessToken:storageData,id:order?.id, orderItems: order?.orderItems,user: user?.id })
        if(response.statusCode==="OK"){
            message.success();
            queryOrder.refetch();
            setIsModalOpen(false)
        }
        else{
           
        }
        } else {
            console.error("Access token not found or invalid.");
        }
    } catch (error) {
        console.error("Error occurred during mutation:", error);
    }
    
    
  }
  const fetchMyOrder = async () => {
    let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
                const res = await OrderService.getOrderByUserId(storageData,state?.id)
                return res.body
          }
  }
  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder })
  const { isLoading, data } = queryOrder
  
  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?.id}> 
              <img src={order?.image} 
                style={{
                  width: '70px', 
                  height: '70px', 
                  objectFit: 'cover',
                  border: '1px solid rgb(238, 238, 238)',
                  padding: '2px'
                }}
              />
              <div style={{
                width: 260,
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                marginLeft: '10px',
                fontSize: "14px",
                padding:"30px",
                fontWeight: 600,
                color: "#47484b",
                marginBottom: "8px",
                display: "block",
              }}>{order?.name}</div>
              <span style={{  
                fontSize: "14px",
                fontWeight: "600",
                color: "#47484b",
                margin:" auto 0 auto auto" }}>{convertPrice(order?.price)}<sup>đ</sup></span>
            </WrapperHeaderItem>
          })
  }
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        id: id
      }
    })
  }
    return(
        <>
        <Loading isLoading={isLoading}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h4>Đơn hàng của tôi</h4>
          {data && data.length > 0 ? (
          <WrapperListOrder >
            {data.map((order,index) => {
              return (
                <WrapperItemOrder key={index}>
                  <WrapperStatus>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order?.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                    </div>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán: </span>
                    
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order?.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '14px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}<sup>đ</sup></span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                    <ButtonComponent
                        onClick={() => handleOpenModal(order)}
                        size="large"
                        style={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px',color: '#9255FD', fontSize: '14px'
                        }}
                        textButton='Hủy đơn hàng' 
                        
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?.id)}
                        size="large"
                        style={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px',color: '#9255FD', fontSize: '14px'
                        }}
                        textButton='Xem chi tiết' 
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>)
          : (
            <div>Bạn chưa có đơn hàng nào.</div>
          )}
        
        </div>
      </WrapperContainer>
      </Loading>
      <ModalComponent  title="Hủy đơn hàng" open={isModalOpen} onCancel={()=>setIsModalOpen(false)}
            onOk={() => handleCanceOrder(selectedOrder)}>
                <div style={{margin:'15px', fontWeight:"500"}}>Lý do bạn hủy đơn hàng?</div>
                <Radio.Group onChange={onChange} value={value} style={{margin:" 0 15px"}}>
                <Space direction="vertical">
                <Radio value={1}>Thay đổi địa chỉ giao hàng</Radio>
                <Radio value={2}>Thay đổi phương thức thanh toán</Radio>
                <Radio value={3}>Bạn muốn mua sản phẩm khác</Radio>
                </Space>
                </Radio.Group>
            </ModalComponent>
        </>
    )
}
export default MyOrder;