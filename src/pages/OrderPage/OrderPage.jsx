import React, { useEffect, useMemo, useState } from "react";
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from "./style";
import { Checkbox,Form } from "antd";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slices/orderSlide';
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from "../../components/Message/Message";
import * as UserService from '../../service/UserSevice';
import {
    DeleteOutlined,MinusOutlined,PlusOutlined,
  } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { convertPrice, isJsonString } from "../../Ultis";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateUser } from "../../redux/slices/userSlide";
import { useNavigate } from "react-router";
import StepComponent from "../../components/StepComponent/StepComponet";

const OrderPage = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
};
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState(initialState)
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    const mutationUpdate = useMutationHooks(
      async (data) => {
          const { id, accessToken, ...rests } = data;
          try {
              const response = await UserService.updateUser(accessToken, { id, ...rests });
              return response; 
          } catch (error) {
              throw error; 
          }
      }
      
    )

    const onChange = (e) => {
      
      if(listChecked.includes(e.target.value)){
        const newListChecked = listChecked.filter((item) => item !== e.target.value)
        setListChecked(newListChecked)
      }else {
        setListChecked([...listChecked, e.target.value])
      }
    };
  
    const handleInputChangeDetails = (e, name) => {
      const value = e.target ? e.target.value : e; 
      setStateUserDetails({ ...stateUserDetails, [name]: value });
  };
 
    const handleCancel = () => {
      setIsModalOpen(false);
      setStateUserDetails({
        name: '',
        email: '',
        phone: '',
      })
      form.resetFields();
    };

    const handleChangeCount = (type, idProduct,limited) => {
      if(type === 'increase') {
        if(!limited) {
          dispatch(increaseAmount({idProduct}))
        }
      }else {
        if(!limited) {
          dispatch(decreaseAmount({idProduct}))
        }
      }
    }
  
    const handleDeleteOrder = (idProduct) => {
      dispatch(removeOrderProduct({idProduct}))
    }
  
    const handleOnchangeCheckAll = (e) => {
      if(e.target.checked) {
        const newListChecked = []
        order?.orderItems?.forEach((item) => {
          newListChecked.push(item?.product)
        })
        setListChecked(newListChecked)
      }else {
        setListChecked([])
      }
    }
  
    const handleRemoveAllOrder = () => {
      if(listChecked?.length > 1){
        dispatch(removeAllOrderProduct({listChecked}))
      }
    }
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
    useEffect(() => {
      form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
  
    useEffect(() => {
      if(isModalOpen) {
        setStateUserDetails({
          city: user?.city,
          name: user?.name,
          address: user?.address,
          phone: user?.phone
        })
      }
    }, [isModalOpen])
    
    useEffect(() => {
      dispatch(selectedOrder({listChecked}))
    },[listChecked])
    
    const priceMemo = useMemo(() => {
      const result = order?.orderItemsSlected?.reduce((total, cur) => {
        return Math.round(total + ((cur.price * cur.amount)))
      },0)
      return result
    },[order])

    const priceDiscountMemo = useMemo(() => {
      const result = order?.orderItemsSlected?.reduce((total, cur) => {
        const totalDiscount = cur.discount ? cur.discount : 0;
        return Math.round( total + (cur.price * (totalDiscount  * cur.amount) / 100))
      },0)
      if(Number(result)){
        return result
      }
      return 0
    },[order])
    const diliveryPriceMemo = useMemo(() => {
        if(priceMemo >= 20000 && priceMemo < 500000){
          return 10000
        }else if(priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
          return 0
        } else {
          return 20000
        }
      },[priceMemo])

      const totalPriceMemo = useMemo(() => {
        const totalPrice= Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
        return Math.round(totalPrice)
      },[priceMemo,priceDiscountMemo, diliveryPriceMemo])
      
      const handleUpdateInforUser=async ()=>{
        try {
          const {name, address,city, phone} = stateUserDetails
          
          let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
             setIsLoading(true)
              const response = await mutationUpdate.mutateAsync({ id: user?.id, accessToken:storageData, ...stateUserDetails })
              if(response.statusCode==="OK"){
                  message.success();
                  dispatch(updateUser(stateUserDetails)); 
                  setIsModalOpen(false);
              }
              else{
                  message.error(response.body.message)
              }
             
          } else {
              console.error("Access token not found or invalid.");
          }
      } catch (error) {
          console.error("Error occurred during mutation:", error);
      }
      }
      const handleChangeAddress=()=>{
        setIsModalOpen(true);
      }
      const handleAddCard =()=>{
        if(!order?.orderItemsSlected?.length) {
          message.error('Vui lòng chọn sản phẩm')
        }else if(!user?.phone || !user.address || !user.name || !user.city) {
          setIsModalOpen(true);
         
        }else {
          setIsLoading(true)
          setTimeout(() => {
            navigate('/payment');
        }, 3000);
        } 
      }
      const itemsDelivery = [
        {
          title: '20.000 VND',
          description: 'Dưới 200.000 VND',
        },
        {
          title: '10.000 VND',
          description: 'Từ 200.000 VND đến dưới 500.000 VND',
        },
        {
          title: 'Free ship',
          description : 'Trên 500.000 VND',
        },
      ]
    return (
      <>
      <LoadingComponent isLoading={isLoading}>
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>
                <h4>Phí giao hàng</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                    
                      <WrapperStyleHeaderDilivery>
                        <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000 
                          ? 2 : diliveryPriceMemo === 20000 ? 1 
                          : order.orderItemsSlected.length === 0 ? 0:  3}/>
                      </WrapperStyleHeaderDilivery>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll}  checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order,index) => {
                                return (
                                    <WrapperItemOrder key={order?.name} >
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} key={index} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{
                                                width: 260,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}<sup>đ</sup></span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product,order?.amount===1)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product,order?.amount === order.countInstock, order?.amount === 1)}>
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}<sup>đ</sup></span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                );
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                          <WrapperInfo>
                            <div>
                              <span>Địa chỉ: </span>
                              <span style={{color:'#0000FF'}}>
                                {`${user?.address} ${user?.city}`}
                              </span>
                              <span style={{color:'#DC143C', cursor:'pointer',padding:"0 15px "}} onClick={handleChangeAddress}>-Thay đổi-</span>
                            </div>
                          </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}<sup>đ</sup></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}<sup>đ</sup></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Thuế</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 %</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}<sup>đ</sup></span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}<sup>đ</sup></span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonComponent
                            onClick={() => handleAddCard()}
                            size='large'
                            textButton='Mua hàng'
                        ></ButtonComponent>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent title="Cập nhật thông tin giao hàng" open={isModalOpen} onCancel={handleCancel} onOk={handleUpdateInforUser} >
        
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails.name }  onChange={(e) => handleInputChangeDetails(e, 'name')} name="name" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent value={stateUserDetails.city} onChange={(e) => handleInputChangeDetails(e, 'city')} name="city" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={(e) => handleInputChangeDetails(e, 'phone')} name="phone" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={(e) => handleInputChangeDetails(e, 'address')} name="address" />
            </Form.Item>
          </Form>
        
      </ModalComponent>
        </div>
        </LoadingComponent>
        </>
    )
  }
export default OrderPage