'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SessionProvider, useSession } from 'next-auth/react';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

function SignupContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 로그인되지 않은 상태라면 signin 페이지로 리다이렉트
    if (status === 'unauthenticated') {
      router.push('/signin');
    }

    // 로그인 성공 시 accessToken 콘솔에 출력
    if (session) {
      console.log('=== 소셜 로그인 정보 ===');
      console.log('Provider:', (session as any).provider);
      console.log('Access Token:', (session as any).accessToken);
      console.log('User Info:', session.user);
      console.log('Full Session:', session);
    }
  }, [status, router, session]);

  // 로딩 중일 때
  if (status === 'loading') {
    return (
      <div>
        <DefaultNavbar />
        <main className="mt-32pxr p-16pxr flex flex-col items-center">
          <p>로딩 중...</p>
        </main>
      </div>
    );
  }

  // 로그인되지 않은 상태
  if (!session) {
    return (
      <div>
        <DefaultNavbar />
        <main className="mt-32pxr p-16pxr flex flex-col items-center">
          <p>로그인이 필요합니다.</p>
        </main>
      </div>
    );
  }

  // 회원가입 완료 처리 (실제로는 백엔드 API 호출)
  const handleCompleteSignup = async () => {
    try {
      // 여기서 백엔드에 사용자 정보 전송
      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: session.user?.name,
      //     email: session.user?.email,
      //     provider: (session as any).provider,
      //     accessToken: (session as any).accessToken,
      //   })
      // });

      // 임시로 완료 페이지로 이동
      router.push('/signup/complete');
    } catch (error) {
      console.error('회원가입 처리 오류:', error);
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center gap-6">
        <h1 className="text-h2 text-gray-900">회원가입</h1>

        {/* 사용자 정보 표시 */}
        <div className="w-full max-w-md rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-semibold">소셜 로그인 정보</h2>

          {session.user?.image && (
            <div className="mb-4 flex justify-center">
              <img
                src={session.user.image}
                alt="프로필"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          )}

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">이름:</span> {session.user?.name}
            </p>
            <p>
              <span className="font-medium">이메일:</span> {session.user?.email}
            </p>
            <p>
              <span className="font-medium">로그인 방식:</span> {(session as any).provider}
            </p>
            {(session as any).accessToken && (
              <p>
                <span className="font-medium">액세스 토큰:</span>{' '}
                {((session as any).accessToken as string).substring(0, 10)}...
              </p>
            )}
          </div>
        </div>

        {/* 회원가입 완료 버튼 */}
        <button
          onClick={handleCompleteSignup}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-8 py-3 font-medium text-white transition-colors"
        >
          회원가입 완료
        </button>
      </main>
    </div>
  );
}

export default function SignupPage() {
  return (
    <SessionProvider>
      <SignupContent />
    </SessionProvider>
  );
}
