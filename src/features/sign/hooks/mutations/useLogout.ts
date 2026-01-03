import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';
import { ROUTES } from '@common/constants/routes';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import { loginStore } from '@common/stores/loginStore';

import { logout } from '@features/sign/api/auth';

/**
 * 로그아웃 훅
 */
export default function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();
  const addToast = useAddToast();

  return useMutation({
    mutationKey: queryKeys.auth.logout.queryKey,
    mutationFn: logout,
    onSuccess: async () => {
      // 전역 상태 및 쿠키 정리
      loginStore.getState().logout();

      // 유저 데이터 및 모든 캐시 정리
      qc.removeQueries({ queryKey: queryKeys.user._def });
      qc.clear();

      // 로그아웃 완료 후 메인 페이지로 이동
      router.replace(ROUTES.ROOT);
    },
    onError: (error) => {
      console.error('로그아웃 중 오류 발생:', error);
      addToast({ text: '로그아웃에 실패했습니다. 다시 시도해 주세요.' });
    },
  });
}
