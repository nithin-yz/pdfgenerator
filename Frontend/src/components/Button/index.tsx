import React from 'react';

type ButtonProps = {
  name: string;               // Button or link text
  onClick?: () => void;       // Optional click handler
  className?: string;         // Additional CSS classes
  disabled?: boolean;         // Disable button
  link?: string;              // Optional link URL
};

const CustomButton: React.FC<ButtonProps> = ({ name, onClick, disabled, link, className }) => {
  const commonClasses = `px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-200 ${className || ''}`;

  return link ? (
    <a 
      href={link} 
      className={`${commonClasses} ${disabled ? 'opacity-50 pointer-events-none' : ''}`} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {name}
    </a>
  ) : (
    <button 
      onClick={onClick} 
      className={`${commonClasses}`} 
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default CustomButton;
