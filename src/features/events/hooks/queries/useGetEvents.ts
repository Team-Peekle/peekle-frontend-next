import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { fetcher } from '@common/libs/api/common';

import { loginStore } from '@common/stores/loginStore';

import { GetEventsParams } from '@features/events/types/api';

import getEvents from '@features/events/apis/get/getEvents';

/**
 * getEvents를 호출해 이벤트 목록을 가져오는 훅
 */
const useGetEvents = (params: Omit<GetEventsParams, 'cursor'>) => {
  const { isLoggedIn } = loginStore();
  // 로그인 여부에 따라 사용할 fetcher 결정
  const currentFetcher = isLoggedIn ? authenticatedClientFetcher : fetcher;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: queryKeys.events.list(params, isLoggedIn).queryKey,
      queryFn: ({ pageParam }) => getEvents({ ...params, cursor: pageParam }, currentFetcher),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    });

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
};

export default useGetEvents;
