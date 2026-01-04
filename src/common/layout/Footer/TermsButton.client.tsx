'use client';

import Link from 'next/link';

import { TermsType } from '@common/types/terms';

import { TERMS_LABELS } from '@common/constants/terms';

interface TermsButtonProps {
  href?: string;
  onClick?: () => void;
  termsType: TermsType;
}

/**
 * @description Footer에서 사용하는 terms 관련 버튼
 */
const TermsButton = ({ termsType, href, onClick }: TermsButtonProps) => {
  const baseClass = `bg-gray-0 gap-6pxr rounded-6pxr px-6pxr py-4pxr flex items-center justify-center hover:bg-gray-100`;

  const Content = <p className="text-p14-15 text-gray-500">{TERMS_LABELS[termsType]}</p>;

  // href가 있으면 Link, 없으면 button 렌더링
  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <Link
        href={href}
        className={baseClass}
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

export default TermsButton;
