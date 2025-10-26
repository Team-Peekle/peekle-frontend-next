'use client';

import { useState } from 'react';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Cta from '@common/components/btn/Cta/Cta.client';
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
      {isOpenFilter &&
        (isMobile ? (
          <div className="bg-gray-0 fixed inset-0 z-30 flex flex-col">
            <header className="p-16pxr mb-8pxr relative flex flex-row items-center justify-end border-b border-b-gray-100">
              <h2 className="text-p18 absolute inset-x-0 mx-auto w-fit text-gray-700">필터</h2>
              <Close onClick={closeFilter} className="cursor-pointer text-gray-600" />
            </header>
            <main className="pb-90pxr gap-48pxr flex flex-1 flex-col overflow-y-auto">
              {Object.keys(FILTER_TYPE_LABELS).map((key) => {
                const type = key as FilterType;
                return (
                  <section key={type}>
                    <h3 className="mb-12pxr text-p18 pl-22pxr text-gray-900">
                      {FILTER_TYPE_LABELS[type]}
                    </h3>
                    {filterPanels[type]}
                  </section>
                );
              })}
            </main>
            <footer className="p-12pxr absolute bottom-0 flex w-full flex-row items-center justify-between bg-[linear-gradient(180deg,rgba(250,250,250,0)_0%,rgb(250,250,250)_100%)]">
              <div className="flex w-full flex-row items-center">
                <button
                  className="gap-8pxr flex flex-1 flex-row items-center justify-center text-gray-500"
                  onClick={clearFilter}
                >
                  <Reload className="w-14pxr h-14pxr" />
                  초기화
                </button>
                <Cta text="필터 적용하기" onClick={closeFilter} className="flex-1" />
              </div>
            </footer>
          </div>
        ) : (
          <ModalLayout onClickDimmed={closeFilter}>
            <div className="bg-gray-0 rounded-20pxr h-650pxr w-600pxr relative cursor-default">
              <header className="p-16pxr mb-8pxr relative flex flex-row items-center justify-end border-b border-b-gray-100">
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
                    className="gap-8pxr flex flex-row items-center justify-center text-gray-500"
                    onClick={clearFilter}
                  >
                    <Reload className="w-14pxr h-14pxr" />
                    초기화
                  </button>
                  <button
                    onClick={closeFilter}
                    className="text-gray-0 rounded-8pxr py-8pxr px-16pxr bg-gray-800"
                  >
                    필터 적용하기
                  </button>
                </div>
              </footer>
            </div>
          </ModalLayout>
        ))}
    </>
  );
};

export default Filter;
