import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router";
import * as ProductService from "../../service/ProductService"
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage=()=>{
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const {state}=useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
 

    const fetchProductByType=async (state,page,limit)=>{
      const res =await  ProductService.getProductByType(state,page,limit);
    
      if (res?.statusCode==="OK") {
        setProducts(res?.body.data);
        setPanigate({...panigate, total: res?.body.totalPage});
        setIsLoading(true)
      }
     
    }

    useEffect(() => {
        if(state){
            fetchProductByType(state, panigate.page, panigate.limit)
        }
    }, [state,panigate.page, panigate.limit])

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

    const onChange = (current, pageSize) => {
        setPanigate({...panigate, page: current - 1, limit: pageSize})    
    }
    return(
        <div style={{padding: '10px 120px 0', background: '#efefef', width: '100%', height: 'calc(100vh - 88px)'}}>
            <LoadingComponent isLoading={isLoading}>
            <Row style={{flexWrap:'nowrap', height:'100%'}}>
                <WrapperNavbar span={4} >
                    <NavbarComponent/>
                </WrapperNavbar>
                <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <WrapperProducts >
                    {products?.filter((pro) => {
                                    if(searchDebounce === '') {
                                        return pro
                                    }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product,index) =>{
                        return(
                            <CardComponent key={index} countInStock={product.countInStock} description={product.description} image={product.image}
                    name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} sold={product.sold} id={product.id}/>
                        )
                    })}
                     
                <div style={{textAlign: "center",
                    marginTop: "20px", 
                    position: "fixed",
                    bottom:" 0",
                    left: "0",
                    width:" 100%",
                    zIndex: "1000", 
                    padding:" 10px 0",}}>
                <Pagination showQuickJumper defaultCurrent={1} total={panigate?.total} onChange={onChange}  />
                </div>
                </WrapperProducts>
                </Col>
            </Row>
            
            </LoadingComponent>
        </div>
    )
}
export default TypeProductPage