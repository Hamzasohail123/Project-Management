import React from 'react';

function Input({ 
  type = "text", 
  placeholder = "Type here...",
  className = "w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600",
  onChange,
  value,
  required = false,
  id,
  ...props
}) {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className={className}
      onChange={onChange} 
      value={value} 
      required={required} 
      {...props}
    />
  );
}

export default Input;
