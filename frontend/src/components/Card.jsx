import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverable = true,
  elevated = false,
  ...props
}) => {
  const base = 'bg-white rounded-2xl border border-slate-100/80 transition-all duration-300';

  const shadow = elevated
    ? 'shadow-soft-lg'
    : 'shadow-soft';

  const hover = hoverable
    ? 'hover:shadow-soft-hover hover:-translate-y-0.5 hover:border-slate-200/60'
    : '';

  return (
    <div
      className={`${base} ${shadow} ${hover} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
