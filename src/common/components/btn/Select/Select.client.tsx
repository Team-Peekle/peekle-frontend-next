'use client';

import { ButtonsCommonProps } from '@common/types/btn';

import { cn } from '@common/libs/utils';

import { Check } from '@common/components/svg/Check';

interface SelectProps extends ButtonsCommonProps {
  text: string;
  isSelected: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
  /** 전체 너비 차지 여부 */
  fillFullwidth?: boolean;
}

const Select = ({ text, isSelected, onStateChange, fillFullwidth, ...props }: SelectProps) => {
  return (
    <button
      aria-label={`${text} 항목 선택 버튼`}
      aria-pressed={isSelected}
      className={cn(
        'p-8pxr rounded-8pxr transition-spring text-p15m bg-gray-0 flex shrink-0 items-center border-[2px]',
        fillFullwidth ? 'col-span-2' : 'w-full',
        isSelected
          ? 'border-gray-900 text-gray-900'
          : 'border-gray-100 text-gray-400 hover:bg-gray-100',
      )}
      onClick={onStateChange}
      {...props}
    >
      {isSelected ? (
        <div className="flex w-full flex-row items-center justify-between">
          <p>{text}</p>
          <Check className="w-22pxr h-22pxr" />
        </div>
      ) : (
        <p className="text-gray-400">{text}</p>
      )}
    </button>
  );
};

export default Select;
