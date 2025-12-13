'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import {
  createCommunityArticle,
  updateCommunityArticle,
} from '@features/community/api';
import type { CommunityArticleDTO } from '@features/community/schema';

type CommunityArticleMutationPayload = {
  data: {
    communityId: string;
    title: string;
    content: string;
    isAnonymous: boolean;
  };
  imageUrls?: string[];
  removeImageUrls?: string[];
};

interface UseCommunityArticleMutationOptions {
  mode: 'create' | 'edit';
  articleId?: string;
  communityId: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * 커뮤니티 게시글 생성/수정을 위한 mutation hook
 */
export function useCommunityArticleMutation({
  mode,
  articleId,
  communityId,
  onSuccess,
  onError,
}: UseCommunityArticleMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommunityArticleMutationPayload) => {
      if (mode === 'edit' && articleId) {
        return updateCommunityArticle(articleId, payload);
      }
      return createCommunityArticle(payload);
    },
    onSuccess: () => {
      // 게시글 목록 무효화
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.list(communityId).queryKey,
      });

      // 수정 모드인 경우 상세 페이지도 무효화
      if (mode === 'edit' && articleId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.community.detail(articleId).queryKey,
        });
      }

      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}

