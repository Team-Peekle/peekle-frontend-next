'use client';

import { useState } from 'react';

import { ButtonsCommonProps, ScrapLineColorType } from '@common/types/btn';

import { cn } from '@common/libs/utils';

import { ScrapIcon } from '@common/components/svg/ScrapIcon';

interface ScrapLineProps extends ButtonsCommonProps {
  color: ScrapLineColorType;
  isScrapped: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const ScrapLine = ({ color, isScrapped = false, onStateChange, ...props }: ScrapLineProps) => {
  const [scrapped, setScrapped] = useState(isScrapped);

  const handleClick = () => {
    const newState = !scrapped;
    setScrapped(newState);

    onStateChange?.(newState, scrapped);
  };

  return (
    <button
      aria-label="스크랩 버튼"
      aria-pressed={scrapped}
      className="w-24pxr h-24pxr transition-spring flex items-center justify-center"
      onClick={handleClick}
      {...props}
    >
      {scrapped ? (
        <ScrapIcon
          fill="weight"
          className={cn({
            'text-primary-500': color === ScrapLineColorType.WHITE,
            'text-gray-900': color === ScrapLineColorType.GRAY,
          })}
        />
      ) : (
        <ScrapIcon
          fill="outlined"
          className={cn({
            'text-gray-0': color === ScrapLineColorType.WHITE,
            'text-gray-600': color === ScrapLineColorType.GRAY,
          })}
        />
      )}
    </button>
  );
};

export default ScrapLine;
