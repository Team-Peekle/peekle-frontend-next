'use client';

import { useRouter } from 'next/navigation';

import Cta from '@common/components/btn/Cta/Cta.client';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import DayCard from '@/sign/components/DayCard.server';

export default function AccountDeletedPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <DefaultNavbar />
      <main className="p-16pxr max-mb:w-full mt-12 flex w-[578px] flex-col items-center">
        <h1 className="text-h3 w-full text-gray-800">
          탈퇴한 계정이에요.
          <br />
          재가입 가능 날짜를 확인해주세요.
        </h1>
        <section className="mt-10 flex w-full flex-col gap-4">
          <DayCard title="계정 삭제 일자" date="2025.08.17" />
          <DayCard title="재가입 가능 날짜" date="2025.08.17" />
        </section>
        <Cta className="mt-[72px] w-full" text="홈으로 돌아가기" onClick={() => router.push('/')} />
      </main>
    </div>
  );
}
