import { useInfiniteQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { GetEventsParams } from '@features/events/types/api';

import getEvents from '@features/events/apis/get/getEvents';

/**
 * getTestToken을 호출해 이벤트 목록을 가져오는 훅
 */
const useGetEvents = (params: Omit<GetEventsParams, 'cursor'>) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKeys.events.list(params).queryKey,
    queryFn: ({ pageParam }) => getEvents({ ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
};

export default useGetEvents;
