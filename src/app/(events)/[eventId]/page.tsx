import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { HydrationBoundary } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import getDehydratedState from '@common/libs/react-query/dehydrate';

import { isPositiveNumber } from '@common/utils/isNumber';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import getEventDetail from '@features/events/apis/get/getEventDetail';

import EventDetailContent from '@features/events/components/EventDetailContent/EventDetailContent.client';
import ImageSlider from '@features/events/components/ImageSlider/ImageSlider.client';
import OnlyScrappedPopup from '@features/events/components/OnlyScrappedPopup.client';

const EventDetailPage = async ({ params }: { params: Promise<{ [key: string]: string }> }) => {
  const { eventId } = await params;

  // eventId가 양수로 변환 가능한지 확인
  // 안되면 404 띄우기
  if (!isPositiveNumber(eventId)) {
    notFound();
  }

  const { dehydratedState } = await getDehydratedState({
    prefetch: async (qc) =>
      qc.prefetchQuery({
        queryKey: queryKeys.events.detail(eventId, false).queryKey,
        // 서버는 기본적으로 isLoggedIn: false인 상태의 키를 프리페치함
        queryFn: () => getEventDetail(eventId),
      }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<DeferredLoader className="mt-100pxr" size={40} />}>
        <ImageSlider eventId={eventId} />
        <EventDetailContent eventId={eventId} />
      </Suspense>
      {/* 팝업들 */}
      <OnlyScrappedPopup />
    </HydrationBoundary>
  );
};

export default EventDetailPage;
