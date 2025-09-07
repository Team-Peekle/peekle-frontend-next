import { getAccessTokenServer } from '../auth';
import { baseApi } from './common';

/** 서버 환경에서만 사용되는 API 인스턴스 */
export const authenticatedApi = baseApi.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = await getAccessTokenServer();
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // 401 Unauthorized 응답 처리
        if (response.status === 401) {
          // throw new Error('Unauthorized');
        }
      },
    ],
  },
});
