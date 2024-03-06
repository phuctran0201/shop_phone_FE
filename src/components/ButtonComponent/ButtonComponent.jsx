import React from "react";
import { Button } from 'antd';


const ButtonComponent = ({ size, textButton, style, ...rests }) => {
  return (
    <Button danger 
            style={style} 
            size={size} 
            {...rests}
    >
      <span>
        {textButton}
      </span>
    </Button>
  );
};

export default ButtonComponent;
