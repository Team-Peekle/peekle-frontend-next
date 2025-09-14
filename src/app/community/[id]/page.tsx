'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@lib/utils';

import { ProfileVariant } from '@common/types/profile';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Profile from '@common/components/Profile.server';

import DetailNavbar from '@common/layout/DetailNavbar.client';
import Navbar from '@common/layout/Navbar.client';

export default function CommunityDetailPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <div className="flex w-full flex-col">
      {isMobile ? <></> : <Navbar />}
      <main className="flex w-full flex-row items-start gap-[64px] px-[16px] pt-4">
        <section className="max-mb:hidden flex min-w-[280px] flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2.5">
            <Profile variant={ProfileVariant.SIZE_40} />
            <p className="text-p17b">피클1135</p>
          </div>
          <button className="text-p15b flex h-fit w-fit flex-row justify-items-center rounded-[8px] border-1 border-solid px-4 py-[7px]">
            글쓰기
          </button>
        </section>
        <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
          <DetailNavbar />
        </section>
      </main>
    </div>
  );
}
