"use client";

import React, { InputHTMLAttributes } from "react";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  isCurrency?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  value,
  onValueChange,
  label,
  className,
  ...props
}) => {
  const baseClassName =
    "block px-2.5 pb-2.5 pt-4 w-full text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const combinedClassName = `${baseClassName} ${className}`;

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={combinedClassName}
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="pointer-events-none absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4  left-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
