'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { loginStore } from '@common/stores/loginStore';

import { getTestTokenOptions } from '@features/sign/query/options/auth';

function TestTokenContent() {
  const router = useRouter();
  const { data } = useSuspenseQuery(getTestTokenOptions('1'));

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);

      loginStore.getState().login();
    }
  }, [data, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">테스트 토큰 발급 중...</p>
    </div>
  );
}

export default function TestTokenPage() {
  return <TestTokenContent />;
}
