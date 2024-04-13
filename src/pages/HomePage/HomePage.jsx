import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProducts/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import  slider1  from "../../assets/images/Slider1.webp";
import  slider2  from "../../assets/images/Slider2.webp";
import  slider3 from "../../assets/images/Slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../service/ProductService"
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const HomePage = () => {
  const searchProduct=useSelector((state)=>state?.product?.search);
  const refSearch=useRef();
  const [limit, setLimit] = useState(5)
  const searchDebounce=useDebounce(searchProduct,500);
  const [typeProduct,setTypeProduct]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchAllTypeProduct=async ()=>{
    const res=await ProductService.getAllTypesProduct();
    if (res?.statusCode==="OK") {
      setTypeProduct(res?.body);
      
    }
   
  }

  useEffect(()=>{
    fetchAllTypeProduct();
   
  },[])

    const fetchProductAll = async (context) => {
      try {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        
        const res = await ProductService.getAllProduct(search, limit);
       
        return res;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
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
   
    const { data: products, isPreviousData } = useQuery({
      queryKey: ['products',limit, searchProduct],
      queryFn: fetchProductAll,
      keepPreviousData: true
      // retry: 3,
      // retryDelay: 100000000000
    });

    return (
      <>
       <LoadingComponent isLoading={isLoading}>
        <div style={{padding:'0 120px'}}>
            
           <WrapperTypeProduct >
           {typeProduct.map((item)=>{
                return <TypeProduct name={item} key={item}/> 
            })}
            </WrapperTypeProduct> 
            
            </div>
            <div id="container" style={{backgroundColor:"#efefef", padding:"0 120px",height:'100%'}}>
            <SliderComponent arrImg={[slider1,slider2,slider3]}/>
            <WrapperProducts>
              {
                products?.body.data.map((product,index)=>{
                  return(
                    <CardComponent key={index} countInStock={product.countInStock} description={product.description} image={product.image}
                    name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} sold={product.sold} id={product.id}
                    />
                  )
                })
              }
                
                
            </WrapperProducts>
            <div style={{width:"100%",display:'flex',justifyContent:'center',marginTop:'10px'}}>
            <WrapperButtonMore textButton='Xem thêm'   onClick={() => {
                setIsLoading(true); 
                setLimit((prev) => prev + 5)
              }}
              disabled={products?.body.totalCount==products?.body.data?.length||products?.body.totalPage==1}
            style={{border:'1px solid #D70018, ',
                    width:'240px',
                    height:'38px',
                    borderRadius:'4px',
                    fontWeight: '500',color: products?.body.totalCount === products?.body.data?.length && '#fff'}}
                    />
            </div>
            
            </div>
           
            </LoadingComponent>
          
      
      </>
    );
};

export default HomePage;
