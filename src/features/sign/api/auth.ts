import { UseMutationOptions, queryOptions } from '@tanstack/react-query';

import { deleteCookie, getCookie } from 'cookies-next';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { baseApi, fetcher } from '@common/libs/api/common';

import {
  type AuthOauthRegisterRequestDTO,
  type AuthOauthRegisterResponseDTO,
  type AuthProtectedResponseDTO,
  authOauthRegisterResponseSchema,
  authProtectedResponseSchema,
} from '../schemas/api/auth';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}` || '';

/**
 * GET /v1/auth/protected
 * 토큰 검증 API - JwtGuard를 통과했는지 확인
 */
export const getAuthProtectedOptions = () => {
  return queryOptions<AuthProtectedResponseDTO>({
    queryKey: ['auth', 'protected'],
    queryFn: () =>
      authenticatedClientFetcher('v1/auth/protected', authProtectedResponseSchema, {
        method: 'GET',
      }),
  });
};

/**
 * POST /v1/auth/oauth/register
 * OAuth 사용자 회원가입
 * 기존 인증 방식과 다른 registerToken을 사용하므로 ky instance를 따로 생성
 */
export const postAuthOauthRegisterOptions = (): UseMutationOptions<
  AuthOauthRegisterResponseDTO,
  Error,
  AuthOauthRegisterRequestDTO
> => {
  return {
    mutationFn: async (data: AuthOauthRegisterRequestDTO) => {
      const registerToken = getCookie('registerToken') as string;

      if (!registerToken) {
        throw new Error('RegisterToken이 없습니다.');
      }
      const registerKy = baseApi.extend({
        hooks: {
          beforeRequest: [
            async (request) => {
              request.headers.set('RegisterToken', registerToken);
            },
          ],
        },
      });
      const response = await fetcher(
        'v1/auth/oauth/register',
        authOauthRegisterResponseSchema,
        {
          method: 'POST',
          json: data,
        },
        registerKy,
      );

      return response;
    },
    onSuccess: () => {
      deleteCookie('registerToken');
      // 클라이언트 환경에서만 localStorage 접근
      if (typeof window !== 'undefined') {
        localStorage.removeItem('type');
      }
    },
  };
};

/**
 * GET /v1/auth/google/login
 * Google 인증 페이지로 이동 (로그인 시작)
 */
export const getGoogleLoginUrl = () => {
  return `${API_URL}v2/auth/google/login?frontEnv=${process.env.NEXT_PUBLIC_FRONT_URL}`;
};

/**
 * GET /v1/auth/kakao/login
 * Kakao 인증 페이지로 이동 (로그인 시작)
 */
export const getKakaoLoginUrl = () => {
  return `${API_URL}v1/auth/kakao/login?frontEnv=${process.env.NEXT_PUBLIC_FRONT_URL}`;
};
