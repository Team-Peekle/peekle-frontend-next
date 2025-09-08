import ky from 'ky';
import { z } from 'zod';

import { failSchema, successSchema } from '@common/schemas/api/common';

import ApiError from '@common/utils/ApiError';

const isServer = typeof window === 'undefined';
const baseURL = isServer ? process.env.NEXT_PUBLIC_API_URL : `${window.location.origin}/api`;

/** 인증이 필요 없는 기본 api instance */
export const baseApi = ky.create({
  prefixUrl: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const json = await response.json();

        // 실패 응답 스키마로 먼저 검증
        const failResult = failSchema.safeParse(json);
        if (failResult.success) {
          // 실패 응답일 경우 에러 데이터를 포함하여 에러를 던짐
          const errorData = failResult.data.error;
          throw new ApiError(errorData.errorCode, errorData.reason, errorData.data);
        }

        // 성공 응답 스키마로 검증
        // 성공 시 데이터는 별도의 스키마로 다시 파싱해 사용
        const successResult = successSchema(z.any()).safeParse(json);
        if (!successResult.success) {
          // 성공 응답이 예상과 다른 경우 (스키마 불일치)
          // 바로 로그를 남기고, 에러를 던짐
          console.error('API Response schema 불일치:', successResult.error);
          throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

        return new Response(JSON.stringify(successResult.data.success), {
          status: response.status,
          headers: response.headers,
        });
      },
    ],
  },
});
