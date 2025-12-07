import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<Props> = ({ children, className = '', ...rest }) => {
  return (
    <button
      {...rest}
      className={`btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
