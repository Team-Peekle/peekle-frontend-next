'use client';

// import { useRouter } from 'next/navigation';
import { useAccessTokenClient } from '../auth';
import { baseApi } from './common';

// import { ROUTES } from '@common/constants/routes';

/** 클라이언트 환경에서만 사용되는 API 인스턴스 */
export const useAuthenticatedApi = () => {
  const accessToken = useAccessTokenClient();
  // const router = useRouter();

  return baseApi.extend({
    prefixUrl: '/api',
    hooks: {
      beforeRequest: [
        async (request) => {
          if (accessToken) {
            request.headers.set('Authorization', `Bearer ${accessToken}`);
          }
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          // 401 Unauthorized 응답 처리
          if (response.status === 401) {
            // router.push(ROUTES.SIGN_IN);
          }
        },
      ],
    },
  });
};
