import { Divider, Dropdown, Radio, Space, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import {
 
} from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";

   
const TableComponent =(props)=>{
    const {selectionType='checkbox', data:dataSource = [], columns = [],handleDeleteMany}=props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const newColumnExport = useMemo(() => {
    
    const arr = columns?.filter((col) => col.dataIndex !== 'Action')
    return arr
  }, [columns])
      
      // rowSelection object indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      
      const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
      }
      const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet("test")
          .addColumns(newColumnExport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs("Excel.xlsx");
      };
    return(
        <div>
       
       {!!rowSelectedKeys.length && (
        <div style={{
          background: '#D70018',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          cursor: 'pointer'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
     <ButtonComponent onClick={exportExcel} textButton="Export Excel"></ButtonComponent>
        <Table id="table-xls"
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