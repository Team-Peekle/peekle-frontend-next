import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';

import {
  type CommunityArticleMutationResponseDTO,
  type CreateCommunityCommentRequestDTO,
  type GetCommunityArticleCommentsResponseDTO,
  type GetCommunityArticleDetailResponseDTO,
  type GetCommunityArticlesParams,
  type GetCommunityArticlesResponseDTO,
  type PresignedUrlRequestDTO,
  type PresignedUrlResponseDTO,
  type UpdateCommunityCommentRequestDTO,
  communityArticleDetailResponseSchema,
  communityArticleLikeResponseSchema,
  communityArticleMutationResponseSchema,
  communityArticlesResponseSchema,
  communityCommentMutationResponseSchema,
  communityCommentsResponseSchema,
  getCommunityArticlesParamsSchema,
  presignedUrlRequestSchema,
  presignedUrlResponseSchema,
} from './schema';

const COMMUNITY_BASE_PATH = 'v1/community';
const COMMUNITY_ARTICLE_PATH = `${COMMUNITY_BASE_PATH}/article`;
const COMMUNITY_COMMENT_PATH = `${COMMUNITY_ARTICLE_PATH}/comment`;

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

export const getCommunityArticlesOptions = (
  communityId: string,
  params?: GetCommunityArticlesParams,
) => {
  const validatedParams = getCommunityArticlesParamsSchema.parse(params ?? {});
  return queryOptions<GetCommunityArticlesResponseDTO>({
    queryKey: queryKeys.community.list(communityId, validatedParams).queryKey,
    queryFn: () =>
      authenticatedClientFetcher(
        `${COMMUNITY_BASE_PATH}/${communityId}/article`,
        communityArticlesResponseSchema,
        {
          method: 'GET',
          searchParams: toSearchParams(validatedParams),
        },
      ),
  });
};

export const getCommunityArticleDetailOptions = (articleId: string) => {
  return queryOptions<GetCommunityArticleDetailResponseDTO>({
    queryKey: queryKeys.community.detail(articleId).queryKey,
    queryFn: () =>
      authenticatedClientFetcher(
        `${COMMUNITY_ARTICLE_PATH}/${articleId}`,
        communityArticleDetailResponseSchema,
        {
          method: 'GET',
        },
      ),
  });
};

export const getCommunityArticleCommentsOptions = (articleId: string) => {
  return queryOptions<GetCommunityArticleCommentsResponseDTO>({
    queryKey: queryKeys.community.comments(articleId).queryKey,
    queryFn: () =>
      authenticatedClientFetcher(
        `${COMMUNITY_ARTICLE_PATH}/${articleId}/comment`,
        communityCommentsResponseSchema,
        {
          method: 'GET',
        },
      ),
  });
};

export const createCommunityComment = (payload: CreateCommunityCommentRequestDTO) => {
  return authenticatedClientFetcher(
    COMMUNITY_COMMENT_PATH,
    communityCommentMutationResponseSchema,
    {
      method: 'POST',
      json: payload,
    },
  );
};

export const updateCommunityComment = (
  commentId: string,
  payload: UpdateCommunityCommentRequestDTO,
) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_COMMENT_PATH}/${commentId}`,
    communityCommentMutationResponseSchema,
    {
      method: 'PATCH',
      json: payload,
    },
  );
};

export const deleteCommunityComment = (commentId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_COMMENT_PATH}/${commentId}`,
    z.object({}).passthrough(),
    {
      method: 'DELETE',
    },
  );
};

export const likeCommunityComment = (commentId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_COMMENT_PATH}/${commentId}/like`,
    z.object({}).passthrough(),
    {
      method: 'POST',
    },
  );
};

export const unlikeCommunityComment = (commentId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_COMMENT_PATH}/${commentId}/like`,
    z.object({}).passthrough(),
    {
      method: 'DELETE',
    },
  );
};

export const likeCommunityArticle = (articleId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_ARTICLE_PATH}/${articleId}/like`,
    z.object({}).passthrough(),
    {
      method: 'POST',
    },
  );
};

export const unlikeCommunityArticle = (articleId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_ARTICLE_PATH}/${articleId}/like`,
    z.object({}).passthrough(),
    {
      method: 'DELETE',
    },
  );
};

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

const buildArticleFormData = (payload: CommunityArticleMutationPayload) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(payload.data));
  payload.imageUrls?.forEach((url) => {
    formData.append('article_images', url);
  });
  payload.removeImageUrls?.forEach((url) => {
    formData.append('removeImages', url);
  });
  return formData;
};

const multipartHeaders: Record<string, string | undefined> = {
  'Content-Type': undefined,
};

export const createCommunityArticle = (payload: CommunityArticleMutationPayload) => {
  const formData = buildArticleFormData(payload);
  return authenticatedClientFetcher(
    COMMUNITY_ARTICLE_PATH,
    communityArticleMutationResponseSchema,
    {
      method: 'POST',
      body: formData,
      headers: multipartHeaders,
    },
  ) as Promise<CommunityArticleMutationResponseDTO>;
};

export const updateCommunityArticle = (
  articleId: string,
  payload: CommunityArticleMutationPayload,
) => {
  const formData = buildArticleFormData(payload);
  return authenticatedClientFetcher(
    `${COMMUNITY_ARTICLE_PATH}/${articleId}`,
    communityArticleMutationResponseSchema,
    {
      method: 'PATCH',
      body: formData,
      headers: multipartHeaders,
    },
  ) as Promise<CommunityArticleMutationResponseDTO>;
};

export const deleteCommunityArticle = (articleId: string) => {
  return authenticatedClientFetcher(
    `${COMMUNITY_ARTICLE_PATH}/${articleId}`,
    communityArticleMutationResponseSchema,
    {
      method: 'DELETE',
    },
  ) as Promise<CommunityArticleMutationResponseDTO>;
};

export const getPresignedUrl = (payload: PresignedUrlRequestDTO) => {
  const body = presignedUrlRequestSchema.parse(payload);
  return authenticatedClientFetcher('uploads/presigned', presignedUrlResponseSchema, {
    method: 'POST',
    json: body,
  }) as Promise<PresignedUrlResponseDTO>;
};
