import { Input, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader=styled.div`
color:#000;
font-size:18px;
font-weight: 600;
margin:10px 0;
`
export const WrapperContentProfile=styled.div`
display:flex;
flex-direction:column;
border:1px solid #ccc;
width:620px;
margin:0 auto;
padding:30px;
border-radius:10px;
gap:30px;
`
export const WrapperLable=styled.label`
color:#000;
font-size:15px;
font-weight: 600;
padding :0 10px;
width:80px;
`
export const WrapperInputProfile=styled(Input)`
width:400px;
`
export const WrapperInput=styled.div`
display:flex;
align-items:center;
gap:10px;
`
export const WrapperUploadFile = styled(Upload)`

    .ant-upload-list-item-container{
        display:none;
    }
`