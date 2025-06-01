
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 font-semibold rounded-md shadow-md transition-all duration-150 ease-in-out
                  bg-sky-600 text-white
                  hover:bg-sky-500
                  focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-500
                  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
