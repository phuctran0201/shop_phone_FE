import React from "react";
import { WrapperContent, WrapperLableText, WrapperTextValue } from "./style";
import { Checkbox ,Rate } from 'antd';

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const NavbarComponent = () => {
    const renderContent = (type, options) => {
        switch(type) {
            case 'text':
                return options.map((option, index) => (
                    <WrapperTextValue key={index}>{option}</WrapperTextValue>
                ));
            case 'checkBox':
                return (
                    <Checkbox.Group
                        style={{ width: '100%',display:'flex',flexDirection:'column',gap:'12px'}}
                        onChange={onChange}
                    >
                        {options.map((option, index) => (
                            <Checkbox key={index} value={option.value}>
                                {option.label}
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                );
                case 'star':
                    return (
                        
                            options.map((option, index) => (
                              <div  style={{ width: '100%',display:'flex',gap:'6px'}}>
                                <Rate style={{fontSize:'14px'}} key={index} disabled defaultValue={option} />
                                <span >từ {option} sao</span>
                              </div>
                            ))
                        
                    );
                    case 'price':
                        return options.map((option, index) => (
                            <div style={{borderRadius:'10px',backgroundColor:'#ccc',width:'fit-content',padding:'5px'}} key={index}>{option}</div>
                        ));
                 default:
                        return null;
        }
    };

    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text',
                 ['Điện thoại', 'máy tính', 'tai nghe'])}
                {/* {renderContent('checkBox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' }
                ])}
                {renderContent('star', [
                    3,4,5
                ])}
                {renderContent('price', [
                    "dưới 10.000.000đ","trên 30.000.000đ"
                ])} */}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;
