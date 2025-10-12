'use client';

import { useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import { CategoryType } from '@features/events/types/category';
import { DurationType, LocationType } from '@features/events/types/filter';
import { PriceType } from '@features/events/types/filter';
import { SortType } from '@features/events/types/sort';
import { OrderType } from '@features/events/types/sort';

import useGetEvents from '@features/events/hooks/queries/useGetEvents';
import { useMyLocationInfo } from '@features/events/hooks/stores/useMyLocationStore';

import EventCard from './EventCard.client';

const EventsList = () => {
  const isMobile = useIsMobile();

  // 필터, 정렬, 카테고리 값 가져오기
  const searchParams = useSearchParams();
  const sort = (searchParams.get('sort') as SortType) ?? SortType.DATE;
  // duration
  let startDate: string | undefined;
  let endDate: string | undefined;
  const duration = searchParams.get('duration') ?? '';
  // duration이 빈 문자열(''), 또는 'CUSTOM'일 경우, 날짜는 undefined로
  if (!duration || duration === DurationType.CUSTOM) {
    startDate = undefined;
    endDate = undefined;
  }
  // duration이 날짜 범위 문자열 ('YYYY-MM-DD,YYYY-MM-DD' 등)일 경우
  else {
    // 쉼표(,)를 기준으로 분리
    const parts = duration.split(',');

    const rawStartDate = parts[0];
    const rawEndDate = parts[1];

    startDate = rawStartDate || undefined;
    endDate = rawEndDate || undefined;
  }
  const price = searchParams.get('price') ?? undefined;
  const locations = (searchParams.get('locations')?.split(',') as LocationType[]) ?? undefined;
  const categories = (searchParams.get('categories')?.split(',') as CategoryType[]) ?? undefined;
  const { myLocation } = useMyLocationInfo();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = (node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // 뷰포트 기준
        rootMargin: '100px', // 감지 범위 - 100px 하단에서 미리 로드
        threshold: 0.1, // 감지 임계값 - 10%라도 보이면 감지
      },
    );

    if (node) observerRef.current.observe(node);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetEvents({
    // limit: 20,
    // sort,
    // order: OrderType.ASC,
    // startDate,
    // endDate,
    // isFree: price === PriceType.FREE ? true : false,
    // locations,
    // categories,
    // latitude: sort === SortType.DISTANCE ? myLocation?.latitude : undefined,
    // longitude: sort === SortType.DISTANCE ? myLocation?.longitude : undefined,
  });

  const events = data?.pages.flatMap((page) => page?.events ?? []) ?? [];

  return (
    <section className={cn(isMobile ? 'py-8pxr' : 'grid grid-cols-3')}>
      {events.length > 0 ? (
        <>
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              eventData={event}
              ref={index === events.length - 1 ? lastElementRef : null}
            />
          ))}
        </>
      ) : (
        <p className="p-16pxr text-gray-400">해당하는 이벤트가 없습니다.</p>
      )}
    </section>
  );
};

export default EventsList;
