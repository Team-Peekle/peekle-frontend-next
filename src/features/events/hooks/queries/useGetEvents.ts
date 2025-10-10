import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';

import { GetEventsParams } from '@features/events/types/api';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';
import { getEventsSchema } from '../../schemas/getEventsSchema';

/**
 * getTestToken을 호출해 이벤트 목록을 가져오는 훅
 */
const useGetEvents = (params: Omit<GetEventsParams, 'cursor'>) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.events.list(params).queryKey,
      queryFn: ({ pageParam }) =>
        authenticatedClientFetcher(
          EVENTS_API_ENDPOINTS.EVENTS,
          { searchParams: { ...params, cursor: pageParam } },
          getEventsSchema,
        ),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    });

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
};

export default useGetEvents;
