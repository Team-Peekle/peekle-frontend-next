import { useInfiniteQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { fetcher } from '@common/libs/api/common';

import { GetEventsParams } from '@features/events/types/api';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';
import { getEventsSchema } from '../../schemas/getEventsSchema';

/**
 * getTestToken을 호출해 이벤트 목록을 가져오는 훅
 */
const useGetEvents = (params: Omit<GetEventsParams, 'cursor'>) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKeys.events.list(params).queryKey,
    queryFn: ({ pageParam }) =>
      fetcher(EVENTS_API_ENDPOINTS.EVENTS, getEventsSchema, {
        searchParams: {
          ...params,
          cursor: pageParam,
        },
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
};

export default useGetEvents;
