import React from "react";
import { UserOutlined } from '@ant-design/icons';
import {
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';

import { Col,Space,Avatar, Badge  } from 'antd';
import { WrapperHeader,WrapperTextHeader,WrapperHeaderAccount,WrapperTextHeaderSmall } from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent=()=>{
    return(
        <div>
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
                <Col span={6} style={{display:'flex',gap:'20px',padding:'0 10px'}}>
                    <WrapperHeaderAccount>
                        <div>
                        <Space wrap size={16}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Space>
                        </div>
                        <div >
                            <WrapperTextHeaderSmall>Đăng kí/Đăng nhập</WrapperTextHeaderSmall>
                            <div>
                            <WrapperTextHeaderSmall>Tài khoản  </WrapperTextHeaderSmall>
                            <CaretDownOutlined />
                            </div>
                            
                        </div>
                    </WrapperHeaderAccount>
                <div>
                <Badge count={4} size="small" >
                < ShoppingCartOutlined style={{ fontSize: '30px',color:'#fff' }}/>
                </Badge>
                <WrapperTextHeaderSmall >Giỏ hàng</WrapperTextHeaderSmall>
                </div>
                </Col>
             </WrapperHeader>
        </div>
    )
}
export default HeaderComponent