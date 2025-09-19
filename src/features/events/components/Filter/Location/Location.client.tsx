'use client';

import Select from '@common/components/btn/Select/Select.client';

import { FilterType, LocationType } from '@features/events/types/filter';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

import { LOCATION_TYPE_LABELS } from '@features/events/constansts/filter';

const Location = () => {
  const { handleSelect, isSelected } = useEventsFilter(FilterType.LOCATION);

  return (
    <div className="p-20pxr">
      <h3 className="text-p20 mb-2pxr text-gray-700">지역</h3>
      <p className="text-16sb mb-27pxr text-gray-400">지금은 서울 지역만 제공하고 있어요.</p>
      {/* select 목록 */}
      <div className="gap-12pxr grid grid-cols-2">
        {Object.keys(LOCATION_TYPE_LABELS).map((key) => {
          const type = key as LocationType;

          return (
            <Select
              key={type}
              fillFullwidth={type === LocationType.광진_성동_중랑_동대문}
              text={LOCATION_TYPE_LABELS[type]}
              isSelected={isSelected(type)}
              onStateChange={() => handleSelect(type)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Location;
