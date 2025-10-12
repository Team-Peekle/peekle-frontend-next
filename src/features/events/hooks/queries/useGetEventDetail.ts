import { useSuspenseQuery } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import getEventDetail from '@features/events/apis/get/getEventDetail';

/**
 * 이벤트 상세 정보를 가져오는 훅
 */
export default function useGetEventDetail(eventId: string) {
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.events.detail(eventId).queryKey,
    queryFn: () => getEventDetail(eventId),
  });
  const eventDetail = data?.event;

  return { eventDetail };
}
