import React from 'react';

const Button = ({ text, onClick, color = 'bg-indigo-600', hoverColor = 'hover:bg-indigo-700', disabled = false,...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${color} 
        text-white 
        px-4 
        py-2 
        rounded-lg 
        transition-all 
        duration-200 
        ${hoverColor} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}
      `}
      disabled={disabled}
      {...props}

    >
      {text}
    </button>
  );
};

export default Button;
