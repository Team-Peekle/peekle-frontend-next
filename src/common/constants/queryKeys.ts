import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { GetEventsParams } from '@features/events/types/api';

// 도메인(기능)별로 키를 그룹화합니다.
const queryKeys = createQueryKeyStore({
  auth: {
    all: null,
  },
  events: {
    testToken: null,
    list: (params: GetEventsParams) => [params],
    detail: (eventId: string) => [eventId],
  },
});

export default queryKeys;
