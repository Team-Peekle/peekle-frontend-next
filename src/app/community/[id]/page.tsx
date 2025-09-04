'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Profile from '@common/components/Profile.server';

import DetailNavbar from '@common/layout/DetailNavbar.client';
import Navbar from '@common/layout/Navbar.client';

import PublishInfoCard from '@/community/components/PublishInfoCard.server';

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
          <div className="flex flex-col gap-[20px] border-b-1 border-gray-100">
            <PublishInfoCard name="피클1135" date="2025.08.29" />
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="community"
              width={400}
              height={300}
              className="h-auto w-full rounded-[16px]"
            />
            <div className="flex flex-col gap-[6px]">
              <h1 className="text-p18 text-gray-900">"다들 취미가 뭐세요?"</h1>
              <p className="text-p14">취미를 소개해보세요!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
