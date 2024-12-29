import React from 'react';
import { Logo } from './../../assets';
import CustomButton from './../Button/index';

type HeaderProps = {
  buttonProps: {
    name: string;               // Button text
    onClick?: () => void;       // Optional click handler
    className?: string;         // Additional CSS classes
    disabled?: boolean;         // Disable button
    link?: string;              // Optional link
  };
};

const Index: React.FC<HeaderProps> = ({ buttonProps }) => {
  return (
    <div className="w-full flex justify-center items-center bg-[#23232A]">
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo Section */}
        <div className="flex flex-col p-3 md:flex-row items-center gap-5 w-full md:w-[30%]">
          <div className="md:w-[10%]">
            <img src={Logo} className="w-[40px]" alt="Logo" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[16px] md:text-[20px] text-white">levitation</p>
            <p className="text-[8px] md:text-[10px] text-white">Infotech</p>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full md:w-auto flex pr-5 justify-center md:justify-end">
          <CustomButton 
            name={buttonProps.name} 
            onClick={buttonProps.onClick} 
            className={buttonProps.className} 
            disabled={buttonProps.disabled} 
            link={buttonProps.link} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
