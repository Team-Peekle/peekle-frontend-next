'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { setCookie } from 'cookies-next';

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<OAuthCallbackLoading />}>
      <OAuthCallbackHandler />
    </Suspense>
  );
}

function OAuthCallbackLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">로그인 처리 중...</p>
    </div>
  );
}

function OAuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    const registerToken = searchParams.get('registerToken');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (type === 'login') {
      if (accessToken) {
        setCookie('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 3, path: '/' });
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 15, path: '/' });
      }
      router.push('/');
    } else if (type === 'register') {
      if (registerToken) {
        localStorage.setItem('type', type);
        setCookie('registerToken', registerToken, { maxAge: 60 * 60 * 24, path: '/' });
      }
      router.push('/signup');
    } else {
      router.push('/signin');
    }
  }, [router, searchParams]);

  return null;
}
