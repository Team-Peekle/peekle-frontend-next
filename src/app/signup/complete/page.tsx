'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Cta from '@common/components/btn/Cta/Cta.client';

import { useOauthInfo } from '@features/sign/hooks/useOauthInfo';

import { getUsersMeOptions } from '@features/sign/api/user';

export default function SignupCompletePage() {
  const router = useRouter();

  // const { data: userData } = useSuspenseQuery(getUsersMeOptions());

  // 인증된 쿼리 대신 임시 토큰 정보를 사용
  const oauthInfo = useOauthInfo();
  const nickname = oauthInfo?.name;

  // 새로고침 등으로 토큰이 누락되거나 유효하지 않은 경우를 처리
  if (!nickname) {
    // ...
  }

  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center">
        <Image src="/images/signup/signup-complete.png" alt="complete" width={400} height={279} />
        <h1 className="text-h3 text-center text-gray-900">
          {/* <span className="text-primary-500">{userData.nickname}님 환영합니다</span> */}
          <span className="text-primary-500">{nickname}님 환영합니다</span>
          <br />
          가입을 환영합니다!
        </h1>
        <Cta
          className={cn('max-mb:w-full mt-[72px] w-[600px]')}
          type="submit"
          text="시작하기"
          onClick={() => router.push(ROUTES.ROOT)}
        />
      </main>
    </div>
  );
}
