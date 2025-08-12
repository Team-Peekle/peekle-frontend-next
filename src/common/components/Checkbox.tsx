"use client";

import React from "react";
import { Check } from "./svg/Check";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <div className="relative w-20pxr h-20pxr">
      <input
        type="checkbox"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        {...props}
      />
      <div
        className={`
          absolute inset-0 w-20pxr h-20pxr rounded-4pxr border-2pxr border-gray-200
          flex items-center justify-center transition-colors duration-200
          ${props.checked ? "bg-gray-800 border-gray-800" : "bg-gray-0"}
          ${className}
        `}
      >
        {props.checked && <Check className="size-20pxr text-white" />}
      </div>
    </div>
  );
}
