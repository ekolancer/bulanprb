import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dim hover:shadow-soft',
    secondary: 'bg-transparent border border-accent-blue text-accent-blue hover:bg-accent-blue/10',
    outline: 'bg-white border border-gray-200 text-text-primary hover:border-gray-300 hover:shadow-soft',
    danger: 'bg-danger text-white hover:bg-red-600',
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
