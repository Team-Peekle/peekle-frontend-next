import ky, { Options } from 'ky';
import { z } from 'zod';

import { apiResponseSchema, failSchema } from '@common/schemas/api';

import ApiError from '@common/utils/ApiError';

type SearchParamsValue = string | number | boolean | undefined;
type CustomSearchParamsValue = SearchParamsValue | SearchParamsValue[];
type CustomSearchParamsOption =
  | string
  | string[][]
  | URLSearchParams
  | undefined
  | Record<string, CustomSearchParamsValue>;
export type FetcherOptions = Omit<Options, 'searchParams'> & {
  searchParams?: CustomSearchParamsOption;
};

/**
 * 인증이 필요 없는 기본 api instance
 */
export const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * api 요청을 하고, Zod schema로 유효성 검사를 하는 함수
 *
 * @template T - 성공시 data를 검증할 Zod 스키마 타입
 * @param {string} url - api endpoint URL
 * @param {T} schema - 성공시 data를 검증할 Zod 스키마
 * @param {FetcherOptions} [options] - Ky request options
 * @param {ky} [apiInstance] - 요청에 사용할 ky instance
 * @returns {Promise<z.infer<T>>} - 검증된 응답 데이터
 */
export const fetcher = async <T extends z.ZodTypeAny>(
  url: string,
  schema: T,
  options?: FetcherOptions,
  apiInstance?: typeof ky,
): Promise<z.infer<T>> => {
  // apiInstance가 없으면 기본 인스턴스 사용
  if (!apiInstance) {
    apiInstance = baseApi;
  }
  const response = await apiInstance(url, options as Options).json();

  // api 응답 스키마로 먼저 검증
  const result = apiResponseSchema(schema).safeParse(response);
  if (!result.success) {
    console.error('API 응답 형식이 올바르지 않습니다:', result.error);
    throw new Error('API 응답 형식이 올바르지 않습니다.');
  }

  const responseData = result.data;
  // 실패 응답일 경우 에러 데이터를 포함하여 에러를 던짐
  if (!responseData.status) {
    const errorData = (responseData as z.infer<typeof failSchema>).error;
    throw new ApiError(errorData.errorCode, errorData.reason, errorData.data);
  }

  // 성공 응답이면 response.data 반환
  if ('data' in responseData) {
    const validatedData = schema.parse(responseData.data);
    return validatedData;
  }
  throw new Error('Response data가 없습니다.');
};
