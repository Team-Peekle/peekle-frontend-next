import { z } from 'zod';

export const communityArticleImageSchema = z.object({
  imageUrl: z.string(),
  order: z.number(),
});

export const communityArticleSchema = z.object({
  id: z.string(),
  communityId: z.string().optional(),
  title: z.string(),
  content: z.string(),
  isAnonymous: z.boolean(),
  authorId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  images: z.array(communityArticleImageSchema).default([]),
  likeCount: z.number().optional(),
  isLiked: z.boolean().optional(),
  owner: z.boolean().optional(),
  commentCount: z.number().optional(),
});

export const communityArticlesResponseSchema = z.object({
  articles: z.array(communityArticleSchema),
  totalCount: z.number(),
  currentPage: z.number(),
  pageSize: z.number().optional(),
  totalPages: z.number(),
  hasNextPage: z.boolean().optional(),
  hasPreviousPage: z.boolean().optional(),
});
export const communityArticleDetailResponseSchema = communityArticleSchema;

export const getCommunityArticlesParamsSchema = z.object({
  filterType: z.enum(['ALL', 'LIKE', 'MY', 'COMMENT']).optional(),
  search: z.string().optional(),
  limit: z.number().int().positive().optional(),
  page: z.number().int().positive().optional(),
});

export const communityCommentSchema = z.object({
  id: z.string(),
  articleId: z.string(),
  parentCommentId: z.string().nullable(),
  content: z.string(),
  authorId: z.string(),
  isAnonymous: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  likeCount: z.number().optional(),
  isLiked: z.boolean().optional(),
});

export const communityCommentsResponseSchema = z.object({
  comments: z.array(communityCommentSchema),
});

export const createCommunityCommentRequestSchema = z.object({
  articleId: z.string(),
  content: z.string().min(1),
  isAnonymous: z.boolean(),
  parentCommentId: z.string().nullable().optional(),
});

export const updateCommunityCommentRequestSchema = z.object({
  content: z.string().min(1),
  isAnonymous: z.boolean(),
});

export const communityCommentMutationResponseSchema = communityCommentSchema.partial({
  id: true,
  articleId: true,
  parentCommentId: true,
  content: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

export const communityCommentLikeResponseSchema = z.object({
  commentId: z.union([z.string(), z.number()]),
  userId: z.union([z.string(), z.number()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const communityArticleLikeResponseSchema = z
  .object({
    articleId: z.union([z.string(), z.number(), z.bigint()]).optional(),
    userId: z.union([z.string(), z.number(), z.bigint()]).optional(),
  })
  .strict();

export const communityArticleMutationResponseSchema = communityArticleDetailResponseSchema
  .partial()
  .passthrough();

export const communityArticleFormSchema = z.object({
  communityId: z.string().min(1, '커뮤니티를 선택해주세요.'),
  title: z.string().min(1, '제목을 입력해주세요.').max(50, '제목은 50자 이하로 입력해주세요.'),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(5000, '내용은 5000자 이하로 입력해주세요.'),
  isAnonymous: z.boolean(),
});

export const presignedUrlRequestSchema = z.object({
  domain: z.enum(['community', 'profile']),
  kind: z.enum(['image', 'attachment']),
  contentType: z.string(),
  size: z.number().optional(),
  totalSize: z.number().optional(),
  batchCount: z.number().optional(),
});

export const presignedUrlResponseSchema = z
  .object({
    uploadUrl: z.string().url(),
    fileUrl: z.string().min(1).optional(),
    publicUrl: z.string().min(1).optional(),
    key: z.string().optional(),
    upload: z
      .object({
        url: z.string().min(1).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()
  .refine(
    (data) => data.fileUrl || data.publicUrl || data.upload?.url,
    '응답에 유효한 파일 URL이 없습니다.',
  );

export type CommunityArticleImageDTO = z.infer<typeof communityArticleImageSchema>;
export type CommunityArticleDTO = z.infer<typeof communityArticleSchema>;
export type GetCommunityArticlesResponseDTO = z.infer<typeof communityArticlesResponseSchema>;
export type GetCommunityArticlesResponseDTOArticles =
  GetCommunityArticlesResponseDTO['articles'][number];
export type GetCommunityArticleDetailResponseDTO = z.infer<
  typeof communityArticleDetailResponseSchema
>;
export type GetCommunityArticlesParams = z.infer<typeof getCommunityArticlesParamsSchema>;
export type CommunityCommentDTO = z.infer<typeof communityCommentSchema>;
export type GetCommunityArticleCommentsResponseDTO = z.infer<
  typeof communityCommentsResponseSchema
>;
export type CreateCommunityCommentRequestDTO = z.infer<typeof createCommunityCommentRequestSchema>;
export type UpdateCommunityCommentRequestDTO = z.infer<typeof updateCommunityCommentRequestSchema>;
export type CommunityArticleLikeResponseDTO = z.infer<typeof communityArticleLikeResponseSchema>;
export type CommunityArticleMutationResponseDTO = z.infer<
  typeof communityArticleMutationResponseSchema
>;
export type CommunityArticleFormValues = z.infer<typeof communityArticleFormSchema>;
export type PresignedUrlRequestDTO = z.infer<typeof presignedUrlRequestSchema>;
export type PresignedUrlResponseDTO = z.infer<typeof presignedUrlResponseSchema>;
