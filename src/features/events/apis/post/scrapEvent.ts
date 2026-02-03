import { authenticatedClientFetcher } from '@common/libs/api/client';

import { scrapEventSchema } from '@features/events/schemas/scrapEventSchema';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';

/**
 * 이벤트 찜하기 (Scrap) 함수
 *
 * 지정된 이벤트(`eventId`)를 찜합니다.
 * 응답 바디가 없으므로 z.any()로 처리합니다.
 *
 * @param {string} eventId - 찜할 이벤트 ID
 *
 */
export default function scrapEvent(eventId: string) {
  const response = authenticatedClientFetcher(
    EVENTS_API_ENDPOINTS.SCRAP(eventId),
    scrapEventSchema,
    {
      method: 'post',
    },
  );

  return response;
}
