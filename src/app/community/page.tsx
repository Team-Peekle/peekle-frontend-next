'use client';

import { Suspense, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { format } from 'date-fns';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';
import { useModal } from '@common/hooks/useModal';

import { loginStore } from '@common/stores/loginStore';

import Footer from '@common/layout/Footer/Footer.client';
import Navbar from '@common/layout/Navbar.client';

import { Comment } from '@common/components/svg/Comment';

import { CommunityArticleModal } from '@features/community/components/CommunityArticleModal';

import {
  getCommunityArticlesOptions,
  likeCommunityArticle,
  unlikeCommunityArticle,
} from '@features/community/api';

import { CommunityCard } from '@/community/components/CommunityCard';
import CommunitySidebarProfile from '@/community/components/CommunitySidebarProfile.client';
import CommunityTabs from '@/community/components/CommunityTabs.client';

const DEFAULT_LIMIT = 10;
const DEFAULT_COMMUNITY_ID = '1';

type HttpErrorLike = Error & { response?: Response };

const isHttpError = (error: unknown): error is HttpErrorLike =>
  error instanceof Error && 'response' in error && error.response instanceof Response;

interface CommunityPageContentProps {
  onOpenArticleModal?: () => void;
}

function CommunityPageContent({ onOpenArticleModal }: CommunityPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const pageParam = Number(searchParams.get('page'));
  const limitParam = Number(searchParams.get('limit'));
  const filterTypeParam = searchParams.get('filterType');

  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const limit = Number.isNaN(limitParam) || limitParam < 1 ? DEFAULT_LIMIT : limitParam;
  const filterType =
    filterTypeParam && ['ALL', 'LIKE', 'MY', 'COMMENT'].includes(filterTypeParam)
      ? (filterTypeParam as 'ALL' | 'LIKE' | 'MY' | 'COMMENT')
      : undefined;

  const queryClient = useQueryClient();
  const [likeError, setLikeError] = useState<string | null>(null);

  const communityArticlesOptions = getCommunityArticlesOptions(DEFAULT_COMMUNITY_ID, {
    page,
    limit,
    filterType,
  });
  const { data } = useSuspenseQuery(communityArticlesOptions);
  const articles = data.articles;
  const likeMutation = useMutation({
    mutationFn: ({ articleId, isLiked }: { articleId: string; isLiked?: boolean }) =>
      isLiked ? unlikeCommunityArticle(articleId) : likeCommunityArticle(articleId),
    onSuccess: () => {
      setLikeError(null);
      queryClient.invalidateQueries({ queryKey: communityArticlesOptions.queryKey });
    },
    onError: (error, variables) => {
      if (isHttpError(error)) {
        const status = error.response?.status;
        queryClient.invalidateQueries({ queryKey: communityArticlesOptions.queryKey });
        return;
      }
      setLikeError('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleOpenArticleModal =
    onOpenArticleModal ||
    (() => {
      openModal(({ isOpen, onClose }) => (
        <CommunityArticleModal
          isOpen={isOpen}
          onClose={onClose}
          communityId={DEFAULT_COMMUNITY_ID}
          mode="create"
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: communityArticlesOptions.queryKey });
          }}
        />
      ));
    });

  const formattedArticles = articles.map((article) => ({
    ...article,
    formattedDate: format(new Date(article.createdAt), 'yy.MM.dd'),
    commentCount: article.commentCount ?? 0,
  }));

  return (
    <>
      <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
        <Suspense fallback={<div className="h-10 w-full" />}>
          <CommunityTabs />
        </Suspense>
        {likeError && <p className="text-p13 text-red-500">{likeError}</p>}
        {formattedArticles.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-[131px]">
            <Comment className="size-12 text-gray-200" />
            <p className="text-p16m text-gray-600">게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {formattedArticles.map((post) => (
              <CommunityCard
                key={post.id}
                post={post}
                onClick={() => router.push(`/community/${post.id}`)}
                onLikeClick={(id, isLiked) => likeMutation.mutate({ articleId: id, isLiked })}
                isLikeLoading={likeMutation.isPending}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function CommunityPage() {
  const router = useRouter();
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
          // CommunityPageContent에서 처리
          window.location.reload();
        }}
      />
    ));
  };

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
          <CommunitySidebarProfile />
          <button
            onClick={handleOpenArticleModal}
            className="text-p15b flex h-fit w-fit flex-row justify-items-center rounded-[8px] border-1 border-solid px-4 py-[7px]"
          >
            글쓰기
          </button>
        </section>
        <Suspense fallback={<div className="h-10 w-full" />}>
          <CommunityPageContent onOpenArticleModal={handleOpenArticleModal} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
