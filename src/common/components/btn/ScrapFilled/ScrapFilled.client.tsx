'use client';

import { useState } from 'react';

import { ButtonsCommonProps } from '@common/types/btn';

import { ScrapIcon } from '@common/components/svg/ScrapIcon';

interface ScrapFilledProps extends ButtonsCommonProps {
  isScrapped: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const ScrapFilled = ({ isScrapped = false, onStateChange, ...props }: ScrapFilledProps) => {
  const [scpapped, setScrapped] = useState(isScrapped);

  const handleClick = () => {
    const newState = !scpapped;
    setScrapped(newState);

    onStateChange?.(newState, scpapped);
  };

  return (
    <button
      aria-label="스크랩 버튼"
      aria-pressed={scpapped}
      className="w-30pxr h-30pxr rounded-8pxr transition-spring bg-gray-0 hover:bg-primary-100 flex items-center justify-center transition-all"
      onClick={handleClick}
      {...props}
    >
      {scpapped ? (
        <ScrapIcon fill="weight" className="text-primary-500" />
      ) : (
        <ScrapIcon fill="weight" className="text-gray-400" />
      )}
    </button>
  );
};

export default ScrapFilled;
