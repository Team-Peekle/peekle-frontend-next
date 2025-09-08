// common/apis/get/getEventsServer.ts
import { Options } from 'ky';

import { authenticatedServerFetcher } from '@common/libs/api/server';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';
import { getEventsSchema } from '../../schemas/getEventsSchema';

/**
 * 이벤트 목록을 서버 환경에서 조회하는 함수
 *
 * @param {Options} options - ky 요청 옵션
 */
export async function getEventsServer(options: Options) {
  const fetcher = await authenticatedServerFetcher;

  return fetcher(EVENTS_API_ENDPOINTS.EVENTS, options, getEventsSchema);
}
