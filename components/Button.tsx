
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, size = 'md', className, ...props }) => {
  const baseStyle = "font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 rounded-lg shadow-md";
  
  let variantStyle = "";
  switch (variant) {
    case 'primary':
      variantStyle = "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500";
      break;
    case 'secondary':
      variantStyle = "bg-slate-600 hover:bg-slate-700 text-slate-100 focus:ring-slate-500";
      break;
    case 'danger':
      variantStyle = "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      break;
    case 'ghost':
      variantStyle = "bg-transparent hover:bg-slate-700 text-slate-300 hover:text-slate-100 focus:ring-slate-500 border border-slate-600 hover:border-slate-500";
      break;
  }

  let sizeStyle = "";
  switch (size) {
    case 'sm':
      sizeStyle = "px-3 py-1.5 text-xs";
      break;
    case 'md':
      sizeStyle = "px-4 py-2 text-sm";
      break;
    case 'lg':
      sizeStyle = "px-6 py-3 text-base";
      break;
  }

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${widthStyle} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
    