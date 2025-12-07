import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'danger';
}

const CasualButton: React.FC<Props> = ({ children, variant = 'default', className = '', ...rest }) => {
  const base = 'px-3 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses =
    variant === 'danger'
      ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-300'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-primary-600';

  return (
    <button {...rest} className={`${base} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

export default CasualButton;
