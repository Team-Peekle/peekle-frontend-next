import { UseMutationOptions, queryOptions } from '@tanstack/react-query';

import { useAuthenticatedApi } from '@common/libs/api/client';
import { baseApi, fetcher } from '@common/libs/api/common';

import {
  type AuthOauthRegisterRequestDTO,
  type AuthOauthRegisterResponseDTO,
  type AuthProtectedResponseDTO,
  authOauthRegisterResponseSchema,
  authProtectedResponseSchema,
} from '../types/auth';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1` || '';

/**
 * GET /auth/protected
 * 토큰 검증 API - JwtGuard를 통과했는지 확인
 */
export const getAuthProtectedOptions = (
  authenticatedClientFetcher: ReturnType<typeof useAuthenticatedApi>,
) => {
  return queryOptions<AuthProtectedResponseDTO>({
    queryKey: ['auth', 'protected'],
    queryFn: () =>
      authenticatedClientFetcher(
        '/v1/auth/protected',
        { method: 'GET' },
        authProtectedResponseSchema,
      ),
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
      const registerToken =
        typeof window !== 'undefined' ? localStorage.getItem('registerToken') : null;

      if (!registerToken) {
        throw new Error('RegisterToken이 없습니다.');
      }
      const registerKy = baseApi.extend({
        credentials: 'include',
        hooks: {
          beforeRequest: [
            async (request) => {
              request.headers.set('RegisterToken', registerToken);
            },
          ],
        },
      });
      const response = await fetcher<typeof authOauthRegisterResponseSchema>(
        '/v1/auth/oauth/register',
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('registerToken');
      }
    },
  };
};

/**
 * GET /v1/auth/google/login
 * Google 인증 페이지로 이동 (로그인 시작)
 */
export const getGoogleLoginUrl = () => {
  return `${API_BASE_URL}/auth/google/login`;
};

/**
 * GET /v1/auth/kakao/login
 * Kakao 인증 페이지로 이동 (로그인 시작)
 */
export const getKakaoLoginUrl = () => {
  return `${API_BASE_URL}/auth/kakao/login`;
};
