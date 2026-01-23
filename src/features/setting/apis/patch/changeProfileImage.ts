import { authenticatedClientFetcher } from '@common/libs/api/client';

import { ChangeProfileImageResponseSchema } from '@features/setting/schemas/api/user';
import { UpdateProfileImageRequestDTO } from '@features/setting/schemas/api/user';

import { USER_API_ENDPOINTS } from '../../constants/apiEndPoints';

/**
 * 프로필 사진 변경 함수
 *
 * @param {Final} profileImages - 변경할 프로필 이미지 배열
 *
 */
export default function changeProfileImage(profileImages: UpdateProfileImageRequestDTO[]) {
  const response = authenticatedClientFetcher(
    USER_API_ENDPOINTS.PROFILE_IMG_CHANGE,
    ChangeProfileImageResponseSchema,
    {
      method: 'PATCH',
      json: { profileImages },
    },
  );

  return response;
}
