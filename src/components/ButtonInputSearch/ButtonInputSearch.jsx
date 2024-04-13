import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, ...otherProps } = props;

    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{
                    background: "#fff",
                    borderRadius: '10px 0 0 10px',
                    borderColor: '#fff'
                }}
                {...otherProps} 
            />
            <ButtonComponent
                danger
                style={{ borderRadius: '0 10px 10px 0', borderColor: '#fff' }}
                size={size}
                icon={<SearchOutlined />}
                {...otherProps} 
            />
        </div>
    );
}

export default ButtonInputSearch;
