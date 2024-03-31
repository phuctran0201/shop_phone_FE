import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser= async (data)=>{
const res= await axios.post(`${process.env.REACT_APP_API_URL}/signIn`,data);

return res.data;
}
export const signUpUser= async (data)=>{
    const res= await axios.post(`${process.env.REACT_APP_API_URL}/signUp`,data);
    
    return res.data;
    }

export const getDetailsUser= async (id, accessToken)=>{
    const res= await axiosJWT.get(`${process.env.REACT_APP_API_URL}/users/detail/${id}`
    , {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return res.data;
    }
export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/refreshToken`, {
        withCredentials: true
    })
    return res.data
}

export const logOutUser= async (accessToken)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/signOut`
    , {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return res.data;
    }

export const updateUser= async (accessToken,data)=>{
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/users`,
        data, 
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
export const getAllUser= async (accessToken)=>{
    const res= await axiosJWT.get(`${process.env.REACT_APP_API_URL}/users`
    , {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return res.data;
    }
export const deleteUser= async (accessToken,id)=>{
    const res= await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/users/${id}`,
    
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
export const createUser= async (data,accessToken)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/users`,data
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
export const deleteManyUsers= async (accessToken,data)=>{
    const res= await axiosJWT.post(`${process.env.REACT_APP_API_URL}/users/deleteMany`,data,
    
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