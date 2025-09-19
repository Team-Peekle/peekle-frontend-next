import { notFound } from 'next/navigation';

import { SearchParamsType } from '@common/types/routes';

import { isValidDate } from '@common/utils/dates';
import isValidEnumValue from '@common/utils/isValidEnumValue';

import DropdownBar from '@common/components/DropdownBar/DropdownBar.client';

import Navbar from '@common/layout/Navbar.client';
import NavBarLayout from '@common/layout/NavbarLayout/NavbarLayout.client';

import { CategoryType } from '@features/events/types/category';
import { DurationType, FilterType, LocationType, PriceType } from '@features/events/types/filter';
import { SortType } from '@features/events/types/sort';

import ConfirmLocationPopup from '@features/events/components/ConfirmLocationPopup.client';
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
  if (categoryParam && !isValidEnumValue(categoryParam, CategoryType)) {
    notFound();
  }

  return (
    <>
      <NavBarLayout navComponent={<Navbar />}>
        <DropdownBar />
      </NavBarLayout>
      <ConfirmLocationPopup />
      <Filter />
    </>
  );
};

export default EventsPage;
