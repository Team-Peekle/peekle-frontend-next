'use client';

import { ButtonsCommonProps } from '@common/types/btn';
import { ChipType } from '@common/types/chip';

import { cn } from '@common/libs/utils';

interface ChipProps extends ButtonsCommonProps {
  chipType: ChipType;
  text: string;
  onClick?: () => void;
}

const Chip = ({ chipType, text, onClick }: ChipProps) => {
  return (
    <>
      {chipType === ChipType.DEFAULT && (
        <button
          className="gap-10pxr h-24pxr rounded-4pxr px-6pxr py-4pxr text-p14-15 bg-primary-50 text-primary-500 flex w-fit shrink-0 items-center justify-center"
          onClick={onClick}
        >
          {text}
        </button>
      )}

      {chipType !== ChipType.DEFAULT && (
        <button
          className={cn(
            'gap-6pxr rounded-6pxr px-12pxr py-8pxr text-p15m flex h-fit w-fit shrink-0 items-center justify-center',
            {
              'text-gray-0 bg-gray-800': chipType === ChipType.VAR1,
              'transition-spring bg-gray-50 text-gray-500 hover:bg-gray-200':
                chipType === ChipType.VAR2,
            },
          )}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Chip;
