import { authenticatedClientFetcher } from '@common/libs/api/client';

import { ChangeNicknameResponseSchema } from '@features/setting/schemas/api/user';

import { USER_API_ENDPOINTS } from '../../constants/apiEndPoints';

/**
 * 닉네임 변경 함수
 *
 * @param {string} nickname - 변경할 nickname
 *
 */
export default function changeNickname(nickname: string) {
  const response = authenticatedClientFetcher(
    USER_API_ENDPOINTS.NICKNAME_CHANGE,
    ChangeNicknameResponseSchema,
    {
      method: 'PATCH',
      json: { nickname },
    },
  );

  return response;
}
