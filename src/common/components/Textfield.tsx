import React from 'react';

import { cn } from '@lib/utils';

type TextfieldStatus = 'default' | 'success' | 'error';

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  status?: TextfieldStatus;
  helperText?: string;
}

const statusStyle: Record<TextfieldStatus, string> = {
  default: 'border-gray-200 placeholder:text-gray-400 focus:border-primary-500',
  success: 'border-primary-500 placeholder:text-gray-500',
  error: 'border-semantic-red focus:border-semantic-red',
};

export default function Textfield({
  className,
  status = 'default',
  helperText,
  ...props
}: TextfieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className={cn(
          'w-full rounded-[12px] border-1 px-4 py-3 outline-none',
          'text-[17px] leading-[1.2em] font-medium tracking-[-0.02em]',
          statusStyle[status],
          className,
          props.disabled
            ? 'bg-gray-100m border-none text-gray-400'
            : props.readOnly
              ? 'border-none bg-gray-100 text-gray-400'
              : '',
        )}
        {...props}
      />
      {helperText && (
        <div
          className={cn(
            'text-p15m text-left whitespace-pre-line',
            status === 'error'
              ? 'text-semantic-red'
              : status === 'success'
                ? 'text-primary-500'
                : 'text-gray-400',
          )}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}
