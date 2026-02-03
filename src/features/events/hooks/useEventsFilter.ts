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
      const rawValue = filters[filterType as FilterType] ?? LocationType.ALL;
      let currentValues = rawValue === LocationType.ALL ? [] : rawValue.split(',');

      // '전체' 포함되어 있으면 제거
      currentValues = currentValues.filter((v) => v !== LocationType.ALL);

      if (newValue === LocationType.ALL) {
        // '전체' 선택시
        updatedParams.set(filterType, LocationType.ALL);
      } else {
        // newValue가 '광진,성동...' 처럼 쉼표를 포함할 수 있으므로 배열로 변환
        const tokens = newValue.split(',');
        const isAlreadySelected = tokens.every((t) => currentValues.includes(t));

        let newValues: string[];
        if (isAlreadySelected) {
          // 이미 선택된 값이면 제거
          newValues = currentValues.filter((v) => !tokens.includes(v));
        } else {
          // 그룹 내 값 중 하나라도 없으면 추가 - 중복 제거 위해 Set 사용
          newValues = Array.from(new Set([...currentValues, ...tokens]));
        }
        // 모든 지역 옵션 개수와 비교하여 '전체' 여부 결정 (exceptAllLocationOptions 기반)
        if (newValues.length === 0 || newValues.length === exceptAllLocationOptions.length) {
          updatedParams.set(filterType, LocationType.ALL);
        } else {
          updatedParams.set(filterType, newValues.join(','));
        }
      }
    } else if (filterType === FilterType.PRICE || filterType === FilterType.DURATION) {
      // 단일 선택 필터 처리
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
          // 현재 URL에 있는 모든 개별 지역 추출
          const currentSelectedLocations = currentValue.split(',');

          // Enum 구조를 순회하며 그룹 라벨 찾기
          (Object.keys(LOCATION_TYPE_LABELS) as LocationType[]).forEach((type) => {
            if (type === LocationType.ALL) return;

            const groupTokens = type.split(','); // ['강남', '서초', '양재']

            // 해당 그룹의 모든 토큰이 현재 선택된 목록에 포함되어 있는지 확인
            const isGroupSelected = groupTokens.every((t) => currentSelectedLocations.includes(t));

            if (isGroupSelected) {
              active.push({
                key: filterKey,
                value: type, // 그룹 문자열 전체 ('강남,서초,양재')
                label: LOCATION_TYPE_LABELS[type].replace(/\s/g, ''),
              });

              // 이미 추가된 지역들은 검사 목록에서 제외 (중복 방지)
              groupTokens.forEach((t) => {
                const idx = currentSelectedLocations.indexOf(t);
                if (idx > -1) currentSelectedLocations.splice(idx, 1);
              });
            }
          });

          // 만약 그룹에 속하지 않은 개별 지역이 남아있다면 처리
          currentSelectedLocations.forEach((loc) => {
            if (loc) {
              active.push({ key: filterKey, value: loc, label: loc });
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
