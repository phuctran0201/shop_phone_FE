import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import {
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';

import { Col,Space,Avatar, Badge, Popover  } from 'antd';
import { WrapperHeader,WrapperTextHeader,WrapperHeaderAccount,WrapperTextHeaderSmall, WrapperTextPopup } from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import SignInComponent from "../SignInComponent/SignInComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserSevice";
import { isJsonString } from "../../Ultis";
import { jwtDecode } from "jwt-decode";
import { resetUser } from "../../redux/slices/userSlide";
import LoadingComponent from "../LoadingComponent/LoadingComponent"

const HeaderComponent=()=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const user=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);  
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {//loading
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

    const handleLogOut=async ()=>{
      
      let storageData = localStorage.getItem('accessToken');
      let decoded = {};
      if (storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData);
        decoded = jwtDecode(storageData);
        if(decoded?.id){
          await UserService.logOutUser(storageData);
          localStorage.clear();
          dispatch(resetUser());
          setIsLoading(true);
        }
      }
    }
    
    const content = (
      <div>
        <WrapperTextPopup onClick={handleLogOut}>Đăng xuất</WrapperTextPopup>
        <WrapperTextPopup>Thông tin người dùng</WrapperTextPopup>
      </div>
    );
    return(
        <div >
          <LoadingComponent   isLoading={isLoading}>
           <WrapperHeader>
                <Col span={6}><WrapperTextHeader>TranHuuPhucShop</WrapperTextHeader></Col>
                <Col span={12} >
                    <ButtonInputSearch
                    size="large" 
                    textButton="Tìm kiếm"
                    placeholder="Bạn cần tìm gì ?" 
                    //  onSearch={onSearch} 
                     enterButton />
   
                </Col>
                <Col span={6} style={{display:'flex',gap:'54px',padding:'0 10px'}}>
                    <WrapperHeaderAccount>
                        <div>
                        <Space wrap size={16}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Space>
                        </div>
                        {user?.name?(
                          <>
                           <Popover content={content}  trigger="click">
                           <div style={{cursor:'pointer'}}>{user.name}</div>
                          </Popover>
                          </>
                       
                        
                        ):(
                          <div style={{cursor:'pointer'}}>
                          <WrapperTextHeaderSmall>Đăng kí/Đăng nhập</WrapperTextHeaderSmall>
                          <div onClick={showModal}>
                          <WrapperTextHeaderSmall  >Tài khoản </WrapperTextHeaderSmall>
                          <CaretDownOutlined />
                          </div>
                          
                      </div>
                        )}
                    </WrapperHeaderAccount>
                <div>
                <Badge count={4} size="small" >
                < ShoppingCartOutlined style={{ fontSize: '30px',color:'#fff' }}/>
                </Badge>
                <WrapperTextHeaderSmall >Giỏ hàng</WrapperTextHeaderSmall>
                </div>
                </Col>
             </WrapperHeader>
             <SignInComponent visible={isModalOpen} onCancel={handleCancel}></SignInComponent>
             </LoadingComponent>
        </div>
    )
}
export default HeaderComponent