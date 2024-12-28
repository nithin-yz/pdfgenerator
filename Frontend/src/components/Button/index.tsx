// CustomButton.tsx
import React from 'react';

type ButtonProps = {
  name: string;        
  onClick?: () => void; 
  className?: string;   
  disabled?: boolean; 
};

const CustomButton: React.FC<ButtonProps> = ({ name, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-200 `}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default CustomButton;