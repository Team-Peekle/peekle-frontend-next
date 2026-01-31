'use client';

import { useParams, useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes';

import { useIsMobile } from '@common/hooks/useIsMobile';
import { useModal } from '@common/hooks/useModal';

import { loginStore } from '@common/stores/loginStore';

import Navbar from '@common/layout/Navbar.client';

import { CommunityArticleModal } from '@features/community/components/CommunityArticleModal';

import ArticleSection from '@app/community/[id]/_components/ArticleSection';
import CommentsSection from '@app/community/[id]/_components/CommentsSection';

import CommunitySidebarProfile from '@/community/components/CommunitySidebarProfile.client';

const DEFAULT_COMMUNITY_ID = '1';

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const articleId = Array.isArray(id) ? id[0] : id;
  const isMobile = useIsMobile();
  const { openModal } = useModal();

  const handleOpenArticleModal = () => {
    if (!loginStore.getState().isLoggedIn) {
      router.push(ROUTES.SIGN_IN);
      return;
    }

    openModal(({ isOpen, onClose }) => (
      <CommunityArticleModal
        isOpen={isOpen}
        onClose={onClose}
        communityId={DEFAULT_COMMUNITY_ID}
        mode="create"
        onSuccess={() => {
          router.push(ROUTES.COMMUNITY);
        }}
      />
    ));
  };

  return (
    <div className="flex w-full flex-col">
      {!isMobile && <Navbar />}
      <main className="flex w-full flex-row items-start gap-[64px] px-[16px] pt-4">
        <section className="max-mb:hidden flex min-w-[280px] flex-row items-center justify-between">
          <CommunitySidebarProfile />
          <button
            onClick={handleOpenArticleModal}
            className="text-p15b flex h-fit w-fit flex-row justify-items-center rounded-[8px] border-1 border-solid px-4 py-[7px]"
          >
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
