'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import { useSuspenseQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { getCookie } from 'cookies-next';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Cta from '@common/components/btn/Cta/Cta.client';

import { getUsersMeOptions } from '@features/sign/api/user';

export default function SignupCompletePage() {
  const router = useRouter();

  // 컴포넌트가 렌더링될 때마다 클라이언트 환경에서 쿠키 상태를 확인해 쿼리 실행 여부 결정
  const { data: userData } = useQuery({
    ...getUsersMeOptions(),
    enabled: !!getCookie('accessToken'),
  });

  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center">
        <Image src="/images/signup/signup-complete.png" alt="complete" width={400} height={279} />
        <h1 className="text-h3 text-center text-gray-900">
          {/* <span className="text-primary-500">{userData.nickname}님 환영합니다</span> */}
          <span className="text-primary-500">{userData?.nickname}님 환영합니다</span>
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
