import axios from "axios";
import { axiosJWT } from "./UserSevice";


export const getAllProduct= async ()=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/products`)
    return res.data;
    }
export const createProduct= async (data,accessToken)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/products`,data
    , 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
    }
export const getDetailsProduct= async (id)=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/products/detail/${id}`)
    return res.data;
    }

export const updateProduct= async (accessToken,data)=>{
    const res= await axiosJWT.put(`${process.env.REACT_APP_API_URL}/products`,data
    , 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
    }
export const deleteProduct= async (accessToken,id)=>{
    const res= await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/products/${id}`,
    
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
    }