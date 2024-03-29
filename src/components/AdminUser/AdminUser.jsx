import React from "react";
import { WrapperHeader } from "./style";
import { Button } from "antd";
import {
    PlusOutlined
  } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
const AdminUser =()=>{
    return(
        <div>
           <WrapperHeader>Quản lý người dùng</WrapperHeader>
           <div style={{paddingTop:'10px'}}>
           <Button style={{width:'100px',height:'100px'}}><PlusOutlined style={{fontSize:'35px'}} /></Button>
           </div>
           <div style={{marginTop:"10px"}}>
           <TableComponent></TableComponent>
           </div>
        </div>
    )
}
export default AdminUser