import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl ' +
    'transition-all duration-200 ' +
    // Active press feedback — GPU-accelerated
    'active:scale-[0.97] active:brightness-95 ' +
    // Hover lift
    'hover:-translate-y-px ' +
    // Focus ring — keyboard accessible, WCAG AA
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ' +
    // Disabled state
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variants = {
    primary:
      'bg-primary text-white ' +
      'hover:bg-primary-dim hover:shadow-[0_4px_16px_rgba(30,64,175,0.30)]',
    secondary:
      'bg-transparent border border-primary/30 text-primary ' +
      'hover:bg-primary/5 hover:border-primary/60',
    outline:
      'bg-white border border-slate-200 text-text-primary ' +
      'hover:border-slate-300 hover:shadow-soft',
    ghost:
      'bg-transparent text-text-secondary ' +
      'hover:bg-slate-100 hover:text-text-primary',
    danger:
      'bg-danger text-white ' +
      'hover:bg-red-700 hover:shadow-[0_4px_16px_rgba(220,38,38,0.30)]',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
