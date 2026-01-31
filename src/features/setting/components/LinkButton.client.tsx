'use client';

import Link from 'next/link';

import { cn } from '@common/libs/utils';

import { Arrow } from '@common/components/svg/Arrow';

interface LinkButtonProps {
  label: string;
  href?: string;
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isExternal?: boolean;
}
const LinkButton = ({
  label,
  href,
  showArrow = true,
  onClick,
  className,
  isActive,
  isExternal,
}: LinkButtonProps) => {
  const baseClass = cn(
    'w-full flex items-center justify-between rounded-10pxr px-12pxr py-8pxr bg-gray-0 transition-colors hover:bg-gray-100',
    isActive && 'bg-gray-100',
    className,
  );

  const Content = (
    <>
      <p className="text-p16sb text-gray-700">{label}</p>
      {showArrow && <Arrow direction="right" className="w-13pxr h-14pxr text-gray-300" />}
    </>
  );

  // href가 있으면 Link, 없으면 button 렌더링
  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        // isExternal이 true일 때만 새 탭 속성 적용
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {Content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {Content}
    </button>
  );
};

export default LinkButton;
