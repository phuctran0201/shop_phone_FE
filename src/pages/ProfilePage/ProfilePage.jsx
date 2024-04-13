import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperInputProfile, WrapperLable, WrapperUploadFile } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getBase64, isJsonString } from "../../Ultis";
import * as UserService from "../../service/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlide";
import { Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const ProfilePage=()=>{
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const mutation = useMutationHooks(
        async (data) => {
            const { id, accessToken, ...rests } = data;
            try {
                const response = await UserService.updateUser(accessToken, { id, ...rests });
                return response; 
            } catch (error) {
                throw error; 
            }
        }
    );
   
    useEffect(() => {
    let storageData = localStorage.getItem('accessToken');
    if (storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData);
        const decoded = jwtDecode(storageData);
        const id = decoded?.id;
        handleGetDetailsUser(id, storageData);
    }
}, []);

const handleGetDetailsUser=async (id,token)=>{
    const res=await UserService.getDetailsUser(id,token);
    dispatch(updateUser({ ...res?.body,accessToken:token}))
}
console.log(user);
    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
        
    }, [user]);

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }

    const handleOnchangeName = (value) => {    
        setName(value);
    }

    const handleOnchangePhone = (value) => {
        setPhone(value);
    }

    const handleOnchangeAddress = (value) => {
        setAddress(value);
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
         setAvatar(file.preview)
    }

    const handleUpdate = async () => {
            let storageData = localStorage.getItem('accessToken');
            let decoded = {};
            setIsLoading(true);
            if (storageData && isJsonString(storageData)) {
                storageData = JSON.parse(storageData);
                decoded = jwtDecode(storageData);
            const id = decoded?.id;
            console.log(id);
            handleGetDetailsUser(id,storageData);
            if (decoded?.id) {
                try {
                    const response = await mutation.mutateAsync({ id, email, name, phone, address, avatar, accessToken: storageData });
                    if (response.body.status === "OK") {
                        message.success();
                        dispatch(updateUser({ email, name, phone, address, avatar}))
                       
                    } else if (response.body.status === "ERR") {
                        message.error();
                    }
                } catch (error) {
                    console.error(error);   
                }
            }
        }
    };
    
    useEffect(() => {
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

    return(
        
        <div style={{width:'1270px', margin:'0 auto'}}>
            <LoadingComponent isLoading={isLoading}>
            
            <WrapperHeader >
            Thông tin người dùng
            </WrapperHeader>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLable htmlFor="email">Email</WrapperLable>
                    <WrapperInputProfile id="email" value={email} onChange={handleOnchangeEmail} />
                    <ButtonComponent style={{borderColor:"#1E90FF",color:'#1E90FF', fontWeight:'600'}}
                    size='medium'
                    textButton='cập nhật'
                    onClick={handleUpdate}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="name">Username</WrapperLable>
                    <WrapperInputProfile id="name" type="text" value={name} onChange={handleOnchangeName} />
                    <ButtonComponent style={{borderColor:"#1E90FF",color:'#1E90FF', fontWeight:'600'}}
                    size='medium'
                    textButton='cập nhật'
                    onClick={handleUpdate}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="Phone">Phone</WrapperLable>
                    <WrapperInputProfile id="Phone" value={phone} onChange={handleOnchangePhone} />
                    <ButtonComponent style={{borderColor:"#1E90FF",color:'#1E90FF', fontWeight:'600'}}
                    size='medium'
                    textButton='cập nhật'
                    onClick={handleUpdate}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="Address">Address</WrapperLable>
                    <WrapperInputProfile id="Address" value={address} onChange={handleOnchangeAddress} />
                    <ButtonComponent style={{borderColor:"#1E90FF",color:'#1E90FF', fontWeight:'600'}}
                    size='medium'
                    textButton='cập nhật'
                    onClick={handleUpdate}>

                    </ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                    <WrapperLable htmlFor="Avatar">Avatar</WrapperLable>
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} >
                        <Button   icon={<UploadOutlined />}>Click to Upload</Button>
                    </WrapperUploadFile>
                 {avatar && (
                    <img src={avatar} style={{height:'60px',width:'60px',borderRadius:'50%',objectFit:'cover'}} alt="avatar"/>
                 )}
                    <ButtonComponent style={{borderColor:"#1E90FF",color:'#1E90FF', fontWeight:'600'}}
                    size='medium'
                    textButton='cập nhật'
                    onClick={handleUpdate}>

                    </ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
            </LoadingComponent>
        </div>
        
    )
}
export default ProfilePage