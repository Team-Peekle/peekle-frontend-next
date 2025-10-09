import { queryOptions } from '@tanstack/react-query';

import { useAuthenticatedApi } from '@common/libs/api/client';

import { type AuthProtectedResponseDTO, authProtectedResponseSchema } from '../types/auth';

/**
 * GET /v1/auth/protected
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
