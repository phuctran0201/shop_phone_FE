import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Select, Space } from "antd";

  import {
    PlusOutlined,UploadOutlined,DeleteOutlined,EditOutlined,SearchOutlined
  } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { getBase64, isJsonString } from "../../Ultis";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import * as UserService from "../../service/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlide";
const AdminUser =()=>{
    const initialState = {
        name: '',
        email: '',
        password: '',
        userAuth: '',
        phone: '',
        address: '',
        avatar: '',
        city: '',
    };
    const [stateUser, setStateUser] = useState(initialState);
    const [stateUserDetails, setStateUserDetails] = useState(initialState)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [form] = Form.useForm();
    const [formDrawer] = Form.useForm();
    const [searchText, setSearchText] = useState('');
     const [searchedColumn, setSearchedColumn] = useState('');
     const searchInput = useRef(null);
     const dispatch = useDispatch();

    const mutation = useMutationHooks(
        async (data) => {
          const {  name,
          email,
          password,
          userAuth,
          phone,
          address,
          avatar,
          city, accessToken } = data
          const res = UserService.createUser({
            name,
            email,
          password,
          userAuth,
          phone,
          address,
          avatar,
          city
          },accessToken)
          return res
          
        }
        
      )
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
      const mutationDeleted = useMutationHooks(
        (data) => {
          const { 
            accessToken,id
          } = data
          const res = UserService.deleteUser(
            accessToken,
            id)
          return res
        },
      )
      const mutationDeletedMany = useMutationHooks(
        (data) => {
          const { 
            accessToken,...ids
          } = data
          const res = UserService.deleteManyUsers(
            accessToken,
            ids)
          return res
        },
      )
      const getAllUsers= async()=>{
        setIsLoading(true)
        let storageData = localStorage.getItem('accessToken');
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
        const res=await UserService.getAllUser(storageData);
        return res;}
      }

    useEffect(() => {//loading time
        let timer;
        
        if (isLoading||isLoadingUpdate) {
          
            timer = setTimeout(() => {
                setIsLoading(false);
                setIsLoadingUpdate(false);
            }, 3000); 
        } else {
            setIsLoading(false);
            setIsLoadingUpdate(false); 
        }
        return () => clearTimeout(timer);
    }, [isLoading,isLoadingUpdate]);

    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
    const { data: users } = queryUser
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser({
          name: '',
          email: '',
          password: '',
          userAuth: '',
          phone: '',
          address: '',
          avatar: '',
          city: ''
        })
        form.resetFields()
    };

    const handleCloseDrawer=()=>{
        setIsOpenDrawer(false);
        setStateUserDetails({
          name: '',
          email: '',
          password: '',
          userAuth: '',
          phone: '',
          address: '',
          avatar: '',
          city: ''
            })
            formDrawer.resetFields()
    }
    
    const onFinish = async () => {
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
                
                const response = await mutation.mutateAsync({ ...stateUser, accessToken:storageData }
                    , {
                        onSettled: () => {
                          queryUser.refetch()
                        }
                      });
                if(response.statusCode==="OK"){
                    message.success();
                    handleCancel()
                }
                else{
                    message.error(response.body.message)
                }
               console.log(response);
            } else {
                console.error("Access token not found or invalid.");
            }
        } catch (error) {
            console.error("Error occurred during mutation:", error);
        }
    };
    
    const handleInputChange = (e, name) => {
        const value = e.target ? e.target.value : e; 
        setStateUser({ ...stateUser, [name]: value });
    };
    const handleInputChangeDetails = (e, name) => {
        const value = e.target ? e.target.value : e; 
        setStateUserDetails({ ...stateUserDetails, [name]: value });
    };
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateUser({ ...stateUser, avatar:file.preview });
        
    }
    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateUserDetails({ ...stateUserDetails, avatar:file.preview });
        
    }
    const fetchGetDetailsProduct= async ()=>{
      let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
        const res=await UserService.getDetailsUser(rowSelected,storageData);
        console.log(res);
        if (res?.body) {
            setStateUserDetails({
              name:  res?.body.name,
              email:  res?.body.email,
              userAuth:  res?.body.userAuth,
              phone:  res?.body.phone,
              address:  res?.body.address,
              avatar:  res?.body.avatar,
              city:  res?.body.city,
            })
          }
        }
    }

    const onUpdateUser=async ()=>{
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
             
                const response = await mutationUpdate.mutateAsync({id:rowSelected, accessToken:storageData, ...stateUserDetails }, {
                    onSettled: () => {
                      queryUser.refetch()
                    }
                  });
                if(response.statusCode==="OK"){
                    message.success();
                    dispatch(updateUser({stateUserDetails}));
                    handleCloseDrawer();
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
    
    const handleDeleteUser=async()=>{
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
               
                const response = await mutationDeleted.mutateAsync({id:rowSelected, accessToken:storageData }, {
                    onSettled: () => {
                      queryUser.refetch()
                    }
                  });
                if(response.statusCode==="OK"){
                    message.success();
                   setIsModalOpenDelete(false);
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
    const handleDeleteManyUser=async(ids)=>{
      try {
          let storageData = localStorage.getItem('accessToken');
          if (storageData && isJsonString(storageData)) {
              storageData = JSON.parse(storageData);
             
              const response = await mutationDeletedMany.mutateAsync({ids:ids, accessToken:storageData }, {
                  onSettled: () => {
                    queryUser.refetch()
                  }
                });
              if(response.statusCode==="OK"){
                  message.success();
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
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
        setIsLoadingUpdate(true);
        fetchGetDetailsProduct(rowSelected)
        }
      }, [rowSelected,isOpenDrawer])

      useEffect(() => {
        if(!isModalOpen) {
          formDrawer.setFieldsValue(stateUserDetails)
        }else {
            formDrawer.setFieldsValue(initialState)
        }
      }, [formDrawer, stateUserDetails, isModalOpen])
      
    const handleDetailsProduct=()=>{
       console.log(rowSelected);
        setIsOpenDrawer(true);
      }
    const renderAction=()=>{
        return(
          <div>
            <DeleteOutlined style={{color:'red',fontSize:"25px",padding:"6px",cursor:'pointer'}} onClick={()=>setIsModalOpenDelete(true)} />
            <EditOutlined style={{color:'orange',fontSize:"25px",padding:"6px",cursor:'pointer'}} onClick={handleDetailsProduct}/>
          </div>
        )
      }
    
      const dataTable = users?.length && users?.map((user) => {
        return { ...user, key: user.id }
      })

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e ? [e] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
            
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
      });

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
          sorter:(a,b)=> a.name.length - b.name.length,
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter:(a,b)=> a.email.length - b.email.length,
          ...getColumnSearchProps('email'),
        },
        {
          title: 'Role',
          dataIndex: 'userAuth',
          filters: [
            {
              text: 'ADMIN',
              value: 'ADMIN',
            },
            {
              text: 'USER',
              value: 'USER',
            },
           
          ],
          filterSearch: true,
          onFilter: (value, record) => {
            if(value==="ADMIN"){
                return record.userAuth==="ADMIN";
            }else if (value==="USER") {
              return record.userAuth==="USER";
            }
            
          }
        
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          render: renderAction,
        },
      ];
      const handleChange = (value) => {
        setStateUser({ ...stateUser, userAuth:value });
      };
      const handleChangeDetails = (value) => {
        setStateUserDetails({ ...stateUserDetails, userAuth:value });
      };
      
    return(
        <div>
           <WrapperHeader>Quản lý người dùng</WrapperHeader>
           <div style={{paddingTop:'10px'}}>
           <Button  onClick={showModal} style={{width:'100px',height:'100px'}}><PlusOutlined style={{fontSize:'35px'}} /></Button>
           </div>
           <LoadingComponent isLoading={isLoading}>
           <div style={{marginTop:"10px"}}>
           <TableComponent users={users?.data} handleDeleteMany={handleDeleteManyUser} renderAction={renderAction} columns={columns} data={dataTable}  onRow={(record, rowIndex) => {
                return {
                onClick: (event) => {
                    setRowSelected(record.id);
                }
                };
            }}></TableComponent>
           </div>
           </LoadingComponent>
           <ModalComponent forceRender  footer={false} title="Tạo tài khoản" open={isModalOpen} onCancel={handleCancel}>
           <Form
                form={form} 
                name="createUser"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                    <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input Name!',
                        },
                    ]}
                    >
                   <InputComponent value={stateUser.name} onChange={(e) => handleInputChange(e, 'name')} />

                    </Form.Item>

                    

                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input email!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUser.type} onChange={(e) => handleInputChange(e, 'email')} />
                    </Form.Item>
                    <Form.Item
                    label="password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input password!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUser.password} onChange={(e) => handleInputChange(e, 'password')}/>
                    </Form.Item>
                    <Form.Item
                    label="phone"
                    name="phone"
                    rules={[
                        {
                        required: false,
                        message: 'Please input phone!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUser.phone} onChange={(e) => handleInputChange(e, 'phone')}/>
                    </Form.Item>
                    <Form.Item
                    label="address"
                    name="address"
                    rules={[
                        {
                        required: false,
                        message: 'Please input address!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUser.address} onChange={(e) => handleInputChange(e, 'address')} />
                    </Form.Item>
                    <Form.Item
                    label="city"
                    name="city"
                    rules={[
                        {
                        required: false,
                        message: 'Please input city!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUser.city} onChange={(e) => handleInputChange(e, 'city')}/>
                    </Form.Item>
                   

                    <Form.Item 
                    label="avatar"
                    name="avatar"
                    rules={[
                        {
                        required: false,
                        message: 'Please input avatar!',
                        },
                    ]}
                    >

                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} fileList={stateUser.avatar ? [{ uid: '-1', name: 'avatar.png', status: 'done', url: stateUser.avatar }] : []}>
                        <Button style={{marginTop:'10px'}}  icon={<UploadOutlined />}>Click to Upload</Button>
                    <div>  {stateUser?.avatar && (
                    <img src={stateUser?.avatar} style={{height:'60px'
                                                    ,width:'60px'
                                                    ,borderRadius:'50%'
                                                    ,objectFit:'cover'
                                                    ,border:"1px solid #ccc"
                                                    ,marginLeft:"10px"
                                }} alt="avatar"/>
                    )}</div>
                      
                    </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item label="Role"
                    name="userAuth"
                    rules={[
                        {
                        required: true,
                        message: 'Please input Role!',
                        },
                    ]}>
                    
                <Select
                    style={{
                    width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                    {
                        value: 'ADMIN',
                        label: 'ADMIN',
                    },
                    {
                        value: 'USER',
                        label: 'USER',
                    }
                    ]}
                />
                    </Form.Item>
                    <Form.Item
                    wrapperCol={{
                        offset: 20,
                        span: 4,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            
               {/* update user */}

            <DrawerComponent forceRender title="Chi tiết tài khoản" isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width="45%">
            <LoadingComponent isLoading={isLoadingUpdate}>
            <Form
                form={formDrawer} 
                name="updateUser"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onUpdateUser}
                autoComplete="off"
                
            >
                    <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input Name!',
                        },
                    ]}
                    >
                   <InputComponent value={stateUserDetails.name} onChange={(e) => handleInputChangeDetails(e, 'name')} />

                    </Form.Item>

                    

                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input email!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUserDetails.type} onChange={(e) => handleInputChangeDetails(e, 'email')} />
                    </Form.Item>
                    <Form.Item
                    label="password"
                    name="password"
                    rules={[
                        {
                        required: false,
                        message: 'Please input password!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUserDetails.password} onChange={(e) => handleInputChangeDetails(e, 'password')}/>
                    </Form.Item>
                    <Form.Item
                    label="phone"
                    name="phone"
                    rules={[
                        {
                        required: false,
                        message: 'Please input phone!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUserDetails.phone} onChange={(e) => handleInputChangeDetails(e, 'phone')}/>
                    </Form.Item>
                    <Form.Item
                    label="address"
                    name="address"
                    rules={[
                        {
                        required: false,
                        message: 'Please input address!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUserDetails.address} onChange={(e) => handleInputChangeDetails(e, 'address')} />
                    </Form.Item>
                    <Form.Item
                    label="city"
                    name="city"
                    rules={[
                        {
                        required: false,
                        message: 'Please input city!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateUserDetails.city} onChange={(e) => handleInputChangeDetails(e, 'city')}/>
                    </Form.Item>
                   

                    <Form.Item 
                    label="avatar"
                    name="avatar"
                    rules={[
                        {
                        required: false,
                        message: 'Please input avatar!',
                        },
                    ]}
                    >

                    <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1} fileList={stateUserDetails.avatar ? [{ uid: '-1', name: 'avatar.png', status: 'done', url: stateUserDetails.avatar }] : []}>
                        <Button style={{marginTop:'10px'}}  icon={<UploadOutlined />}>Click to Upload</Button>
                    <div>  {stateUserDetails?.avatar && (
                    <img src={stateUserDetails?.avatar} style={{height:'60px'
                                                    ,width:'60px'
                                                    ,borderRadius:'50%'
                                                    ,objectFit:'cover'
                                                    ,border:"1px solid #ccc"
                                                    ,marginLeft:"10px"
                                }} alt="avatar"/>
                    )}</div>
                      
                    </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item label="Role"
                    name="userAuth"
                    rules={[
                        {
                        required: true,
                        message: 'Please input Role!',
                        },
                    ]}>
                    
                <Select
           
                    style={{
                    width: 120,
                    }}
                    onChange={(e) => handleInputChangeDetails(e, 'userAuth')}
                    options={[
                    {
                        value: 'ADMIN',
                        label: 'ADMIN',
                    },
                    {
                        value: 'USER',
                        label: 'USER',
                    }
                    ]}
                />
                    </Form.Item>
                    <Form.Item
                    wrapperCol={{
                        offset: 20,
                        span: 4,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        Apply
                    </Button>
                    </Form.Item>
                </Form>
                </LoadingComponent>
            </DrawerComponent>
            <ModalComponent  title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={()=>setIsModalOpenDelete(false)}
            onOk={handleDeleteUser}>
                <div>Bạn có chắc muốn xóa sản phẩm <strong>{stateUserDetails.name}</strong> không?</div>
            </ModalComponent>
        </div>
    )
}
export default AdminUser