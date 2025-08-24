'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SessionProvider, useSession } from 'next-auth/react';

import { cn } from '@lib/utils';

import Cta from '@common/components/btn/Cta/Cta.client';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

export default function SignupCompletePage() {
  return (
    <SessionProvider>
      <SignupCompleteContent />
    </SessionProvider>
  );
}

function SignupCompleteContent() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center">
        <Image src="/images/signup/signup-complete.png" alt="complete" width={400} height={279} />
        <h1 className="text-h3 text-center text-gray-900">
          <span className="text-primary-500">{session?.user?.name ?? ''}</span>님<br />
          가입을 환영합니다!
        </h1>
        <Cta
          className={cn('max-mb:w-full mt-[72px] w-[600px]')}
          type="submit"
          text="시작하기"
          onClick={() => router.push('/')}
        />
      </main>
    </div>
  );
}
