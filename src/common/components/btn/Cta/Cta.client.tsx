'use client';

import { ButtonsCommonProps } from '@common/types/btn';

import { cn } from '@common/libs/utils';

interface CtaProps extends Omit<ButtonsCommonProps, 'onClick'> {
  text: string;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const Cta = ({
  text,
  onClick,
  disabled = false,
  className,
  href,
  target,
  rel,
  ...props
}: CtaProps) => {
  const baseClassName = cn(
    'p-16pxr rounded-12pxr transition-spring flex w-full shrink-0 items-center justify-center overflow-hidden',
    disabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 hover:bg-gray-700',
    className,
  );

  const textClassName = cn(
    'whitespace-nowrap text-p15-16',
    disabled ? 'text-gray-400' : 'text-gray-0',
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={`${text} 실행하기 버튼`}
        className={baseClassName}
        onClick={onClick}
      >
        <p className={textClassName}>{text}</p>
      </a>
    );
  }

  return (
    <button
      aria-label={`${text} 실행하기 버튼`}
      aria-disabled={disabled}
      className={baseClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <p className={textClassName}>{text}</p>
    </button>
  );
};

export default Cta;
