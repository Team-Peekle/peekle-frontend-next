'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Cta from '@common/components/btn/Cta/Cta.client';

import { getUsersMeOptions } from '@features/setting/apis/get/userOptions';

export default function SignupCompletePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <DefaultNavbar />
        <main className="mt-32pxr p-16pxr flex flex-col items-center">
          <div className="h-[279px]" />
        </main>
      </div>
    );
  }

  return <SignupCompleteContent />;
}

function SignupCompleteContent() {
  const router = useRouter();
  const { data: userData } = useSuspenseQuery(getUsersMeOptions());

  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center">
        <Image src="/images/signup/signup-complete.png" alt="complete" width={400} height={279} />
        <h1 className="text-h3 text-center text-gray-900">
          <span className="text-primary-500">{userData.nickname}님 환영합니다</span>
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
