'use client';

import { useState } from 'react';

import { ButtonsCommonProps } from '@common/types/btn';

import { Check } from '@common/components/svg/Check';

interface SelectProps extends ButtonsCommonProps {
  text: string;
  isSelected: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const Select = ({ text, isSelected = false, onStateChange, ...props }: SelectProps) => {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = () => {
    const newState = !selected;
    setSelected(newState);

    onStateChange?.(newState, text, selected);
  };

  return (
    <button
      aria-label={`${text} 항목 선택 버튼`}
      aria-pressed={selected}
      className="w-144pxr p-8pxr rounded-8pxr transition-spring text-p15m bg-gray-0 flex items-center transition-all hover:bg-gray-100"
      onClick={handleClick}
      {...props}
    >
      {selected ? (
        <div className="flex w-full items-center justify-between text-gray-900">
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
