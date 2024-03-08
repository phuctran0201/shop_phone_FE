import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { MailOutlined, LockOutlined, FacebookOutlined, TwitterOutlined, TikTokOutlined, GithubOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { WrapperModalSignIn, WrapperSiginIcon, WrapperSiginIconInput, WrapperSiginInput, WrapperSiginInputItem, WrapperSiginLeft, WrapperSiginRight } from './style';
import SignUpComponent from '../SignUpComponent/SignUpComponent';

const SignInComponent = ({ visible, onCancel }) => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const showSignUpModal = () => {
        setIsSignUpModalOpen(true);
    };

    const handleSignUpCancel = () => {
        setIsSignUpModalOpen(false);
    };

    const handleCancel = () => {
        onCancel(); // Close the SignIn modal
    };

    return (
        <>
            <WrapperModalSignIn
                visible={visible && !isSignUpModalOpen} // Only show SignIn modal if SignUp modal is not open
                onCancel={onCancel}
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
                        <WrapperSiginInputItem placeholder="abc123@gmail.com" /> <WrapperSiginIconInput><MailOutlined /></WrapperSiginIconInput>
                    </WrapperSiginInput>
                    <WrapperSiginInput>
                        <WrapperSiginInputItem type='password' placeholder="Password" /><WrapperSiginIconInput><LockOutlined /></WrapperSiginIconInput>
                    </WrapperSiginInput>
                    <div>
                        <ButtonComponent size='large' textButton='Đăng nhập'></ButtonComponent>
                    </div>
                    <div style={{ color: 'rgb(120, 120, 120)', paddingTop: '10px' }}>Bạn chưa có tài khoản? <span style={{ cursor:'pointer' ,color: 'rgb(13, 92, 182)' }} onClick={showSignUpModal}>Tạo tài khoản</span></div>
                </WrapperSiginRight>
            </WrapperModalSignIn>
            <SignUpComponent visible={isSignUpModalOpen} onCancel={handleSignUpCancel}></SignUpComponent>
        </>
    );
};

export default SignInComponent;
