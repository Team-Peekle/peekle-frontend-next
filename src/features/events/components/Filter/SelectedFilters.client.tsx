'use client';

import { DropdownType } from '@common/types/dropdown';

import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

const SelectedFilters = () => {
  const { activeFilters, handleRemoveFilter } = useEventsFilter();

  return (
    <div className="relative flex min-w-0 flex-1">
      <div className="scrollbar-hide gap-x-6pxr flex flex-row overflow-x-auto">
        {activeFilters.map((filter) => (
          <Dropdown
            dropdownType={DropdownType.VAR4}
            key={`${filter.key}-${filter.value}`}
            text={filter.label}
            onClick={() => handleRemoveFilter(filter.key, filter.value)}
            className="flex shrink-0"
          />
        ))}
      </div>
      <div className="w-40pxr pointer-events-none absolute top-0 right-0 z-10 h-full bg-[linear-gradient(270deg,#ffffff_0%,rgba(255,255,255,0)_100%)]"></div>
    </div>
  );
};

export default SelectedFilters;
