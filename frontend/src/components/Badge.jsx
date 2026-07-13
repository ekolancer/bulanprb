import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'info', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  
  const variants = {
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
    info: 'bg-accent-blue/15 text-accent-blue',
    primary: 'bg-primary/15 text-primary',
  };

  return (
    <span 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};
