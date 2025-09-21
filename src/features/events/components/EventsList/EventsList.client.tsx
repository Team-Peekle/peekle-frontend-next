'use client';

import { useRef } from 'react';

import { useSearchParams } from 'next/navigation';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import useGetEvents from '@features/events/hooks/queries/useGetEvents';

import EventCard from './EventCard.client';

const EventsList = () => {
  const isMobile = useIsMobile();

  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');

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
    limit: 20,
    order: 'desc',
    sort: 'date',
  });
  console.log(data);
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
