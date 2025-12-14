import { queryOptions } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { fetcher } from '@common/libs/api/common';

import { USER_API_ENDPOINTS } from '../../constants/apiEndPoints';
import {
  type GetUsersMeResponseDTO,
  type GetUsersNicknameCheckResponseDTO,
  getUsersMeResponseSchema,
  getUsersNicknameCheckResponseSchema,
} from '../../schemas/api/user';

/**
 * GET /users/me
 * 내 정보 조회
 *
 * 인증된 사용자의 정보를 조회합니다.
 */
export const getUsersMeOptions = () => {
  return queryOptions<GetUsersMeResponseDTO>({
    queryKey: queryKeys.user.me.queryKey,
    queryFn: () =>
      authenticatedClientFetcher(USER_API_ENDPOINTS.USER_DATA, getUsersMeResponseSchema, {
        method: 'GET',
      }),
  });
};

/**
 * GET /users/nickname/check
 * 닉네임 중복 확인
 *
 * 닉네임 사용 가능 여부를 확인합니다.
 */
export const getUsersNicknameCheckOptions = (nickname: string) => {
  const trimmedNickname = nickname.trim();
  return queryOptions<GetUsersNicknameCheckResponseDTO>({
    queryKey: queryKeys.user.nicknameCheck(trimmedNickname).queryKey,
    queryFn: () =>
      fetcher(USER_API_ENDPOINTS.NICKNAME_CHECK, getUsersNicknameCheckResponseSchema, {
        method: 'GET',
        searchParams: { nickname: trimmedNickname },
      }),
    enabled: !!nickname && trimmedNickname.length > 0,
  });
};
