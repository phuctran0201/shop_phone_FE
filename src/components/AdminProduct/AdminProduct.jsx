import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import * as ProductService from "../../service/ProductService";
import * as UserService from "../../service/UserSevice";
import { useMutationHooks } from '../../hooks/useMutationHooks';
import * as message from "../../components/Message/Message";
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import {
    PlusOutlined,UploadOutlined,DeleteOutlined,EditOutlined
  } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, isJsonString } from "../../Ultis";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";



const AdminProduct =()=>{
    const initialState = {
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        sold: '',
        discount: ''
    };
    const [stateProduct, setStateProduct] = useState(initialState);
    const [stateProductDetails, setStateProductDetails] = useState(initialState)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [rowSelected, setRowSelected] = useState("");
    const [form] = Form.useForm();
    const [formDrawer] = Form.useForm();
   

    const mutation = useMutationHooks(
        async (data) => {
          const { name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,discount,sold, accessToken } = data
          const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount,sold
          },accessToken)
          return res
          
        }
        
      )
      const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, accessToken, ...rests } = data;
            try {
                const response = await ProductService.updateProduct(accessToken, { id, ...rests });
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
          const res = ProductService.deleteProduct(
            accessToken,
            id)
          return res
        },
      )
    
      const getAllProducts= async()=>{
        setIsLoading(true)
        const res=await ProductService.getAllProduct();
        return res;
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

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const { data: products } = queryProduct

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        sold: '',
        discount: ''
        })
        form.resetFields()
    };

    const handleCloseDrawer=()=>{
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            sold: '',
            discount: ''
            })
            form.resetFields()
    }
    
    const onFinish = async () => {
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
                
                const response = await mutation.mutateAsync({ ...stateProduct, accessToken:storageData }
                    , {
                        onSettled: () => {
                          queryProduct.refetch()
                        }
                      });
                if(response.statusCode==="OK"){
                    message.success();
                    handleCancel()
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
    };
    
    const handleInputChange = (e, name) => {
        const value = e.target ? e.target.value : e; 
        setStateProduct({ ...stateProduct, [name]: value });
    };
    const handleInputChangeDetails = (e, name) => {
        const value = e.target ? e.target.value : e; 
        setStateProductDetails({ ...stateProductDetails, [name]: value });
    };
    const handleOnchangeImg = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateProduct({ ...stateProduct, image:file.preview });
        
    }
    const handleOnchangeImgDetails = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setStateProductDetails({ ...stateProductDetails, image:file.preview });
        
    }
    const fetchGetDetailsProduct= async ()=>{
        const res=await ProductService.getDetailsProduct(rowSelected);
        if (res?.body) {
            setStateProductDetails({
              name: res?.body.name,
              price: res?.body.price,
              description: res?.body.description,
              rating: res?.body.rating,
              image: res?.body.image,
              type: res?.body.type,
              countInStock: res?.body.countInStock,
              discount: res?.body.discount,
              sold:res?.body.sold
            })
          }
          
    }

    const onUpdateProduct=async ()=>{
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
               
                const response = await mutationUpdate.mutateAsync({id:rowSelected, accessToken:storageData, ...stateProductDetails }, {
                    onSettled: () => {
                      queryProduct.refetch()
                    }
                  });
                if(response.statusCode==="OK"){
                    message.success();
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
    
    const handleDeleteProduct=async()=>{
        try {
            let storageData = localStorage.getItem('accessToken');
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
               
                const response = await mutationDeleted.mutateAsync({id:rowSelected, accessToken:storageData }, {
                    onSettled: () => {
                      queryProduct.refetch()
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

    useEffect(() => {
        if (rowSelected) {
        setIsLoadingUpdate(true);
        fetchGetDetailsProduct(rowSelected)
        }
      }, [rowSelected])

      useEffect(() => {
        if(!isModalOpen) {
          formDrawer.setFieldsValue(stateProductDetails)
        }else {
            formDrawer.setFieldsValue(initialState)
        }
      }, [formDrawer, stateProductDetails, isModalOpen])
      
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
    
      const dataTable = products?.body.data?.length && products?.body.data?.map((product) => {
        return { ...product, key: product.id }
      })
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          render: renderAction,
        },
      ];
    return(
        <div>
           <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
           <div style={{paddingTop:'10px'}}>
           <Button onClick={showModal} style={{width:'100px',height:'100px'}}><PlusOutlined style={{fontSize:'35px'}}  /></Button>
           </div>
           <div style={{marginTop:"10px"}}>
           <LoadingComponent isLoading={isLoading}>
           <TableComponent products={products?.body.data}  renderAction={renderAction} columns={columns} data={dataTable}  onRow={(record, rowIndex) => {
                return {
                onClick: (event) => {
                    setRowSelected(record.id);
                }
                };
            }}></TableComponent>
           </LoadingComponent>
           </div>

           <ModalComponent footer={false} title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel}>
           <Form
                form={form} 
                name="createProduct"
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
                   <InputComponent value={stateProduct.name} onChange={(e) => handleInputChange(e, 'name')} />

                    </Form.Item>

                    

                    <Form.Item
                    label="type"
                    name="type"
                    rules={[
                        {
                        required: true,
                        message: 'Please input type!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.type} onChange={(e) => handleInputChange(e, 'type')} />
                    </Form.Item>
                    <Form.Item
                    label="price"
                    name="price"
                    rules={[
                        {
                        required: true,
                        message: 'Please input price!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.price} onChange={(e) => handleInputChange(e, 'price')}/>
                    </Form.Item>
                    <Form.Item
                    label="countInStock"
                    name="countInStock"
                    rules={[
                        {
                        required: true,
                        message: 'Please input countInStock!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.countInStock} onChange={(e) => handleInputChange(e, 'countInStock')}/>
                    </Form.Item>
                    <Form.Item
                    label="rating"
                    name="rating"
                    rules={[
                        {
                        required: true,
                        message: 'Please input rating!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.rating} onChange={(e) => handleInputChange(e, 'rating')} />
                    </Form.Item>
                    <Form.Item
                    label="description"
                    name="description"
                    rules={[
                        {
                        required: true,
                        message: 'Please input description!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.description} onChange={(e) => handleInputChange(e, 'description')}/>
                    </Form.Item>
                    <Form.Item
                    label="discount"
                    name="discount"
                    rules={[
                        {
                        required: true,
                        message: 'Please input discount!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.discount} onChange={(e) => handleInputChange(e, 'discount')} />
                    </Form.Item>
                    <Form.Item
                    label="sold"
                    name="sold"
                    rules={[
                        {
                        required: true,
                        message: 'Please input sold!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProduct.sold} onChange={(e) => handleInputChange(e, 'sold')}/>
                    </Form.Item>

                    <Form.Item 
                    label="image"
                    name="image"
                    rules={[
                        {
                        required: true,
                        message: 'Please input image!',
                        },
                    ]}
                    >

                    <WrapperUploadFile onChange={handleOnchangeImg} maxCount={1} fileList={stateProduct.image ? [{ uid: '-1', name: 'image.png', status: 'done', url: stateProduct.image }] : []}>
                        <Button style={{marginTop:'10px'}}  icon={<UploadOutlined />}>Click to Upload</Button>
                    <div>  {stateProduct?.image && (
                    <img src={stateProduct?.image} style={{height:'60px'
                                                    ,width:'60px'
                                                    ,borderRadius:'50%'
                                                    ,objectFit:'cover'
                                                    ,border:"1px solid #ccc"
                                                    ,marginLeft:"10px"
                                }} alt="avatar"/>
                    )}</div>
                      
                    </WrapperUploadFile>
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
            
               {/* update product */}

            <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width="45%">
            <LoadingComponent isLoading={isLoadingUpdate}>
            <Form
                form={formDrawer} // Pass the form instance here
                name="updateProduct"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onUpdateProduct}
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
                   <InputComponent value={stateProductDetails.name} onChange={(e) => handleInputChangeDetails(e, 'name')} />

                    </Form.Item>

                    

                    <Form.Item
                    label="type"
                    name="type"
                    rules={[
                        {
                        required: true,
                        message: 'Please input type!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.type} onChange={(e) => handleInputChangeDetails(e, 'type')} />
                    </Form.Item>
                    <Form.Item
                    label="price"
                    name="price"
                    rules={[
                        {
                        required: true,
                        message: 'Please input price!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.price} onChange={(e) => handleInputChangeDetails(e, 'price')}/>
                    </Form.Item>
                    <Form.Item
                    label="countInStock"
                    name="countInStock"
                    rules={[
                        {
                        required: true,
                        message: 'Please input countInStock!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.countInStock} onChange={(e) => handleInputChangeDetails(e, 'countInStock')}/>
                    </Form.Item>
                    <Form.Item
                    label="rating"
                    name="rating"
                    rules={[
                        {
                        required: true,
                        message: 'Please input rating!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.rating} onChange={(e) => handleInputChangeDetails(e, 'rating')} />
                    </Form.Item>
                    <Form.Item
                    label="description"
                    name="description"
                    rules={[
                        {
                        required: true,
                        message: 'Please input description!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.description} onChange={(e) => handleInputChangeDetails(e, 'description')}/>
                    </Form.Item>
                    <Form.Item
                    label="discount"
                    name="discount"
                    rules={[
                        {
                        required: true,
                        message: 'Please input discount!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.discount} onChange={(e) => handleInputChangeDetails(e, 'discount')} />
                    </Form.Item>
                    <Form.Item
                    label="sold"
                    name="sold"
                    rules={[
                        {
                        required: true,
                        message: 'Please input sold!',
                        },
                    ]}
                    >
                    <InputComponent  value={stateProductDetails.sold} onChange={(e) => handleInputChangeDetails(e, 'sold')}/>
                    </Form.Item>

                    <Form.Item 
                    label="image"
                    name="image"
                    rules={[
                        {
                        required: true,
                        message: 'Please input image!',
                        },
                    ]}
                    >
                    <WrapperUploadFile onChange={handleOnchangeImgDetails} maxCount={1} fileList={stateProductDetails.image ? [{ uid: '-1', name: 'image.png', status: 'done', url: stateProductDetails.image }] : []}>
                        <Button style={{marginTop:'10px'}}  icon={<UploadOutlined />}>Click to Upload</Button>
                    <div>  {stateProductDetails?.image && (
                    <img src={stateProductDetails?.image} style={{height:'60px'
                                                    ,width:'60px'
                                                    ,borderRadius:'50%'
                                                    ,objectFit:'cover'
                                                    ,border:"1px solid #ccc"
                                                    ,marginLeft:"10px"
                                }} alt="avatar"/>
                    )}</div>
                      
                    </WrapperUploadFile>
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
            onOk={handleDeleteProduct}>
                <div>Bạn có chắc muốn xóa sản phẩm <strong>{stateProductDetails.name}</strong> không?</div>
            </ModalComponent>
        </div>
    )
}
export default AdminProduct