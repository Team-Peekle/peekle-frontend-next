import { queryOptions } from '@tanstack/react-query';

import { useAuthenticatedApi } from '@common/libs/api/client';

import { type AuthProtectedResponseDTO, authProtectedResponseSchema } from '../types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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
      authenticatedClientFetcher('auth/protected', { method: 'GET' }, authProtectedResponseSchema),
  });
};

/**
 * GET /auth/google/login
 * Google 인증 페이지로 이동 (로그인 시작)
 */
export const getGoogleLoginUrl = () => {
  return `${API_BASE_URL}/auth/google/login`;
};

/**
 * GET /auth/kakao/login
 * Kakao 인증 페이지로 이동 (로그인 시작)
 */
export const getKakaoLoginUrl = () => {
  return `${API_BASE_URL}/auth/kakao/login`;
};

/**
 * GET /auth/google/callback
 * Google 콜백: 사용자 인증 후 토큰 발급
 */
export const getGoogleCallbackUrl = (code?: string) => {
  const baseUrl = `${API_BASE_URL}/auth/google/callback`;
  if (code) {
    return `${baseUrl}?code=${encodeURIComponent(code)}`;
  }
  return baseUrl;
};

/**
 * GET /auth/kakao/callback
 * Kakao 콜백: 사용자 인증 후 토큰 발급
 */
export const getKakaoCallbackUrl = (code?: string) => {
  const baseUrl = `${API_BASE_URL}/auth/kakao/callback`;
  if (code) {
    return `${baseUrl}?code=${encodeURIComponent(code)}`;
  }
  return baseUrl;
};
