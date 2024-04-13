import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { resetSearch } from "../../redux/slices/productSlide";
const TypeProduct=({name})=>{
   const navigate=useNavigate();
   const dispatch=useDispatch();
   const handleNavigateType=(type)=>{
      navigate(`/products/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
      dispatch(resetSearch());
   }
   return(
    <div style={{padding:'0 10px', cursor:'pointer'}} onClick={()=>handleNavigateType(name)}>
     {name}
    </div>
   )
}
export default TypeProduct