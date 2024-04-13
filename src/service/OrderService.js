import axios from "axios";
import { axiosJWT } from "./UserSevice";
export const createOrder= async (accessToken,data)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/orders`,data
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
export const getOrderByUserId= async (accessToken,id)=>{
    const res= await axiosJWT.get(`${process.env.REACT_APP_API_URL}/orders/getAllOrder/${id}`, 
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return res.data;
    }

export const cancelOrder= async (accessToken,data)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/orders/cancelOrder`,data
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
    export const getDetailsOrder = async (accessToken,id)=>{
        const res= await axiosJWT.get(`${process.env.REACT_APP_API_URL}/orders/getDetailsOrder/${id}`
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