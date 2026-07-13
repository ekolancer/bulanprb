import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  hoverable = true,
  ...props 
}) => {
  return (
    <div 
      className={`bg-surface rounded-2xl shadow-soft transition-all duration-300 ${
        hoverable ? 'hover:shadow-soft-hover hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
