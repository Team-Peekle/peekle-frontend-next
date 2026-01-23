import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import {
  GetUsersMeResponseDTO,
  UpdateProfileImageRequestDTO,
} from '@features/setting/schemas/api/user';

import changeProfileImage from '@features/setting/apis/patch/changeProfileImage';

/**
 * 프로필 이미지를 변경하는 훅
 */
export default function useChangeProfileImage() {
  const qc = useQueryClient();
  const userKey = queryKeys.user.me.queryKey;

  // 현재 상태(nickname)를 받아서 API를 분기
  return useMutation({
    mutationKey: queryKeys.user.nicknameChange.queryKey,

    mutationFn: ({ newProfileImages }: { newProfileImages: UpdateProfileImageRequestDTO[] }) =>
      changeProfileImage(newProfileImages),

    // 낙관적 업데이트
    onMutate: async ({
      newProfileImages,
    }: {
      newProfileImages: UpdateProfileImageRequestDTO[];
    }) => {
      // 진행 중인 쿼리 취소 (덮어쓰기 방지)
      await qc.cancelQueries({ queryKey: userKey });
      // 이전 데이터 스냅샷 (롤백용)
      const prev = qc.getQueryData<GetUsersMeResponseDTO>(userKey);

      // 캐시 강제 업데이트
      if (prev) {
        qc.setQueryData<GetUsersMeResponseDTO>(userKey, {
          ...prev,
          profileImages: newProfileImages.map((img, idx) => ({
            ...img,
            id: `temp-${idx}`, // 낙관적 업데이트를 위한 임시 ID 부여
          })),
        });
      }

      // 롤백용 컨텍스트 반환 (onError에서 사용)
      return { prev };
    },

    // 에러 발생 시 롤백
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData(userKey, context.prev);
      }
    },

    // 성공/실패 관계없이 최신 데이터 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: userKey });
    },
  });
}
