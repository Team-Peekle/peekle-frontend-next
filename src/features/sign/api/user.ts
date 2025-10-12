import { queryOptions } from '@tanstack/react-query';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { fetcher } from '@common/libs/api/common';

import {
  type GetUsersMeResponseDTO,
  type GetUsersNicknameCheckResponseDTO,
  getUsersMeResponseSchema,
  getUsersNicknameCheckResponseSchema,
} from '../schemas/api/user';

/**
 * GET /users/me
 * 내 정보 조회
 *
 * 인증된 사용자의 정보를 조회합니다.
 */
export const getUsersMeOptions = () => {
  return queryOptions<GetUsersMeResponseDTO>({
    queryKey: ['users', 'me'],
    queryFn: () =>
      authenticatedClientFetcher('v1/users/me', getUsersMeResponseSchema, { method: 'GET' }),
  });
};

/**
 * GET /users/nickname/check
 * 닉네임 중복 확인
 *
 * 닉네임 사용 가능 여부를 확인합니다.
 */
export const getUsersNicknameCheckOptions = (nickname: string) => {
  return queryOptions<GetUsersNicknameCheckResponseDTO>({
    queryKey: ['users', 'nickname', 'check', nickname],
    queryFn: () =>
      fetcher('v1/users/nickname/check', getUsersNicknameCheckResponseSchema, {
        method: 'GET',
        searchParams: { nickname: nickname.trim() },
      }),
    enabled: !!nickname && nickname.trim().length > 0,
  });
};
