'use client';

// import { useRouter } from 'next/navigation';
import { Options } from 'ky';
import { z } from 'zod';

import { useAccessTokenClient } from '../auth';
import { baseApi, fetcher } from './common';

// import { ROUTES } from '@common/constants/routes';

/** 클라이언트 환경에서만 사용되는 authenticatedClientFetcher를 반환하는 훅 */
export const useAuthenticatedApi = () => {
  const accessToken = useAccessTokenClient();
  // const router = useRouter();

  // 인증 포함된 instance를 훅 안에서 생성
  const authenticatedKy = baseApi.extend({
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
            // router.push(ROUTES.ROOT);
          }
        },
      ],
    },
  });

  /**
   * authenticated ky instance를 사용하는 fetcher 함수
   */
  const authenticatedClientFetcher = async <T extends z.ZodTypeAny>(
    url: string,
    schema: T,
    options?: Options,
  ) => {
    return fetcher(url, schema, options, authenticatedKy);
  };

  return authenticatedClientFetcher;
};
