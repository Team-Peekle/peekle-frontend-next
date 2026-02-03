'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { setCookie } from 'cookies-next';

import { ROUTES } from '@common/constants/routes';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import { loginStore } from '@common/stores/loginStore';

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useAddToast();

  useEffect(() => {
    const type = searchParams.get('type');
    const registerToken = searchParams.get('registerToken');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const errorCode = searchParams.get('errorCode');

    if (type === 'login') {
      if (accessToken && refreshToken) {
        setCookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 3,
          path: '/',
        });
        setCookie('refreshToken', refreshToken, {
          maxAge: 60 * 60 * 24 * 15,
          path: '/',
        });

        loginStore.getState().login();
        router.push(ROUTES.ROOT);
      } else {
        // 토큰이 없는 비정상 로그인 처리
        console.error('[OAuth-Error] Login type 수신했으나 토큰이 누락되었습니다.', {
          accessToken: !!accessToken,
          refreshToken: !!refreshToken,
        });
        addToast({ text: '인증 토큰이 누락되었습니다.' });
        router.push(ROUTES.SIGN_IN);
      }
    } else if (type === 'register') {
      if (registerToken) {
        localStorage.setItem('type', type);
        setCookie('registerToken', registerToken, {
          maxAge: 60 * 60 * 24,
          path: '/',
        });
        router.push(ROUTES.SIGN_UP);
      } else {
        console.error('[OAuth-Error] Register type 수신했으나 registerToken이 누락되었습니다.');
        addToast({ text: '회원가입 세션이 만료되었거나 올바르지 않습니다.' });
        router.push(ROUTES.SIGN_IN);
      }
    } else if (type === 'error') {
      if (errorCode === 'USER_WITHDRAWN') {
        router.replace(ROUTES.WITHDRAWN);
      }
    } else {
      // 그 외 정의되지 않은 type 처리
      console.error(`[OAuth-Error] 알 수 없는 type이 수신되었습니다: ${type}`);
      addToast({ text: '잘못된 접근입니다. 다시 로그인해주세요.' });
      router.push(ROUTES.SIGN_IN);
    }
  }, [router, searchParams, addToast]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">로그인 처리 중...</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-500">로그인 처리 중...</p>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
