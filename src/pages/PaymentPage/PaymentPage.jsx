import React, { useEffect, useMemo, useState } from "react";
import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style";
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
import * as PaymentService from '../../service/PaymentService';
import { PayPalButton } from "react-paypal-button-v2";
import {
    DeleteOutlined,MinusOutlined,PlusOutlined,
  } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { convertPrice, isJsonString } from "../../Ultis";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateUser } from "../../redux/slices/userSlide";
import { useNavigate } from "react-router";

const PaymentPage = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
};
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user);
    const [sdkReady , setSdkReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState(initialState);
    const [payment, setPayment] = useState('later_money');
    const [delivery, setDelivery] = useState('fast')
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    
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

  
    const handlePayment = (e) => {
        setPayment(e.target.value)
        
      }
   
      const handleDilivery = (e) => {
        setDelivery(e.target.value)
       
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
    
    
    const priceMemo = useMemo(() => {
      const result = order?.orderItemsSlected?.reduce((total, cur) => {
        return Math.round(total + ((cur.price * cur.amount)))
      },0)
      return result
    },[order])

    const priceDiscountMemo = useMemo(() => {
      const result = order?.orderItemsSlected?.reduce((total, cur) => {
        const totalDiscount = cur.discount ? cur.discount : 0;
        return Math.round(total + (cur.price * (totalDiscount  * cur.amount) / 100))
      },0)
      if(Number(result)){
        return result
      }
      return 0
    },[order]);
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
        return Math.round( Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo))
      },[priceMemo,priceDiscountMemo, diliveryPriceMemo])
      

      const handleAddOrder =async ()=>{
        try {
          let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
             setIsLoading(true)
             if( order?.orderItemsSlected && user?.name
              && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
                const response = await mutationCreateOrder.mutateAsync({ accessToken:storageData,  orderItems: order?.orderItemsSlected, 
                  shippingAddress:{
                    fullName: user?.name,
                    address:user?.address, 
                    phone:user?.phone,
                    city: user?.city,
                  },
                  paymentMethod: payment,
                  itemsPrice: priceMemo,
                  shippingPrice: diliveryPriceMemo,
                  totalPrice: totalPriceMemo,
                  user: user?.id,
                  email: user?.email })
                  
                if(response.statusCode==="OK"){
                    message.success("Đặt hàng thành công");
                    const arrayOrdered = []
                    order?.orderItemsSlected?.forEach(element => {
                      arrayOrdered.push(element.product)
                    });
                    setIsLoading(true)
                    dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
                    
                      navigate('/orderSuccess', {
                        state: {
                          delivery,
                          payment,
                          orders: order?.orderItemsSlected,
                          totalPriceMemo: totalPriceMemo
                        }
                      })
                
                   
                }
                else{
                    message.error(response.body)
                }
               
              }
             
          } else {
              console.error("Access token not found or invalid.");
          }
      } catch (error) {
          console.error("Error occurred during mutation:", error);
      }
      }

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
  
    const mutationCreateOrder = useMutationHooks(
      async (data) => {
          const {  accessToken, ...rests } = data;
          try {
              const response = await OrderService.createOrder(accessToken, { ...rests });
              return response; 
          } catch (error) {
              throw error; 
          }
      }
      
    )

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

      const addPaypalScript = async () => {
        const data  = await PaymentService.getConfig()
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true;
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      useEffect(() => {
        if(!window.paypal) {
          addPaypalScript()
        }else {
          setSdkReady(true)
        }
      }, [])
      const onSuccessPaypal = async (details, data) => {
        try {
          let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
             setIsLoading(true)
             if( order?.orderItemsSlected && user?.name
              && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
                const response = await mutationCreateOrder.mutateAsync({ accessToken:storageData,  orderItems: order?.orderItemsSlected, 
                  shippingAddress:{
                    fullName: user?.name,
                    address:user?.address, 
                    phone:user?.phone,
                    city: user?.city,
                  },
                  paymentMethod: payment,
                  itemsPrice: priceMemo,
                  shippingPrice: diliveryPriceMemo,
                  totalPrice: totalPriceMemo,
                  user: user?.id,
                  isPaid :true,
                  paidAt: details.update_time, 
                  email: user?.email })
                  
                if(response.statusCode==="OK"){
                    message.success("Đặt hàng thành công");
                    const arrayOrdered = []
                    order?.orderItemsSlected?.forEach(element => {
                      arrayOrdered.push(element.product)
                    });
                    setIsLoading(true)
                    dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
                    
                      navigate('/orderSuccess', {
                        state: {
                          delivery,
                          payment,
                          orders: order?.orderItemsSlected,
                          totalPriceMemo: totalPriceMemo
                        }
                      })
                 
                   
                }
                else{
                    message.error(response.body)
                }
               
              }
             
          } else {
              console.error("Access token not found or invalid.");
          }
      } catch (error) {
          console.error("Error occurred during mutation:", error);
      }
      }
    
    return (
      <>
      <LoadingComponent isLoading={isLoading}>
    <div style={{ background: '#f5f5fa', maxWidth: '100%', height: '100vh' }}>
            <div style={{ height: '100%', maxWidth: '100%', margin: '0 auto' }}>
                <h3 style={{padding:"0 10px "}}>Chọn phương thức thanh toán</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap:'70px'}}>
                    <WrapperLeft>
                    <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}> 
                    <Radio  value="fast"><span style={{color: '#ea8500', fontWeight: 'bold'}}>FAST</span> Giao hàng tiết kiệm</Radio>
                    <Radio  value="gojek"><span style={{color: '#ea8500', fontWeight: 'bold'}}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}> 
                    <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
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
                       <div style={{width:"100%", display:"flex", justifyContent:"center", marginLeft:"45px"}}>
                       {payment === 'paypal' && sdkReady ? (
                <div style={{width: '320px'}}>
                  <PayPalButton 
                    amount={Math.round(totalPriceMemo / 30000)}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert('Error')
                    }}
                  />
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size="large"
                  style={{width:'320px'}}
                  textButton='Đặt hàng'
                 
              ></ButtonComponent>
              )}
                       </div>
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
export default PaymentPage