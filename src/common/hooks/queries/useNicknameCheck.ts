import { useQuery } from '@tanstack/react-query';

import { getUsersNicknameCheckOptions } from '@common/apis/get/userOptions';

/**
 * 닉네임 중복 체크를 위한 커스텀 훅
 */
export default function useNicknameCheck(nickname: string, hasError?: boolean) {
  const trimmedNickname = nickname.trim();

  return useQuery({
    ...getUsersNicknameCheckOptions(trimmedNickname),
    enabled: trimmedNickname.length > 0 && !hasError,
    staleTime: 1000 * 60 * 5, // 5분
  });
}
