'use client';

import { cn } from '@lib/utils';

import { ButtonsCommonProps } from '@common/types/btn';

interface CtaProps extends ButtonsCommonProps {
  text: string;
  className?: string;
}

const Cta = ({ text, onClick, disabled = false, className, ...props }: CtaProps) => {
  return (
    <button
      aria-label={`${text} 실행하기 버튼`}
      className={cn(
        'w-336pxr p-16pxr rounded-12pxr transition-spring flex items-center justify-center overflow-hidden transition-all',
        disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 hover:bg-gray-700',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <p className={cn('text-p15-16', disabled ? 'text-gray-400' : 'text-gray-0')}>{text}</p>
    </button>
  );
};

export default Cta;
