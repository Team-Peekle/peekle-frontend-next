'use client';

import Link from 'next/link';

import { TermsType } from '@common/types/terms';

import { TERMS_LABELS } from '@common/constants/terms';

interface TermsButtonProps {
  href: string;
  termsType: TermsType;
}

/**
 * @description Footer에서 사용하는 terms 관련 버튼
 */
const TermsButton = ({ termsType, href }: TermsButtonProps) => {
  return (
    <Link
      href={href}
      className="bg-gray-0 gap-6pxr rounded-6pxr px-6pxr py-4pxr flex items-center justify-center hover:bg-gray-100"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="text-p14-15 text-gray-500">{TERMS_LABELS[termsType]}</p>
    </Link>
  );
};

export default TermsButton;
