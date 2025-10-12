import { Suspense } from 'react';

import { HydrationBoundary } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import getDehydratedState from '@common/libs/react-query/dehydrate';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import getEventDetail from '@features/events/apis/get/getEventDetail';

import EventDetailContent from '@features/events/components/EventDetailContent/EventDetailContent.client';
import ImageSlider from '@features/events/components/ImageSlider/ImageSlider.client';

const EventDetailPage = async ({ params }: { params: Promise<{ [key: string]: string }> }) => {
  const { eventId } = await params;

  const { dehydratedState } = await getDehydratedState({
    prefetch: async (qc) =>
      qc.prefetchQuery({
        queryKey: queryKeys.events.detail(eventId).queryKey,
        queryFn: () => getEventDetail(eventId),
      }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <ImageSlider eventId={eventId} />
      <Suspense fallback={<DeferredLoader />}>
        <EventDetailContent eventId={eventId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default EventDetailPage;
