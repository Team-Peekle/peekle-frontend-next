import { useSuspenseQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { fetcher } from '@common/libs/api/common';

import { loginStore } from '@common/stores/loginStore';

import getEventDetail from '@features/events/apis/get/getEventDetail';

/**
 * 이벤트 상세 정보를 가져오는 훅
 */
export default function useGetEventDetail(eventId: string) {
  const { isLoggedIn } = loginStore();
  // 로그인 여부에 따라 fetcher 결정
  const currentFetcher = isLoggedIn ? authenticatedClientFetcher : fetcher;
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.events.detail(eventId, isLoggedIn).queryKey,
    queryFn: () => getEventDetail(eventId, currentFetcher),
  });

  return { eventDetail: data.event };
}
