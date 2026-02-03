import { CustomSearchParamsOption, fetcher } from '@common/libs/api/common';

import { GetEventsParams } from '@features/events/types/api';

import { EVENTS_API_ENDPOINTS } from '@features/events/constants/apiEndPoints';

import { getEventsSchema } from '@features/events/schemas/getEventsSchema';

/**
 * 실제 API를 호출하는 함수
 */
export default function getEvents(params: GetEventsParams, fetcherFn: typeof fetcher) {
  return fetcherFn(EVENTS_API_ENDPOINTS.EVENTS, getEventsSchema, {
    searchParams: params as CustomSearchParamsOption,
  });
}
