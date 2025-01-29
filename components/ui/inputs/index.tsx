"use client";
import { InputHTMLAttributes, useState, CSSProperties } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  bgColor?: CSSProperties["backgroundColor"];
  outlineStyle?: CSSProperties["outlineStyle"];
  outlineWidth?: CSSProperties["outlineWidth"];
  outlineColor?: CSSProperties["outlineColor"];
}

const Input = ({
  bgColor = "#1E222D",
  outlineStyle,
  outlineWidth,
  outlineColor,
  className,
  ...restProps
}: InputProps) => {
  return (
    <input
      className={`${className} p-3 ${"outline outline-1 outline-white/40 rounded-md placeholder:text-[#4b5264] text-sm focus:outline-primary transition-all duration-500"}`}
      style={{
        backgroundColor: bgColor,
        outlineStyle: outlineStyle,
        outlineWidth: outlineWidth,
        outlineColor: outlineColor,
      }}
      {...restProps}
    />
  );
};

export default Input;
