'use client';

import Select from '@common/components/btn/Select/Select.client';

import { SortType } from '@features/events/types/sort';

import useSort from '@features/events/hooks/useSort';

import { SORT_LABELS } from '@features/events/constansts/sort';

const SortMenu = () => {
  const { currentSort, handleSelectSort } = useSort();

  return (
    <div className="bg-gray-0 gap-4pxr p-8pxr rounded-12pxr w-160pxr flex h-fit flex-col items-center justify-center shadow-[0_0_40px_0_rgba(126,131,145,0.5)]">
      {/* 기본값 */}
      <Select
        text={SORT_LABELS[SortType.DATE]}
        isSelected={currentSort === SortType.DATE}
        onStateChange={() => handleSelectSort(SortType.DATE)}
      />
      <Select
        text={SORT_LABELS[SortType.PRICE]}
        isSelected={currentSort === SortType.PRICE}
        onStateChange={() => handleSelectSort(SortType.PRICE)}
      />
      <Select
        text={SORT_LABELS[SortType.DISTANCE]}
        isSelected={currentSort === SortType.DISTANCE}
        onStateChange={() => handleSelectSort(SortType.DISTANCE)}
      />
    </div>
  );
};

export default SortMenu;
