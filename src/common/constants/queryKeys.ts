import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { GetEventsParams } from '@features/events/types/api';

import { GetCommunityArticlesParams } from '@features/community/schema';

// 도메인(기능)별로 키를 그룹화합니다.
const queryKeys = createQueryKeyStore({
  auth: {
    all: null,
    logout: null,
  },
  events: {
    testToken: null,
    list: (params: GetEventsParams) => [params],
    detail: (eventId: string) => [eventId],
    scrap: (eventId: string) => [eventId],
  },
  community: {
    list: (communityId: string, params: GetCommunityArticlesParams = {}) => [communityId, params],
    detail: (articleId: string) => [articleId],
    comments: (articleId: string) => [articleId],
  },
  user: {
    me: null,
    nicknameChange: null,
    nicknameCheck: (nickname: string) => [nickname],
  },
});

export default queryKeys;
