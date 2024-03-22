import React from "react";
import TypeProduct from "../../components/TypeProducts/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import  slider1  from "../../assets/images/Slider1.webp";
import  slider2  from "../../assets/images/Slider2.webp";
import  slider3 from "../../assets/images/Slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";



const HomePage = () => {
    const arr=['Điện thoại','Máy tính bảng','Phụ kiện']
    return (
      <>
        <div style={{padding:'0 120px'}}>
           <WrapperTypeProduct>
           {arr.map((item)=>{
                return <TypeProduct name={item} key={item}/>
                
            })}
            </WrapperTypeProduct> 
            </div>
            <div id="container" style={{backgroundColor:"#efefef", padding:"0 120px",height:'1000px'}}>
            <SliderComponent arrImg={[slider1,slider2,slider3]}/>
            <WrapperProducts>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </WrapperProducts>
            <div style={{width:"100%",display:'flex',justifyContent:'center',marginTop:'10px'}}>
            <WrapperButtonMore textButton='Xem thêm' 
            style={{border:'1px solid #D70018, ',
                    width:'240px',
                    height:'38px',
                    borderRadius:'4px',
                    fontWeight: '500'}}
                    />
            </div>
            </div>
           
            Home
          
      
      </>
    );
};

export default HomePage;
