'use client';

import { cn } from '@lib/utils';

import { ButtonsCommonProps } from '@common/types/btn';

interface CtaProps extends ButtonsCommonProps {
  children: React.ReactNode;
  className?: string;
}

const Cta = ({ children, className, ...props }: CtaProps) => {
  return (
    <button
      aria-label={`${children} 실행하기 버튼`}
      className={cn(
        'w-336pxr p-16pxr rounded-12pxr transition-spring flex items-center justify-center overflow-hidden transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Cta;
