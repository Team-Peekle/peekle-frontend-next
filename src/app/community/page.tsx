'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Footer from '@common/layout/Footer/Footer.client';
import Navbar from '@common/layout/Navbar.client';

import Profile from '@common/components/Profile.server';
import { Comment } from '@common/components/svg/Comment';

import { CommunityCard } from '@/community/components/CommunityCard';
import CommunityTabs from '@/community/components/CommunityTabs.client';

import { ProfileVariant } from '../../common/types/profile';
import { MOCKUP_DATA } from './mockup';

export default function CommunityPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-[26px]">
      <Navbar />
      <article className="flex h-[250px] w-full items-center justify-start bg-gradient-to-r from-[#f7fff9] from-0% to-[#ceced2] to-100%">
        <h2
          className={cn(
            'p-[16px] text-[32px] leading-[1.6em] font-bold tracking-tight',
            isMobile && 'text-p20',
          )}
        >
          배움·일·일상 이야기를
          <br />
          익명으로 자유롭게 나눠요.
        </h2>
      </article>
      <main className="flex w-full flex-row items-start gap-[64px] px-[16px]">
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
          <Suspense fallback={<div className="h-10 w-full" />}>
            <CommunityTabs />
          </Suspense>
          {MOCKUP_DATA.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-3 py-[131px]">
              <Comment className="size-12 text-gray-200" />
              <p className="text-p16m text-gray-600">게시글이 없습니다.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {MOCKUP_DATA.map((post) => (
                <CommunityCard
                  key={post.id}
                  post={post}
                  onClick={() => router.push(`/community/${post.id}`)}
                  onLikeClick={(id) => console.log(`게시글 ${id} 좋아요 클릭`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
