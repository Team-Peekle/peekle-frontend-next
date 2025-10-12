'use client';

import { DropdownType } from '@common/types/dropdown';

import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

const SelectedFilters = () => {
  const { activeFilters, handleRemoveFilter } = useEventsFilter();

  return (
    <div className="gap-6pxr flex shrink-0 flex-row">
      {activeFilters.map((filter) => (
        <Dropdown
          dropdownType={DropdownType.VAR4}
          key={`${filter.key}-${filter.value}`}
          text={filter.label}
          onClick={() => handleRemoveFilter(filter.key, filter.value)}
        />
      ))}
    </div>
  );
};

export default SelectedFilters;
