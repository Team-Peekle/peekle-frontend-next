'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import CommentCard, { type CommentNode } from '@features/community/components/CommentCard';
import CommentInput from '@features/community/components/CommentInput';

import {
  deleteCommunityComment,
  getCommunityArticleCommentsOptions,
  likeCommunityComment,
  unlikeCommunityComment,
  updateCommunityComment,
} from '@features/community/api';
import {
  type CommunityCommentDTO,
  type GetCommunityArticleCommentsResponseDTO,
} from '@features/community/schema';

import CommentsSectionSkeleton from './CommentsSectionSkeleton';
import SectionError from './SectionError';
import { buildCommentTree } from './utils';

type HttpErrorLike = Error & { response?: Response };

const isHttpError = (error: unknown): error is HttpErrorLike =>
  error instanceof Error && 'response' in error && error.response instanceof Response;

export default function CommentsSection({ articleId }: { articleId: string }) {
  const queryClient = useQueryClient();
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetCommunityArticleCommentsResponseDTO>(
    getCommunityArticleCommentsOptions(articleId),
  );

  const likeMutation = useMutation<unknown, Error, CommentNode>({
    mutationFn: (comment: CommentNode) =>
      comment.isLiked ? unlikeCommunityComment(comment.id) : likeCommunityComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.comments(articleId).queryKey,
      });
    },
    onError: (error, comment) => {
      if (isHttpError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          console.error(
            comment.isLiked ? '이미 좋아요를 취소한 댓글입니다.' : '이미 좋아요한 댓글입니다.',
          );
        } else if (status === 404) {
          console.error(
            comment.isLiked
              ? '좋아요를 취소할 수 없습니다. 댓글이 존재하지 않습니다.'
              : '좋아요할 수 없습니다. 댓글이 존재하지 않습니다.',
          );
        } else {
          console.error(
            comment.isLiked
              ? '댓글 좋아요 취소에 실패했습니다.'
              : '댓글 좋아요 처리에 실패했습니다.',
          );
        }
        queryClient.invalidateQueries({
          queryKey: queryKeys.community.comments(articleId).queryKey,
        });
        return;
      }
      console.error('댓글 좋아요 처리에 실패했습니다.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content, isAnonymous }: { commentId: string; content: string; isAnonymous: boolean }) =>
      updateCommunityComment(commentId, { content, isAnonymous }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.comments(articleId).queryKey,
      });
      setEditingCommentId(null);
    },
    onError: (error) => {
      if (isHttpError(error)) {
        const status = error.response?.status;
        if (status === 404) {
          console.error('댓글을 찾을 수 없습니다.');
        } else {
          console.error('댓글 수정에 실패했습니다.');
        }
        queryClient.invalidateQueries({
          queryKey: queryKeys.community.comments(articleId).queryKey,
        });
        return;
      }
      console.error('댓글 수정에 실패했습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteCommunityComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.comments(articleId).queryKey,
      });
    },
    onError: (error) => {
      if (isHttpError(error)) {
        const status = error.response?.status;
        if (status === 404) {
          console.error('댓글을 찾을 수 없습니다.');
        } else {
          console.error('댓글 삭제에 실패했습니다.');
        }
        queryClient.invalidateQueries({
          queryKey: queryKeys.community.comments(articleId).queryKey,
        });
        return;
      }
      console.error('댓글 삭제에 실패했습니다.');
    },
  });

  const structuredComments = useMemo(() => buildCommentTree(comments?.comments ?? []), [comments]);

  if (isLoading) {
    return <CommentsSectionSkeleton />;
  }

  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[24px] px-[16px] pb-[32px]">
      <header className="flex items-center justify-between">
        <h2 className="text-p16sb text-gray-700">댓글 {comments?.comments?.length ?? 0}</h2>
      </header>
      {isError || !comments ? (
        <SectionError message="댓글을 불러오지 못했어요." onRetry={() => refetch()} />
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {structuredComments.length === 0 ? (
              <p className="text-p15 text-center text-gray-500 pt-[36px]">아직 댓글이 없습니다.</p>
            ) : (
              structuredComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  selectedCommentId={selectedCommentId}
                  editingCommentId={editingCommentId}
                  onReply={(target) => setSelectedCommentId(target.id)}
                  onToggleLike={(target) => likeMutation.mutate(target)}
                  onEdit={(target) => setEditingCommentId(target.id)}
                  onDelete={(target) => deleteMutation.mutate(target.id)}
                  onEditCancel={() => setEditingCommentId(null)}
                  onEditSubmit={(commentId, content, isAnonymous) =>
                    updateMutation.mutate({ commentId, content, isAnonymous })
                  }
                />
              ))
            )}
          </div>
          <CommentInput
            articleId={articleId}
            parentCommentId={selectedCommentId}
            onReplyCancel={() => setSelectedCommentId(null)}
          />
        </>
      )}
    </section>
  );
}

