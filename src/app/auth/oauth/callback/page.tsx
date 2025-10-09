'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    const registerToken = searchParams.get('registerToken');

    if (type === 'login') {
      router.push('/');
    } else if (type === 'register') {
      if (registerToken) {
        localStorage.setItem('registerToken', registerToken);
      }
      router.push('/signup');
    } else {
      router.push('/signin');
    }
  }, [router, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">로그인 처리 중...</p>
    </div>
  );
}
