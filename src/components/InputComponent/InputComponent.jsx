import React, { forwardRef } from "react";
import { Input } from 'antd';

const InputComponent = forwardRef((props, ref) => {
    const { placeholder = 'Nhập text', ...rests } = props;

    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <Input ref={ref} placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
    );
});

export default InputComponent;
