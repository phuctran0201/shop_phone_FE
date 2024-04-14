import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import {
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';

import { Col,Space,Avatar, Badge, Popover  } from 'antd';
import { WrapperHeader,WrapperTextHeader,WrapperHeaderAccount,WrapperTextHeaderSmall, WrapperTextPopup, WrapperContentPopup } from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import SignInComponent from "../SignInComponent/SignInComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserSevice";
import { isJsonString } from "../../Ultis";
import { jwtDecode } from "jwt-decode";
import { resetUser } from "../../redux/slices/userSlide";
import LoadingComponent from "../LoadingComponent/LoadingComponent"
import { useNavigate } from "react-router";
import { resetSearch, searchProduct } from "../../redux/slices/productSlide";

const HeaderComponent=()=>{
    const navigate=useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user=useSelector((state)=>state.user);
    const order=useSelector((state)=>state.order)
    const dispatch=useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [search,setSearch]=useState("");
    const [userName, setUserName] = useState('')
    const [avatar, setAvatar] = useState("");
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);  
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      setUserName(user?.name) 
      setAvatar(user?.avatar)
    }, [user?.name,user?.avatar]);
    
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
          setIsLoading(true)
          await UserService.logOutUser(storageData);
          localStorage.clear();
          dispatch(resetUser());
          setIsLoading(true);
          navigate("/")
        }
      }
    }
    
   
    const content = (
      <div>
        <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
        {user?.userAuth==="ADMIN" && (
          <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
        )}
        <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
        <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
      </div>
    );
    const handleClickNavigate = (type) => {
      if(type === 'profile') {
        navigate('/profile')
      }else if(type === 'admin') {
        navigate('/admin')
      }else if(type === 'my-order') {
        navigate('/my-order',{ state : {
            id: user?.id   
          }
        })
      }else {
        handleLogOut()
      }
      setIsOpenPopup(false)
    }
  const onSearch=(e)=>{
    setSearch(e);
    dispatch(searchProduct(search));
    
  }
  const handleNavigateToHomePage = () => {
    setSearch("");
    dispatch(resetSearch());
    navigate('/');
    setIsLoading(true)
  };
    return(
        <div >
          <LoadingComponent   isLoading={isLoading}>
           <WrapperHeader>
                <Col span={6}><WrapperTextHeader onClick={handleNavigateToHomePage} style={{cursor:'pointer'}}>TranHuuPhucShop</WrapperTextHeader></Col>
                <Col span={12} >
                    <ButtonInputSearch
                    size="large" 
                    textButton="Tìm kiếm"
                    placeholder="Bạn cần tìm gì ?" 
                     onChange={onSearch} 
                      />
   
                </Col>
                <Col span={6} style={{display:'flex',gap:'54px',padding:'0 10px'}}>
                    <WrapperHeaderAccount>
                        <div>
                        <Space wrap size={16}>
                          {avatar?(
                              <Avatar size="large" src={avatar} alt="avatar"/>
                          ):
                          <Avatar size="large" icon={<UserOutlined />} />
                          }
                            
                        </Space>
                        </div>
                        {user?.name?(
                          <>
                          <Popover content={content} trigger="click" open={isOpenPopup}>
                            <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
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
                <div style={{display:'flex', alignItems:'center'}}>
                <Badge count={order?.orderItems?.length} size="small" >
                < ShoppingCartOutlined style={{ fontSize: '30px',color:'#fff',cursor:'pointer' }} onClick={()=>navigate('/order')} />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                </div>
                </Col>
             </WrapperHeader>
             <SignInComponent visible={isModalOpen} onCancel={handleCancel}></SignInComponent>
             </LoadingComponent>
        </div>
    )
}
export default HeaderComponent