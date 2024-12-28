import React from 'react';
import  {Logo} from './../../assets';
import Btn from "./../Button/index";

const Index = () => {
  return (
    <div className="w-full flex justify-center items-center bg-[#23232A] ">
      <div className="w-full max-w-[1400px]  flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo Section */}
        <div className="flex flex-col p-3 md:flex-row items-center gap-5 w-full md:w-[30%]">
          <div className="md:w-[10%]">
            <img src={Logo}  className=' w-[40px]' alt="Logo"  />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[16px] md:text-[20px] text-white">levitation</p>
            <p className="text-[8px] md:text-[10px] text-white">Infotech</p>
          </div>
        </div>
        
        {/* Button Section */}
        <div className="w-full md:w-auto flex pr-5 justify-center md:justify-end">
          <Btn name="Signup" className="bg-[#a0f465] px-4 py-2 text-black font-semibold rounded-md hover:bg-green-400 transition" />
        </div>
      </div>
    </div>
  );
};

export default Index;