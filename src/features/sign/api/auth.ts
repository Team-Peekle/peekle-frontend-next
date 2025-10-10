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
} from '../types/auth';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}` || '';

/**
 * GET /v1/auth/protected
 * 토큰 검증 API - JwtGuard를 통과했는지 확인
 */
export const getAuthProtectedOptions = () => {
  return queryOptions<AuthProtectedResponseDTO>({
    queryKey: ['auth', 'protected'],
    queryFn: () =>
      authenticatedClientFetcher('auth/protected', { method: 'GET' }, authProtectedResponseSchema),
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
      const response = await fetcher<typeof authOauthRegisterResponseSchema>(
        'auth/oauth/register',
        {
          method: 'POST',
          json: data,
        },
        authOauthRegisterResponseSchema,
        registerKy,
      );

      return response;
    },
    onSuccess: () => {
      deleteCookie('registerToken');
    },
  };
};

/**
 * GET /v1/auth/google/login
 * Google 인증 페이지로 이동 (로그인 시작)
 */
export const getGoogleLoginUrl = () => {
  return `${API_URL}/auth/google/login`;
};

/**
 * GET /v1/auth/kakao/login
 * Kakao 인증 페이지로 이동 (로그인 시작)
 */
export const getKakaoLoginUrl = () => {
  return `${API_URL}/auth/kakao/login`;
};
