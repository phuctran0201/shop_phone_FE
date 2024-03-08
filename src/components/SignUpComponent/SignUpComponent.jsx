import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons';
import { WrapperModalSignUp, WrapperSignUpIconInput, WrapperSignUpInput, WrapperSignUpInputItem, WrapperSignUpRight } from "./style";

const SignUpComponent = ({ visible, onCancel }) => {
  

    return (
        <WrapperModalSignUp
            visible={visible}
            onCancel={onCancel}
            footer={false}
        >
            <WrapperSignUpRight>
                <div style={{ fontSize: '20px', textTransform: 'uppercase', marginBottom: "20px", letterSpacing: "1px", color: 'rgb(36, 36, 36)' }}>
                    <h4>Đăng ký</h4>
                </div>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Username" /> <WrapperSignUpIconInput><UserOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="abc123@gmail.com" /> <WrapperSignUpIconInput><MailOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Password" /><WrapperSignUpIconInput><LockOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <WrapperSignUpInput>
                    <WrapperSignUpInputItem placeholder="Confirm Password" /><WrapperSignUpIconInput><LockOutlined /></WrapperSignUpIconInput>
                </WrapperSignUpInput>
                <div style={{ marginTop: '10px' }}>
                    <ButtonComponent size='large' textButton='Đăng ký'></ButtonComponent>
                </div>
                <div style={{ color: 'rgb(120, 120, 120)', paddingTop: '10px' }}>
                    Bạn đã có tài khoản !!  <span style={{ color: 'rgb(13, 92, 182)', cursor: 'pointer' }} onClick={onCancel}>Trở về đăng nhập</span>
                </div>
            </WrapperSignUpRight>
        </WrapperModalSignUp>
    );
};

export default SignUpComponent;
