import React,{ useEffect, useState }  from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { UserOutlined, LockOutlined,MailOutlined,UnlockOutlined,FacebookOutlined,TwitterOutlined,TikTokOutlined,GithubOutlined } from '@ant-design/icons';
import { WrapperModalSignUp, WrapperSignUpIconInput, WrapperSignUpInput, WrapperSignUpInputItem, WrapperSignUpRight, WrapperSigupIcon, WrapperSigupLeft } from "./style";
import * as UserService from "../../service/UserSevice";
import { useMutationHooks } from '../../hooks/useMutationHooks';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { Alert } from 'antd';
import * as message from "../../components/Message/Message"
const SignUpComponent = ({ visible, onCancel }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutationHooks(data => UserService.signUpUser(data));
    const {  data,isError,isSuccess } = mutation;
    const handleOnchangeEmail = (value) => {
        setEmail(value)
      }

    useEffect(()=>{     //message
        if(data?.body.status === 'OK'){
            handleModalClose();
            message.success();
        }
        else if(data?.body.status === 'ERR'){
            message.error();
        }
    },[isError,isSuccess])

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
        }

    useEffect(() => {//loading time
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

    const  handleSignUp= () => {
        setIsLoading(true);
     
        mutation.mutate({
            name,
            email,
            password
            ,confirmPassword
        });
      
      
        
        }
    const handleModalClose = () => {
        // Lưu trữ dữ liệu trước khi đóng modal
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        onCancel();
    }
    
   
    return (
       <>
        <WrapperModalSignUp
            open={visible}
            onCancel={handleModalClose}
            footer={false}
        >
            <WrapperSigupLeft>
                    <h3 style={{ fontSize: '30px', marginBottom: '10px' }}>Hello everyone</h3>
                    <h4 style={{ width: '450px', letterSpacing: '0.20px', fontWeight: '500', marginBottom: '16px' }}>I am Tran Huu Phuc. Welcome to my app.</h4>
                    <div style={{ marginBottom: "15px" }}>
                        <WrapperSigupIcon>
                            <FacebookOutlined />
                        </WrapperSigupIcon>
                        <WrapperSigupIcon>
                            <TwitterOutlined />
                        </WrapperSigupIcon>
                        <WrapperSigupIcon>
                            <TikTokOutlined />
                        </WrapperSigupIcon>
                        <WrapperSigupIcon>
                            <GithubOutlined />
                        </WrapperSigupIcon>
                    </div>
                </WrapperSigupLeft>
            <WrapperSignUpRight>
                <div style={{ fontSize: '20px', textTransform: 'uppercase', marginBottom: "20px", letterSpacing: "1px", color: 'rgb(36, 36, 36)' }}>
                    <h4>Đăng ký</h4>
                </div>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Username" value={name} onChange={handleOnchangeName} /> <WrapperSignUpIconInput><UserOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="abc123@gmail.com" value={email} onChange={handleOnchangeEmail} /> <WrapperSignUpIconInput><MailOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Password" value={password} onChange={handleOnchangePassword}   type={isShowPassword ? "text" : "password"}  /><WrapperSignUpIconInput
                    onClick={() => setIsShowPassword(!isShowPassword)}>
                        {
                isShowPassword ? (
                    <UnlockOutlined title="hidden password" />
                ) : (
                    <LockOutlined title='show password'/>
                )
              }
                 </WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Confirm Password" value={confirmPassword} onChange={handleOnchangeConfirmPassword}  type={isConfirmPassword ? "text" : "password"} /><WrapperSignUpIconInput onClick={() => setIsConfirmPassword(!isConfirmPassword)}>
                    {
                isConfirmPassword ? (
                    <UnlockOutlined title="hidden password" />
                ) : (
                    <LockOutlined title='show password'/>
                )
              }
                    </WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <LoadingComponent isLoading={isLoading}>
                <div style={{ marginTop: '10px' }}>
                    <ButtonComponent 
                    disabled={!email.length || !name.length || !password.length || !confirmPassword.length}
                    size='large' 
                    textButton='Đăng ký'  
                     onClick={handleSignUp}></ButtonComponent>
                </div>
                </LoadingComponent>
                <div style={{ color: 'rgb(120, 120, 120)', paddingTop: '10px' }}>
                    Bạn đã có tài khoản !!  <span style={{ color: 'rgb(13, 92, 182)', cursor: 'pointer' }} onClick={handleModalClose}>Trở về đăng nhập</span>
                </div>
                {data?.body.status === 'ERR' && <Alert style={{ marginTop: "10px", display: data?.body.message ? '' : 'none' }} message={data?.body.message} type="error" />}
            </WrapperSignUpRight>
        </WrapperModalSignUp>
       
       </>
    );
};

export default SignUpComponent;
