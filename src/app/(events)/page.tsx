import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { SearchParamsType } from '@common/types/routes';

import { isValidDate } from '@common/utils/dates';
import isValidEnumValue from '@common/utils/isValidEnumValue';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import { CategoryType } from '@features/events/types/category';
import { DurationType, FilterType, LocationType, PriceType } from '@features/events/types/filter';
import { SortType } from '@features/events/types/sort';

import Banner from '@features/events/components/Banner.client';
import ConfirmLocationPopup from '@features/events/components/ConfirmLocationPopup.client';
import EventsList from '@features/events/components/EventsList/EventsList.client';
import Filter from '@features/events/components/Filter/Filter.client';
import OnlyScrappedPopup from '@features/events/components/OnlyScrappedPopup.client';
import WithdrawSuccessWrapper from '@features/setting/components/withdraw/WithdrawSuccessWrapper.client copy';

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
      // 허용되는 위치 str 다 합친 긴 문자열
      const allValidLocations = Object.values(LocationType).join(',');

      for (const loc of locations) {
        if (!allValidLocations.split(',').includes(loc)) {
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
      <Banner />
      <Suspense fallback={<DeferredLoader className="mt-100pxr" size={40} />}>
        <EventsList />
      </Suspense>
      {/* 팝업들 */}
      <ConfirmLocationPopup />
      <OnlyScrappedPopup />
      <Filter />
      <WithdrawSuccessWrapper />
    </>
  );
};

export default EventsPage;
