import { notFound } from 'next/navigation';

import ky, { HTTPError, Options } from 'ky';
import { z } from 'zod';

import { apiResponseSchema, failSchema } from '@common/schemas/api';

import ApiError from '@common/utils/ApiError';

type SearchParamsValue = string | number | boolean | undefined;
type CustomSearchParamsValue = SearchParamsValue | SearchParamsValue[];
export type CustomSearchParamsOption =
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
  const instance = apiInstance ?? baseApi;

  try {
    const responseRaw = await instance(url, options as Options);
    // 응답 바디 읽기 (비어있을 경우 대비)
    const text = await responseRaw.text();
    // 바디가 비어있다면 공통 규격에 맞춘 기본 객체 생성, 있다면 파싱
    const response = text
      ? JSON.parse(text)
      : {
          status: true,
          statusCode: responseRaw.status,
          message: 'No Content',
          data: {},
        };

    // 공통 api 응답 스키마로 먼저 검증
    const result = apiResponseSchema(schema).safeParse(response);
    if (!result.success) {
      console.error('API 응답 형식이 올바르지 않습니다:', result.error);
      throw new Error('API 응답 형식이 올바르지 않습니다.');
    }

    const responseData = result.data;
    // 실패 응답일 경우 에러 데이터를 포함하여 에러를 던짐
    if (!responseData.status) {
      // const errorData = (responseData as z.infer<typeof failSchema>).error;
      // throw new ApiError(errorData.errorCode, errorData.reason, errorData.data);
      throw new ApiError(String(responseData.statusCode), responseData.message, responseData.data);
    }

    // 성공 응답이면 response.data 반환 (data가 없으면 빈 객체 반환)
    const validatedData = responseData.data ?? {};
    return schema.parse(validatedData);
  } catch (error) {
    if (error instanceof HTTPError) {
      // 404 에러 처리
      if (error instanceof HTTPError && error.response.status === 404) {
        notFound();
      }
      // 나머지 에러 처리
      // 서버가 보낸 에러 JSON 읽기
      try {
        const errorJson = await error.response.json();

        throw new ApiError(
          String(errorJson.statusCode),
          errorJson.message ?? error.message,
          errorJson.data,
        );
      } catch (parseError) {
        // 본문이 JSON이 아니거나 파싱 실패 시 원본 에러 던짐
        if (parseError instanceof ApiError) throw parseError;
        throw error;
      }
    }
    // 다른 에러는 그대로 throw
    throw error;
  }
};
