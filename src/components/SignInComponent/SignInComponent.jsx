import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { MailOutlined, LockOutlined, FacebookOutlined, TwitterOutlined, TikTokOutlined, GithubOutlined, UnlockOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { WrapperModalSignIn, WrapperSiginIcon, WrapperSiginIconInput, WrapperSiginInput, WrapperSiginInputItem, WrapperSiginLeft, WrapperSiginRight } from './style';
import SignUpComponent from '../SignUpComponent/SignUpComponent';
import * as UserService from "../../service/UserSevice";
import { useMutationHooks } from '../../hooks/useMutationHooks';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import * as message from "../../components/Message/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlide';

const SignInComponent = ({ visible, onCancel }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch=useDispatch();

    const mutation = useMutationHooks(data => UserService.loginUser(data));
    const {  data,isError,isSuccess } = mutation;
    
    useEffect(()=>{     //message
        if(data?.statusCode === 'OK'){
            message.success();
            handleModalClose();
            localStorage.setItem('accessToken',JSON.stringify(data?.body.accessToken))
            if(data?.body.accessToken){
                const decoded = jwtDecode(data?.body.accessToken);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id,data?.body.accessToken)
                }
            }
        }
        else if(data?.body.status === 'ERR'){
            message.error();
        }
    },[isError,isSuccess])
    
    const handleGetDetailsUser=async (id,token)=>{
        const res=await UserService.getDetailsUser(id,token);
        dispatch(updateUser({ ...res?.body,accessToken:token}))
    
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }

    const handleOnchangePassword = (value) => {
        setPassword(value);
    }

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

    const handleSignIn = () => {
        setIsLoading(true);
        mutation.mutate({
            email,
            password
        });
    }

    const showSignUpModal = () => {
        setIsSignUpModalOpen(true);
    };

    const handleSignUpCancel = () => {
        setIsSignUpModalOpen(false);
    };

    const handleModalClose = () => {
        setEmail('');
        setPassword('');
        if (data && data.body) {
            data.body.message = ""; 
        }
        onCancel();
    }

    const handleSignUpClick = () => {
        showSignUpModal();
    };





    return (
        <>
            <WrapperModalSignIn
                open={visible}
                onCancel={handleModalClose}
                footer={false}
            >
                <WrapperSiginLeft>
                    <h3 style={{ fontSize: '30px', marginBottom: '10px' }}>Hello everyone</h3>
                    <h4 style={{ width: '450px', letterSpacing: '0.20px', fontWeight: '500', marginBottom: '16px' }}>I am Tran Huu Phuc. Welcome to my app.</h4>
                    <div style={{ marginBottom: "15px" }}>
                        <WrapperSiginIcon>
                            <FacebookOutlined />
                        </WrapperSiginIcon>
                        <WrapperSiginIcon>
                            <TwitterOutlined />
                        </WrapperSiginIcon>
                        <WrapperSiginIcon>
                            <TikTokOutlined />
                        </WrapperSiginIcon>
                        <WrapperSiginIcon>
                            <GithubOutlined />
                        </WrapperSiginIcon>
                    </div>
                </WrapperSiginLeft>
                <WrapperSiginRight>
                    <div style={{ fontSize: '20px', textTransform: 'uppercase', marginBottom: "20px", letterSpacing: "1px", color: 'rgb(36, 36, 36)' }}>
                        <h4>Đăng nhập bằng email</h4>
                    </div>

                    <WrapperSiginInput>
                        <WrapperSiginInputItem placeholder="abc123@gmail.com" value={email} onChange={handleOnchangeEmail} /> <WrapperSiginIconInput><MailOutlined /></WrapperSiginIconInput>
                    </WrapperSiginInput>
                    <WrapperSiginInput>
                        <WrapperSiginInputItem type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} placeholder="Password" /><WrapperSiginIconInput onClick={() => setIsShowPassword(!isShowPassword)}>{
                            isShowPassword ? (
                                <UnlockOutlined title="hidden password" />
                            ) : (
                                <LockOutlined title='show password' />
                            )
                        }</WrapperSiginIconInput>
                    </WrapperSiginInput>

                    <LoadingComponent isLoading={isLoading}>
                    <div>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            size='large'
                            textButton='Đăng nhập'
                            onClick={handleSignIn}></ButtonComponent>
                    </div>
                    </LoadingComponent>
                    

                    <div style={{ color: 'rgb(120, 120, 120)', paddingTop: '10px' }}>Bạn chưa có tài khoản? <span style={{ cursor: 'pointer', color: 'rgb(13, 92, 182)' }} onClick={handleSignUpClick}>Tạo tài khoản</span></div>
                    {data?.body.status === 'ERR' && <Alert style={{ marginTop: "10px", display: data?.body.message ? '' : 'none' }} message={data?.body.message} type="error" />}
                </WrapperSiginRight>
            </WrapperModalSignIn>
            <SignUpComponent visible={isSignUpModalOpen} onCancel={handleSignUpCancel}></SignUpComponent>

            
        </>
    );
};

export default SignInComponent;
