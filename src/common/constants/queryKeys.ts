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
    list: (params: GetEventsParams, isLoggedIn: boolean) => [params, isLoggedIn],
    detail: (eventId: string, isLoggedIn: boolean) => [eventId, isLoggedIn],
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
    withdraw: null,
    nicknameCheck: (nickname: string) => [nickname],
  },
});

export default queryKeys;
