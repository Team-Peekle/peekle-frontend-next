'use client';

import { useMemo, useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import { NotFound } from '@common/components/svg/NotFound';

import { CategoryType } from '@features/events/types/category';
import { DurationType, FilterType, LocationType, PriceType } from '@features/events/types/filter';
import { SortType } from '@features/events/types/sort';
import { OrderType } from '@features/events/types/sort';

import useGetEvents from '@features/events/hooks/queries/useGetEvents';
import { useMyLocationInfo } from '@features/events/hooks/stores/useMyLocationStore';
import useEventsFilter from '@features/events/hooks/useEventsFilter';

import EventCard from './EventCard.client';

interface EventsListProps {
  isSearchPage?: boolean;
}

const EventsList = ({ isSearchPage = false }: EventsListProps) => {
  const isMobile = useIsMobile();

  // 필터, 정렬, 카테고리 값 가져오기
  const searchParams = useSearchParams();
  const { myLocation } = useMyLocationInfo();
  const { filters } = useEventsFilter();

  // 데이터 가공 (Hook에서 가져온 Raw String -> API 요청용 변환)
  // [Sort]
  const sort = (searchParams.get('sort') as SortType) ?? SortType.DATE;

  // [searchQuery]
  // URL이 /search?q=맥주축제 라면 '맥주축제'를 가져옴
  const searchQuery = searchParams.get('q') ?? undefined;

  // [Duration]
  const durationVal = filters[FilterType.DURATION];
  let startDate: string | undefined;
  let endDate: string | undefined;
  // duration이 빈 문자열(''), 또는 'CUSTOM'일 경우, 날짜는 undefined로
  // duration이 날짜 범위 문자열 ('YYYY-MM-DD,YYYY-MM-DD' 등)일 경우
  // 쉼표(,)를 기준으로 분리
  if (durationVal && durationVal !== DurationType.ALL && durationVal !== DurationType.CUSTOM) {
    const parts = durationVal.split(',');
    startDate = parts[0];
    endDate = parts[1];
  }

  // [Price]
  const priceVal = filters[FilterType.PRICE];
  const isFree = useMemo(() => {
    if (priceVal === PriceType.ALL) return undefined;
    return priceVal === PriceType.FREE;
  }, [priceVal]);

  // [Location]
  const locationVal = filters[FilterType.LOCATION];
  const locations = useMemo(() => {
    if (!locationVal || locationVal === LocationType.ALL) return undefined;

    // Enum 값(쉼표로 연결된 문자열)을 다시 split해서 배열로 만듦
    return locationVal.split(',');
  }, [locationVal]);

  // 카테고리
  const categories = (searchParams.get('categories')?.split(',') as CategoryType[]) ?? undefined;
  // 찜한 이벤트
  const onlyScrapped = searchParams.get('onlyScrapped') === 'true';

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = (node: HTMLDivElement) => {
    if (isFetching || isFetchingNextPage) return;
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

  const queryParams = useMemo(
    () => ({
      limit: 20,
      sort,
      order: OrderType.ASC,
      startDate,
      endDate,
      isFree,
      locations,
      categories,
      latitude: sort === SortType.DISTANCE ? myLocation?.latitude : undefined,
      longitude: sort === SortType.DISTANCE ? myLocation?.longitude : undefined,
      onlyScrapped,
      search: searchQuery,
    }),
    [
      sort,
      startDate,
      endDate,
      isFree,
      locations,
      categories,
      myLocation,
      onlyScrapped,
      searchQuery,
    ],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetEvents(queryParams);

  const allEvents = data?.pages.flatMap((page) => page?.events ?? []) ?? [];
  let eventIndexInAll = 0; // 전체 이벤트 배열에서의 인덱스를 추적

  return (
    <section className={cn(isMobile ? 'py-8pxr' : 'grid grid-cols-3')}>
      {/* 데이터 렌더링 영역 */}
      {(data?.pages[0]?.events.length ?? 0 > 0) ? (
        <>
          {data?.pages.map((page, pageIndex) =>
            page?.events.map((event) => {
              const isFirstPage = pageIndex === 0;
              const ref = eventIndexInAll === allEvents.length - 1 ? lastElementRef : null;

              eventIndexInAll++; // 다음 이벤트를 위해 전체 인덱스를 증가

              return (
                <EventCard isFirstPage={isFirstPage} key={event.id} eventData={event} ref={ref} />
              );
            }),
          )}
        </>
      ) : (
        // 로딩 끝, 데이터 없을 때
        <>
          {!isFetching && (
            <div className={cn('flex flex-col items-center', !isMobile && 'col-span-3')}>
              <NotFound className="w-329pxr h-231pxr" />
              <p className="text-gray-400">
                {isSearchPage ? '검색 결과가 없어요' : '해당하는 이벤트가 없습니다.'}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default EventsList;
