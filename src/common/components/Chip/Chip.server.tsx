import { cn } from '@lib/utils';

import { ChipType } from '@common/types/chip';

interface ChipProps {
  type: ChipType;
  text: string;
}

const Chip = ({ type, text }: ChipProps) => {
  return (
    <>
      {type === ChipType.DEFAULT && (
        <div className="gap-10pxr h-24pxr rounded-4pxr px-6pxr py-4pxr text-p14-15 bg-primary-50 text-primary-500 flex w-fit items-center justify-center">
          {text}
        </div>
      )}

      {type !== ChipType.DEFAULT && (
        <div
          className={cn(
            'gap-6pxr rounded-6pxr px-12pxr py-8pxr text-p15m flex h-fit w-fit items-center justify-center',
            {
              'text-gray-0 bg-gray-800': type === ChipType.VAR1,
              'transition-spring bg-gray-50 text-gray-500 hover:bg-gray-200':
                type === ChipType.VAR2,
            },
          )}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Chip;
