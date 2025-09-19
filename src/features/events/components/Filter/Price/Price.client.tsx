'use client';

import { cn } from '@lib/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Select from '@common/components/btn/Select/Select.client';

import { FilterType, PriceType } from '@features/events/types/filter';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

import { PRICE_TYPE_LABELS } from '@features/events/constansts/filter';

const Price = () => {
  const isMobile = useIsMobile();
  const { handleSelect, isSelected } = useEventsFilter(FilterType.PRICE);

  return (
    <div className={cn(isMobile ? 'px-20pxr' : 'p-20pxr')}>
      {!isMobile && (
        <>
          <h3 className="text-p20 mb-2pxr text-gray-700">비용</h3>
          <p className="text-16sb mb-27pxr text-gray-400">참여에 필요한 비용의 유무에요.</p>
        </>
      )}
      <div className="gap-10pxr grid grid-cols-3">
        {Object.keys(PRICE_TYPE_LABELS).map((key) => {
          const type = key as PriceType;

          return (
            <Select
              key={type}
              text={PRICE_TYPE_LABELS[type]}
              isSelected={isSelected(type)}
              onStateChange={() => handleSelect(type)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Price;
