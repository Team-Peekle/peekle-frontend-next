'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { z } from 'zod';

import { ROUTES } from '@common/constants/routes';

import { FetcherOptions } from './common';
import { baseApi, fetcher } from './common';

// 인증이 포함된 ky instance (싱글톤)
const authenticatedKy = baseApi.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // 401 Unauthorized 응답 처리
        if (response.status === 401) {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          // 클라이언트 환경에서만 리다이렉트
          if (typeof window !== 'undefined') {
            window.location.href = ROUTES.SIGN_IN;
          }
        }
      },
    ],
  },
});

/**
 * 클라이언트 환경에서 사용하는 인증된 API fetcher
 * 쿠키에서 accessToken을 가져와서 Authorization 헤더에 추가
 */
export const authenticatedClientFetcher = async <T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  options?: FetcherOptions,
) => {
  return fetcher(url, schema, options, authenticatedKy);
};
