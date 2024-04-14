import { Button, Menu } from "antd";
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    UserOutlined
  } from '@ant-design/icons'
import React, { useState } from "react";
import { getItem } from "../../Ultis";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
 
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
  ];

  
const AdminPage =()=>{
    const [keySelected,setKeySelected]=useState('');
    const [collapsed, setCollapsed] = useState(false);

    const renderPage=(key)=>{
        switch(key){
            case "user":
                return(
                    <AdminUser/>
                )
             case "product":
                 return(
                    <AdminProduct/>
                 )
              case "orders":
              return(
                  <AdminOrder/>
              )
            default:
                return <></>
        }
    }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

const handleOnClick=({key})=>{
   setKeySelected(key);
}
    return(
        <div
        style={{
          display:"flex",margin:"20px",
          height: '100vh'
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            background:'#202020'
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu style={{width:'380px'}}
          defaultSelectedKeys={['1']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{width:'100%', padding: '15px 0 15px 15px'}}>
            {renderPage(keySelected)}
        </div>
      </div>
    )
}
export default AdminPage