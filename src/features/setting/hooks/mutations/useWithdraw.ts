import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';
import { ROUTES } from '@common/constants/routes';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import { loginStore } from '@common/stores/loginStore';

import { withdraw } from '@features/setting/apis/delete/withdraw';

/**
 * 회원 탈퇴 훅
 */
export default function useWithdraw() {
  const qc = useQueryClient();
  const router = useRouter();
  const addToast = useAddToast();

  return useMutation({
    mutationKey: queryKeys.user.withdraw.queryKey,
    mutationFn: withdraw,
    onSuccess: async () => {
      // 전역 상태 및 쿠키 정리
      loginStore.getState().logout();

      // 모든 캐시 정리
      qc.clear();
      // 진행 중이던 다른 API 요청 삭제
      qc.cancelQueries();

      // 쿼리 파라미터를 붙여서 이동
      router.replace(`${ROUTES.ROOT}?withdraw=success`);
    },
    onError: (error) => {
      console.error('회원 탈퇴 중 오류 발생:', error);
      addToast({ text: '회원 탈퇴에 실패했습니다. 다시 시도해 주세요.' });
    },
  });
}
