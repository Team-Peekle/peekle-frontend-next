'use client';

import { cn } from '@lib/utils';

import { FilterType } from '@features/events/types/filter';

import { FILTER_TYPE_LABELS } from '@features/events/constansts/filter';

interface SelectFilterTypeButtonProps {
  type: FilterType;
  isActive: boolean;
  onClick: React.Dispatch<React.SetStateAction<FilterType>>;
}

const SelectFilterTypeButton = ({ type, isActive, onClick }: SelectFilterTypeButtonProps) => {
  return (
    <button
      className={cn(
        'text-16sb w-135pxr px-12pxr py-8pxr rounded-10pxr text-left text-gray-700',
        isActive ? 'bg-gray-100' : 'bg-gray-0',
      )}
      onClick={() => onClick(type)}
    >
      {FILTER_TYPE_LABELS[type]}
    </button>
  );
};

export default SelectFilterTypeButton;
