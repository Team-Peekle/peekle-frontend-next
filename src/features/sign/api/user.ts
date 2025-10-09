import { queryOptions } from '@tanstack/react-query';

import { useAuthenticatedApi } from '@common/libs/api/client';

import { type GetUsersMeResponseDTO, getUsersMeResponseSchema } from '../types/user';

/**
 * GET /users/me
 * 내 정보 조회
 *
 * 인증된 사용자의 정보를 조회합니다.
 */
export const getUsersMeOptions = (
  authenticatedClientFetcher: ReturnType<typeof useAuthenticatedApi>,
) => {
  return queryOptions<GetUsersMeResponseDTO>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      authenticatedClientFetcher('users/me', { method: 'GET' }, getUsersMeResponseSchema),
  });
};
