import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { ROUTES } from '@common/constants/routes';

import { FetcherOptions } from './common';
import { baseApi, fetcher } from './common';

type AuthenticatedServerFetcher = <T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  options?: FetcherOptions,
) => Promise<z.infer<T>>;

/** 서버 환경에서만 사용되는 fetcher - 쿠키에서 accessToken 가져오기 */
export const authenticatedServerFetcher = (async (): Promise<AuthenticatedServerFetcher> => {
  const authenticatedKy = baseApi.extend({
    hooks: {
      beforeRequest: [
        async (request) => {
          const cookieStore = await cookies();
          const accessToken = cookieStore.get('accessToken')?.value;
          if (accessToken) {
            request.headers.set('Authorization', `Bearer ${accessToken}`);
          }
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          // 401 Unauthorized 응답 처리
          if (response.status === 401) {
            redirect(ROUTES.SIGN_IN);
          }
        },
      ],
    },
  });

  return async <T extends z.ZodTypeAny>(
    url: string,
    schema: T,
    options?: FetcherOptions,
  ): Promise<z.infer<T>> => {
    return fetcher(url, schema, options, authenticatedKy);
  };
})();
