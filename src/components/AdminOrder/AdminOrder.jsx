import { Button, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import * as OrderService from '../../service/OrderService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'
import { convertPrice, isJsonString } from '../../Ultis'
import { WrapperHeader } from './style'

const OrderAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state?.user)

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
  const getAllOrder = async () => {
    let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
              setIsLoading(true)
                const res = await OrderService.getAllOrder(storageData)
                return res.body
                
        }
  }


  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
  const { isLoading: isLoadingOrders, data: orders } = queryOrder

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
    },
  ];

  const dataTable = orders?.length && orders?.map((order) => {

    return { ...order, key: order.id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice)}
  })

  return (
    <div>
        <LoadingComponent isLoading={isLoading}>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{height: 200, width:200}}>
        <PieChartComponent data={orders} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent  columns={columns}  data={dataTable} />
      </div>
      </LoadingComponent>
    </div>
  )
}

export default OrderAdmin