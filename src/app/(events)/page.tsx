import { notFound } from 'next/navigation';

import { SearchParamsType } from '@common/types/routes';

import { isValidDate } from '@common/utils/dates';
import isValidEnumValue from '@common/utils/isValidEnumValue';

import DropdownBar from '@common/components/DropdownBar/DropdownBar.client';

import { CategoryType } from '@features/events/types/category';
import { DurationType, FilterType, LocationType, PriceType } from '@features/events/types/filter';
import { SortType } from '@features/events/types/sort';

import ConfirmLocationPopup from '@features/events/components/ConfirmLocationPopup.client';
import EventsList from '@features/events/components/EventsList/EventsList.client';
import Filter from '@features/events/components/Filter/Filter.client';

const EventsPage = async ({ searchParams }: { searchParams?: Promise<SearchParamsType> }) => {
  // 유효한 searchParam 값이 아니면 404 띄우기
  const durationParam = (await searchParams)?.[FilterType.DURATION];
  const priceParam = (await searchParams)?.[FilterType.PRICE];
  const locationParam = (await searchParams)?.[FilterType.LOCATION];
  const sortParam = (await searchParams)?.sort;
  const categoryParam = (await searchParams)?.category;

  if (durationParam) {
    if (typeof durationParam === 'string') {
      if (isValidEnumValue(durationParam, DurationType)) {
        // 아무것도 안함
      } else if (durationParam.includes(',')) {
        const dates = durationParam.split(',');
        if (dates.length === 2 && isValidDate(dates[0]) && isValidDate(dates[1])) {
          // 아무것도 안함
        } else {
          notFound(); // 날짜 형식(yyyy.MM.dd)이 아니면
        }
      } else {
        notFound(); // ,로 구분되지 않으면
      }
    } else {
      notFound(); // 문자열 아니면
    }
  }
  if (priceParam && !isValidEnumValue(priceParam, PriceType)) {
    notFound();
  }
  if (locationParam) {
    if (typeof locationParam === 'string') {
      const locations = locationParam.split(',');
      for (const loc of locations) {
        if (!isValidEnumValue(loc, LocationType)) {
          notFound();
        }
      }
    } else {
      notFound();
    }
  }
  if (sortParam && !isValidEnumValue(sortParam, SortType)) {
    notFound();
  }
  if (categoryParam) {
    if (typeof categoryParam === 'string') {
      const categories = categoryParam.split(',');
      for (const cat of categories) {
        if (!isValidEnumValue(cat, CategoryType)) {
          notFound();
        }
      }
    } else {
      notFound();
    }
  }

  return (
    <>
      <div className="py-32pxr bg-banner gap-24pxr flex w-full flex-col">
        <p className="p-16pxr text-p20 whitespace-pre-line text-gray-800">{`재취업·부업 시작을 위한 공공 강좌,\n 한곳에서 찾고 신청해 보세요.`}</p>
        <DropdownBar />
      </div>
      {/* 이벤트 리스트 */}
      <EventsList />
      <ConfirmLocationPopup />
      <Filter />
    </>
  );
};

export default EventsPage;
