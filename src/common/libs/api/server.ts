import { Options } from 'ky';
import { z } from 'zod';

import { getAccessTokenServer } from '../auth';
import { baseApi, fetcher } from './common';

type AuthenticatedServerFetcher = <T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  options?: Options,
) => Promise<z.infer<T>>;

/** 서버 환경에서만 사용되는 fetcher */
export const authenticatedServerFetcher = (async (): Promise<AuthenticatedServerFetcher> => {
  const authenticatedKy = baseApi.extend({
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

  return async <T extends z.ZodTypeAny>(
    url: string,
    schema: T,
    options?: Options,
  ): Promise<z.infer<T>> => {
    return fetcher(url, schema, options, authenticatedKy);
  };
})();
