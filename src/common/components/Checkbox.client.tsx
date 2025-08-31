'use client';

import { Check } from './svg/Check';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Checkbox({ className = '', ...props }: CheckboxProps) {
  return (
    <label className="w-20pxr h-20pxr relative cursor-pointer">
      <input
        type="checkbox"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        {...props}
      />
      <div
        className={`w-20pxr h-20pxr rounded-4pxr border-2pxr absolute inset-0 flex items-center justify-center border-gray-200 transition-colors duration-200 ${props.checked ? 'border-gray-800 bg-gray-800' : 'bg-gray-0'} ${className} `}
      >
        {props.checked && <Check className="size-20pxr text-white" />}
      </div>
    </label>
  );
}
