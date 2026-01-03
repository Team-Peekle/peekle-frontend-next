'use client';

import { useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { format } from 'date-fns';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';
import { NotFound } from '@common/components/svg/NotFound';

import { CommunityCard } from '@/community/components/CommunityCard';

import { authenticatedClientFetcher } from '@common/libs/api/client';

import {
  likeCommunityArticle,
  unlikeCommunityArticle,
} from '@features/community/api';
import {
  type GetCommunityArticlesParams,
  type GetCommunityArticlesResponseDTO,
  communityArticlesResponseSchema,
  getCommunityArticlesParamsSchema,
} from '@features/community/schema';

import queryKeys from '@common/constants/queryKeys';

const DEFAULT_COMMUNITY_ID = '1';
const DEFAULT_LIMIT = 20;
const COMMUNITY_BASE_PATH = 'v1/community';

const toSearchParams = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    searchParams.set(key, String(value));
  });

  return searchParams.keys().next().done ? undefined : searchParams;
};

type HttpErrorLike = Error & { response?: Response };

const isHttpError = (error: unknown): error is HttpErrorLike =>
  error instanceof Error && 'response' in error && error.response instanceof Response;

interface CommunityListProps {
  isSearchPage?: boolean;
}

const CommunityList = ({ isSearchPage = false }: CommunityListProps) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // 검색 쿼리 가져오기
  const searchQuery = searchParams.get('q') ?? undefined;

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = (node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      },
    );

    if (node) observerRef.current.observe(node);
  };

  // 무한 스크롤을 위한 쿼리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<GetCommunityArticlesResponseDTO>({
      queryKey: queryKeys.community.list(DEFAULT_COMMUNITY_ID, {
        search: searchQuery,
        limit: DEFAULT_LIMIT,
      }).queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const params: GetCommunityArticlesParams = {
          search: searchQuery,
          limit: DEFAULT_LIMIT,
          page: pageParam as number,
        };
        const validatedParams = getCommunityArticlesParamsSchema.parse(params);
        return authenticatedClientFetcher(
          `${COMMUNITY_BASE_PATH}/${DEFAULT_COMMUNITY_ID}/article`,
          communityArticlesResponseSchema,
          {
            method: 'GET',
            searchParams: toSearchParams(validatedParams),
          },
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: GetCommunityArticlesResponseDTO) => {
        if (lastPage.hasNextPage) {
          return (lastPage.currentPage ?? 1) + 1;
        }
        return undefined;
      },
    });

  // 좋아요 mutation
  const likeMutation = useMutation({
    mutationFn: ({ articleId, isLiked }: { articleId: string; isLiked?: boolean }) =>
      isLiked ? unlikeCommunityArticle(articleId) : likeCommunityArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.list(DEFAULT_COMMUNITY_ID).queryKey,
      });
    },
  });

  const allArticles = data?.pages.flatMap((page) => page?.articles ?? []) ?? [];
  let articleIndexInAll = 0;

  return (
    <section className={cn(isMobile ? 'py-8pxr px-[16px]' : 'flex flex-col gap-4 px-[16px]')}>
      {/* 초기 진입 로딩 (데이터 없음 + 로딩 중) */}
      {isFetching && allArticles.length === 0 && (
        <div className={cn('pt-40pxr', isMobile ? 'flex justify-center' : 'w-full')}>
          <DeferredLoader />
        </div>
      )}
      {/* 데이터 렌더링 영역 */}
      {(data?.pages[0]?.articles.length ?? 0) > 0 ? (
        <>
          {data?.pages.map((page) =>
            page?.articles.map((article) => {
              const isLast = articleIndexInAll === allArticles.length - 1;
              articleIndexInAll++;

              const formattedArticle = {
                ...article,
                formattedDate: format(new Date(article.createdAt), 'yy.MM.dd'),
                commentCount: article.commentCount ?? 0,
              };

              return (
                <div key={article.id} ref={isLast ? lastElementRef : null}>
                  <CommunityCard
                    post={formattedArticle}
                    onClick={() => router.push(`/community/${article.id}`)}
                    onLikeClick={(id, isLiked) => likeMutation.mutate({ articleId: id, isLiked })}
                    isLikeLoading={likeMutation.isPending}
                  />
                </div>
              );
            }),
          )}
        </>
      ) : (
        // 로딩 끝, 데이터 없을 때
        <>
          {!isFetching && (
            <div className={cn('flex flex-col items-center', !isMobile && 'w-full')}>
              <NotFound className="w-329pxr h-231pxr" />
              <p className="text-gray-400">
                {isSearchPage ? '검색 결과가 없어요' : '해당하는 게시글이 없습니다.'}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CommunityList;

