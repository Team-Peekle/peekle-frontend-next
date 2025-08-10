'use client';

import { useState } from 'react';

import { ButtonsCommonProps } from '@common/types/btn';

import { ScrapIcon } from '@common/components/svg/ScrapIcon';

interface ScrapProps extends ButtonsCommonProps {
  isScrapped: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const Scrap = ({ isScrapped = false, onStateChange, ...props }: ScrapProps) => {
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
      className="w-40pxr h-40pxr rounded-12pxr transition-spring bg-gray-0 flex items-center justify-center transition-all"
      onClick={handleClick}
      {...props}
    >
      {scpapped ? (
        <ScrapIcon fill="weight" className="text-gray-900" />
      ) : (
        <ScrapIcon fill="outlined" className="text-gray-600" />
      )}
    </button>
  );
};

export default Scrap;
