import { fetcher } from '@common/libs/api/common';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';
import { getEventDetailSchema } from '../../schemas/getEventDetailSchema';

/**
 * 이벤트 디테일 조회 함수
 */
export default async function getEventDetail(eventId: string, fetcherFn: typeof fetcher = fetcher) {
  return fetcherFn(EVENTS_API_ENDPOINTS.EVENT_DETAIL(eventId), getEventDetailSchema);
}
