import { Divider, Radio, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,EditOutlined
} from '@ant-design/icons';
   
const TableComponent =(props)=>{
    const {selectionType='checkbox', data:dataSource = [], columns = [],renderAction}=props
   
      
      // rowSelection object indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      
    return(
        <div>
       
       
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
        {...props}
        />
        
      </div>
    )
}
export default TableComponent