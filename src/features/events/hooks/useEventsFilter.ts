import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { DEFAULT_FILTERS, LOCATION_TYPE_LABELS, PRICE_TYPE_LABELS } from '../constansts/filter';
import {
  DurationType,
  FilterType,
  LocationType,
  PriceType,
  exceptAllLocationOptions,
} from '../types/filter';

export default function useEventsFilter(filterType?: FilterType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 필터 상태 가져오기
  const filters = useMemo(() => {
    const currentFilters: Record<FilterType, string> = {
      ...DEFAULT_FILTERS,
    };
    Object.keys(DEFAULT_FILTERS).forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        currentFilters[key as FilterType] = value;
      }
    });

    return currentFilters;
  }, [searchParams]);

  // 필터값 변경
  const handleSelect = (newValue: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString()); // 기존 쿼리 파라미터 복사

    if (filterType === FilterType.LOCATION) {
      // 중복 허용 필터 타입일 때 - 지역
      let currentValues = filters[filterType as FilterType]?.split(',') ?? LocationType.ALL;

      // '전체' 포함되어 있으면 제거
      currentValues = currentValues.filter((v) => v !== LocationType.ALL);

      if (newValue === LocationType.ALL) {
        // '전체' 선택시
        updatedParams.set(filterType, LocationType.ALL);
      } else if (currentValues.includes(newValue)) {
        // 이미 선택된 값이면 제거
        const newValues = currentValues.filter((v) => v !== newValue);
        updatedParams.set(
          filterType,
          newValues.length === 0 ? LocationType.ALL : newValues.join(','),
        );
      } else {
        // 새로운 값 추가
        const newValues = [...currentValues, newValue];
        // 추가 후 모든 옵션이 선택되면 '전체'로 변경
        if (newValues.length === exceptAllLocationOptions.length) {
          updatedParams.set(filterType, LocationType.ALL);
        } else {
          updatedParams.set(filterType, newValues.join(','));
        }
      }
    } else if (filterType === FilterType.PRICE || filterType === FilterType.DURATION) {
      // 단일 선택만 가능한 필터 타입일 때
      updatedParams.set(filterType, newValue);
    }

    // URL 업데이트
    router.push(`?${updatedParams.toString()}`);
  };

  // 선택 됐는지 여부
  const isSelected = (value: string) => {
    // 필터 값
    const filterValue = filters[filterType as FilterType];

    if (filterType === FilterType.DURATION || filterType === FilterType.PRICE) {
      if (filterType === FilterType.DURATION) console.log(value, filterValue);
      // 단일 선택이면 비교 후 바로 boolean 리턴
      return value === filterValue;
    }

    if (value === LocationType.ALL) {
      // 중복 선택이고, 전체 값이면
      return filterValue === LocationType.ALL;
    }

    return filterValue ? filterValue.split(',').includes(value) : false;
  };

  const handleRemoveFilter = (filterKey: FilterType, valueToRemove: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (filterKey === FilterType.LOCATION) {
      const currentValues = filters[filterKey].split(',');

      const newValues = currentValues.filter((v) => v !== valueToRemove);

      if (newValues.length === 0) {
        updatedParams.set(filterKey, LocationType.ALL);
      } else {
        updatedParams.set(filterKey, newValues.join(','));
      }
    } else {
      updatedParams.set(filterKey, DEFAULT_FILTERS[filterKey]);
    }

    router.push(`?${updatedParams.toString()}`);
  };

  const clearFilter = () => {
    const updatedParams = new URLSearchParams();
    router.push(`?${updatedParams.toString()}`);
  };

  const activeFilters = useMemo(() => {
    const active: { key: FilterType; value: string; label: string }[] = [];

    Object.keys(filters).map((key) => {
      const filterKey = key as FilterType;
      const currentValue = filters[filterKey];
      const defaultValue = DEFAULT_FILTERS[filterKey];

      // 필터 변경 사항 있을 때
      if (currentValue !== defaultValue) {
        if (key === FilterType.DURATION) {
          if (currentValue !== DurationType.CUSTOM)
            active.push({ key: filterKey, value: currentValue, label: '기간' });
        } else if (key === FilterType.PRICE) {
          const label = PRICE_TYPE_LABELS[currentValue as PriceType];
          if (label) {
            active.push({ key: filterKey, value: currentValue, label });
          }
        } else if (key === FilterType.LOCATION) {
          const locationValues = currentValue.split(',');
          locationValues.forEach((value) => {
            const label = LOCATION_TYPE_LABELS[value as LocationType];
            if (label) {
              active.push({ key: filterKey, value, label: label.replace(/\s/g, '') });
            }
          });
        }
      }
    });

    return active;
  }, [filters]);

  return {
    handleSelect,
    isSelected,
    handleRemoveFilter,
    clearFilter,
    filters,
    activeFilters,
  };
}
