'use client';

import { useState } from 'react';

import { useIsMobile } from '@common/hooks/useIsMobile';

import ModalLayout from '@common/components/modal/ModalLayout.client';
import { Close } from '@common/components/svg/Close';
import { Reload } from '@common/components/svg/Reload';

import { FilterType } from '@features/events/types/filter';

import {
  useCloseFilter,
  useEventsModalInfo,
} from '@features/events/hooks/stores/useEventsModalStore';
import useEventsFilter from '@features/events/hooks/useEventsFilter';

import { FILTER_TYPE_LABELS } from '@features/events/constansts/filter';

import Duration from './Duration/Duration.client';
import Location from './Location/Location.client';
import Price from './Price/Price.client';
import SelectFilterTypeButton from './SelectFilterTypeButton.client';
import SelectedFilters from './SelectedFilters.client';

const Filter = () => {
  const isMobile = useIsMobile();
  // 기본 필터 타입은 기간
  const [activeFilterType, setActiveFilterType] = useState<FilterType>(FilterType.DURATION);
  const filterPanels = {
    [FilterType.DURATION]: <Duration />,
    [FilterType.PRICE]: <Price />,
    [FilterType.LOCATION]: <Location />,
  };

  const { isOpenFilter } = useEventsModalInfo();
  const closeFilter = useCloseFilter();

  const { clearFilter } = useEventsFilter();

  return (
    <>
      {isMobile ? (
        <div></div>
      ) : (
        isOpenFilter && (
          <ModalLayout onClickDimmed={closeFilter}>
            <div className="bg-gray-0 rounded-20pxr h-650pxr w-600pxr relative cursor-default">
              <header className="p-16pxr mb-8pxr relative flex flex-row items-center border-b border-b-gray-100">
                <h2 className="text-p18 absolute inset-x-0 mx-auto w-fit text-gray-700">필터</h2>
                <div className="flex-1" />
                <Close onClick={closeFilter} className="cursor-pointer text-gray-600" />
              </header>
              <main className="flex flex-row">
                {/* 왼쪽 */}
                <section className="p-16pxr gap-12pxr flex flex-col">
                  {Object.keys(FILTER_TYPE_LABELS).map((key) => {
                    const type = key as FilterType;
                    return (
                      <SelectFilterTypeButton
                        key={type}
                        type={type}
                        isActive={activeFilterType === type}
                        onClick={setActiveFilterType}
                      />
                    );
                  })}
                </section>
                {/* 오른쪽 */}
                <section className="flex-1">{filterPanels[activeFilterType]}</section>
              </main>
              <footer className="py-19pxr px-16pxr absolute bottom-0 flex w-full flex-row items-center justify-between">
                <SelectedFilters />
                <div className="gap-24pxr flex flex-row items-center">
                  <button
                    className="gap-8pxr flex flex-row items-center text-gray-500"
                    onClick={clearFilter}
                  >
                    <Reload className="w-14pxr h-14pxr" />
                    초기화
                  </button>
                  <button className="text-gray-0 rounded-8pxr py-8pxr px-16pxr bg-gray-800">
                    필터 적용하기
                  </button>
                </div>
              </footer>
            </div>
          </ModalLayout>
        )
      )}
    </>
  );
};

export default Filter;
