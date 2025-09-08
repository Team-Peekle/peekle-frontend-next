'use client';

import { ButtonsCommonProps } from '@common/types/btn';
import { DropdownType } from '@common/types/dropdown';

import { cn } from '@common/libs/utils';

import { Close } from '@common/components/svg/Close';
import { Down } from '@common/components/svg/Down';
import { Filter } from '@common/components/svg/Filter';
import { HeartIcon } from '@common/components/svg/Heart';

interface DropdownProps extends ButtonsCommonProps {
  dropdownType: DropdownType;
  text: string;
  onClick: () => void;
}

export const Dropdown = ({ dropdownType, text, onClick }: DropdownProps) => {
  const handleClick = () => {
    // VAR4는 버튼이 아닌 태그 내의 X 아이콘이 클릭되도록 하기 위해 onClick 무시
    if (dropdownType === DropdownType.VAR4) {
      return;
    }
    onClick();
  };
  return (
    <button
      className={cn(
        'px-10pxr py-6pxr gap-6pxr rounded-8pxr transition-spring flex h-fit w-fit items-center justify-center shadow-[0_0_10pxr_0_rgba(0,0,0,0.05)]',
        {
          'bg-gray-0 hover:bg-gray-100':
            dropdownType === DropdownType.VAR1 ||
            dropdownType === DropdownType.VAR5 ||
            dropdownType === DropdownType.VAR6,
          'cursor-default': dropdownType === DropdownType.VAR4,
          'bg-gray-800': dropdownType === DropdownType.VAR2 || dropdownType === DropdownType.VAR4,
        },
      )}
      onClick={handleClick}
    >
      {dropdownType === DropdownType.VAR5 && (
        <HeartIcon fill="outlined" className="h-13pxr w-15pxr text-gray-400" />
      )}
      {dropdownType === DropdownType.VAR6 && <Filter className="h-12pxr w-12pxr text-gray-400" />}
      <p
        className={cn('text-p15m', {
          'text-gray-700':
            dropdownType === DropdownType.VAR1 ||
            dropdownType === DropdownType.VAR5 ||
            dropdownType === DropdownType.VAR6,
          'text-gray-0': dropdownType === DropdownType.VAR2 || dropdownType === DropdownType.VAR4,
        })}
      >
        {text}
      </p>
      {(dropdownType === DropdownType.VAR1 || dropdownType === DropdownType.VAR2) && (
        <Down
          className={cn('h-5pxr w-10pxr', {
            'text-gray-400': dropdownType === DropdownType.VAR1,
            'text-gray-0': dropdownType === DropdownType.VAR2,
          })}
        />
      )}
      {dropdownType === DropdownType.VAR4 && (
        <Close className="w-19pxr h-19pxr text-gray-0 cursor-pointer" onClick={onClick} />
      )}
    </button>
  );
};

export default Dropdown;
