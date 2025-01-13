"use client";
import { InputHTMLAttributes, useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  bgColor?: string;
  borderColor?: string;
}

const Input = ({
  bgColor = "#1E222D",
  borderColor,
  className,
  ...restProps
}: InputProps) => {
  return (
    <input
      className={`${className} p-3 ${
        // type !== "checkbox" && type !== "radio"
        "outline outline-1 outline-white/40 rounded-md placeholder:text-light-gray text-sm focus:outline-primary focus:outline focus-outline-1"
      } transition-all duration-500`}
      style={{ backgroundColor: bgColor, borderColor }}
      {...restProps}
    />
  );
};

export default Input;
