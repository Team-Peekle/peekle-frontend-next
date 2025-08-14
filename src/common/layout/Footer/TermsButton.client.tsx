'use client';

import { ButtonsCommonProps } from '@common/types/btn';
import { TermsType } from '@common/types/terms';

import { TermsLabels } from '@common/constants/terms';

interface TermsButtonProps extends Omit<ButtonsCommonProps, 'onClick'> {
  termsType: TermsType;
  onClick: (termsType: TermsType) => void;
}

/**
 * @description Footer에서 사용하는 terms 관련 버튼
 */
const TermsButton = ({ termsType, onClick }: TermsButtonProps) => {
  return (
    <button
      className="bg-gray-0 gap-6pxr rounded-6pxr px-6pxr py-4pxr flex items-center justify-center hover:bg-gray-100"
      onClick={() => onClick(termsType)}
    >
      <p className="text-p13-14 text-gray-500">{TermsLabels[termsType]}</p>
    </button>
  );
};

export default TermsButton;
