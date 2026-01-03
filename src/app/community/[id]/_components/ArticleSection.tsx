'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { format } from 'date-fns';

import queryKeys from '@common/constants/queryKeys';

import { useModal } from '@common/hooks/useModal';

import DetailNavbar from '@common/layout/DetailNavbar.client';

import { CommunityArticleModal } from '@features/community/components/CommunityArticleModal';

import {
  deleteCommunityArticle,
  getCommunityArticleDetailOptions,
  likeCommunityArticle,
  unlikeCommunityArticle,
} from '@features/community/api';
import { type GetCommunityArticleDetailResponseDTO } from '@features/community/schema';

import PublishInfoCard from '@/community/components/PublishInfoCard.server';

import { ShareButton } from '@/community/components/btn/ClipButton.server';
import { ScrapButton } from '@/community/components/btn/ScrapButton.client';

import ArticleSectionSkeleton from './ArticleSectionSkeleton';
import SectionError from './SectionError';

type HttpErrorLike = Error & { response?: Response };

const isHttpError = (error: unknown): error is HttpErrorLike =>
  error instanceof Error && 'response' in error && error.response instanceof Response;

export default function ArticleSection({ articleId }: { articleId: string }) {
  const [likeError, setLikeError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();
  const articleQueryOptions = getCommunityArticleDetailOptions(articleId);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetCommunityArticleDetailResponseDTO>(articleQueryOptions);

  const likeMutation = useMutation({
    mutationFn: (isLiked?: boolean) =>
      isLiked ? unlikeCommunityArticle(articleId) : likeCommunityArticle(articleId),
    onSuccess: () => {
      setLikeError(null);
      refetch();
    },
    onError: (error) => {
      if (isHttpError(error) && error.response?.status === 409) {
        setLikeError('이미 좋아요한 게시글입니다.');
        refetch();
        return;
      }
      setLikeError('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCommunityArticle(articleId),
    onSuccess: async () => {
      setDeleteError(null);
      await queryClient.invalidateQueries({
        queryKey: queryKeys.community.list(article?.communityId ?? '1').queryKey,
      });
      router.push('/community');
    },
    onError: () => {
      setDeleteError('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  if (isLoading) {
    return <ArticleSectionSkeleton />;
  }

  if (isError || !article) {
    return (
      <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
        <DetailNavbar />
        <SectionError message="게시글을 불러오지 못했어요." onRetry={() => refetch()} />
      </section>
    );
  }

  const handleEditArticle = () => {
    openModal(({ isOpen, onClose }) => (
      <CommunityArticleModal
        isOpen={isOpen}
        onClose={onClose}
        communityId={article.communityId ?? '1'}
        mode="edit"
        article={article}
        onSuccess={async () => {
          await refetch();
          queryClient.invalidateQueries({
            queryKey: queryKeys.community.list(article.communityId ?? '1').queryKey,
          });
        }}
      />
    ));
  };

  const primaryImage = article.images?.[0]?.imageUrl;
  const authorName = article.isAnonymous ? '익명' : article.authorId;
  const formattedDate = format(new Date(article.createdAt), 'yyyy.MM.dd');
  const isLiked = Boolean(article.isLiked);
  const likeCount = article.likeCount ?? 0;
  const isOwner = Boolean(article.owner);

  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[32px] max-mb:gap-[8px] px-[16px]">
      <DetailNavbar
        isOwner={isOwner}
        onEdit={isOwner ? handleEditArticle : undefined}
        onDelete={isOwner ? () => deleteMutation.mutate() : undefined}
      />
      <div className="flex flex-col gap-[20px] border-b-1 border-gray-100 pb-8">
        <PublishInfoCard name={authorName} date={formattedDate} />
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={article.title}
            width={720}
            height={420}
            className="h-auto w-full rounded-[16px] object-cover"
          />
        )}
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-p20 text-gray-900">{article.title}</h1>
          <p className="text-p15 whitespace-pre-line text-gray-600">{article.content}</p>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-3 pt-[20px]">
          <ScrapButton
            isScraped={isLiked}
            likeCount={likeCount}
            disabled={likeMutation.isPending}
            onClick={() => likeMutation.mutate(isLiked)}
            aria-pressed={isLiked}
          />
          <ShareButton />
        </div>
        {likeError && <p className="text-p13 text-red-500">{likeError}</p>}
        {deleteError && <p className="text-p13 text-red-500">{deleteError}</p>}
      </div>
    </section>
  );
}

