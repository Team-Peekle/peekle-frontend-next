// import { notFound } from 'next/navigation';

// import { HydrationBoundary } from '@tanstack/react-query';

// import { SearchParamsType } from '@common/types/routes';

// import queryKeys from '@common/constants/queryKeys';

// import { getDehydratedState } from '@common/libs/react-query/dehydrate';

// import { getEventDetail } from '@features/events/hooks/queries/useGetEventDetail';

// import ImageSlider from '@features/events/components/ImageSlider/ImageSlider.client';

// const EventDetailPage = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
//   const { eventId } = await searchParams;

//   // eventId 타입이 string이 아니면 notFound 로 이동
//   if (typeof eventId !== 'string') notFound();

//   const { dehydratedState } = await getDehydratedState({
//     prefetch: async (qc) =>
//       qc.prefetchQuery({
//         queryKey: queryKeys.events.detail(eventId).queryKey,
//         queryFn: () => getEventDetail,
//       }),
//   });

//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <ImageSlider eventId={eventId} />
//     </HydrationBoundary>
//   );
// };

// export default EventDetailPage;
