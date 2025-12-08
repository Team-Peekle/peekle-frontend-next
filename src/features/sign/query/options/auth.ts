import { queryOptions } from '@tanstack/react-query';

import { getTestToken } from '../../api/auth';
import { type AuthTestTokenResponseDTO } from '../../schemas/api/auth';

/**
 * GET /auth/test/token
 * 테스트 토큰 생성 API queryOptions
 * @param userId - 토큰을 생성할 사용자 ID
 */
export const getTestTokenOptions = (userId: string) => {
  return queryOptions<AuthTestTokenResponseDTO>({
    queryKey: ['auth', 'test', 'token', userId],
    queryFn: () => getTestToken(userId),
  });
};
