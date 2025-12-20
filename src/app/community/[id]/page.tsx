'use client';

import { useParams } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Navbar from '@common/layout/Navbar.client';

import Profile from '@common/components/Profile.server';

import ArticleSection from './_components/ArticleSection';
import CommentsSection from './_components/CommentsSection';

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const articleId = Array.isArray(id) ? id[0] : id;
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-col">
      {!isMobile && <Navbar />}
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
        <div className="flex w-full flex-col gap-[24px]">
          <ArticleSection articleId={articleId} />
          <CommentsSection articleId={articleId} />
        </div>
      </main>
    </div>
  );
}
