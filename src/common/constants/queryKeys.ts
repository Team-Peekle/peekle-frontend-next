import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// 도메인(기능)별로 키를 그룹화합니다.
const queryKeys = createQueryKeyStore({
  auth: {
    all: null,
  },
  events: {
    testToken: null,
    list: (params) => [params],
    detail: (eventId: string) => [eventId],
  },
});

export default queryKeys;
