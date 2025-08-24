'use client';

import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

import Google from '@common/components/svg/Google';
import Kakao from '@common/components/svg/Kakao';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Cta from '@/sign/components/SignButton.client';

export default function SigninPage() {
  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/signup',
        redirect: false,
      });

      if (result?.error) {
        alert('로그인에 실패했습니다: ' + result.error);
      } else if (result?.ok) {
        window.location.href = '/signup';
      }
    } catch (_error) {
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <SessionProvider>
      <div>
        <DefaultNavbar />
        <main className="mt-114pxr flex flex-col items-center gap-4">
          <Image src="/images/signin/signin.png" alt="signin" width={138} height={144} />
          <h1 className="text-h2 text-gray-900">액티브 시니어 정보 플랫폼, 피클</h1>
          <p className="text-16m text-center text-gray-500">
            5초 안에 로그인/회원가입하고
            <br />
            다양한 이벤트와 커뮤니티에 참여해보세요
          </p>
        </main>
        <footer className="p-16pxr mt-32pxr gap-16pxr flex flex-col items-center">
          <Cta
            className="text-p16sb px-106pxr max-mb:px-70pxr w-fit cursor-pointer gap-[8px] bg-[#FEE500] text-gray-900"
            onClick={() => handleSocialLogin('kakao')}
          >
            <Kakao className="size-6 text-black" /> 카카오계정으로 계속하기
          </Cta>
          <Cta
            className="text-p16sb px-116pxr max-mb:px-80pxr w-fit cursor-pointer gap-[8px] bg-gray-100 text-gray-900"
            onClick={() => handleSocialLogin('google')}
          >
            <Google className="size-5" /> 구글계정으로 계속하기
          </Cta>
        </footer>
      </div>
    </SessionProvider>
  );
}
