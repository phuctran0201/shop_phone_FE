import axios from "axios";
import { axiosJWT } from "./UserSevice";


export const getAllProduct = async (search, limit) => {
    try {
        let res = {};
        if (search?.length > 0) {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/products?name=${search}&size=${limit}`);
        } else {
            res = await axios.get(`${process.env.REACT_APP_API_URL}/products?size=${limit}`);
        }
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

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

export const getProductByType= async (type,page,limit)=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/products?type=${type}&page=${page}&size=${limit}`)
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
export const deleteManyProduct= async (accessToken,data)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/products/deleteMany`,data,
    
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
export const getAllTypesProduct= async ()=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/products/getTypeProduct`)
    return res.data;
    }
    