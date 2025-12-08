'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

import { Comment as CommentIcon } from '@common/components/svg/Comment';
import { HeartIcon } from '@common/components/svg/Heart';

import { type CommunityCommentDTO } from '../schema';

export interface CommentNode extends CommunityCommentDTO {
  children: CommentNode[];
  depth: number;
  displayName: string;
  parentDisplayName?: string;
}

interface CommentCardProps {
  comment: CommentNode;
  onReply?: (comment: CommentNode) => void;
  onToggleLike?: (comment: CommentNode) => void;
}

export default function CommentCard({ comment, onReply, onToggleLike }: CommentCardProps) {
  const isReply = comment.depth > 0;
  const formattedTime = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex gap-3 ${isReply ? 'border-l border-gray-100 pl-6' : ''}`}
        data-depth={comment.depth}
      >
        <div className="mt-1 h-8 w-8 min-w-8 rounded-full bg-gray-100" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-p15b text-gray-900">{comment.displayName}</span>
            <span className="text-p13 text-gray-400">{formattedTime}</span>
          </div>
          <p className="text-p15 text-gray-700">
            {comment.parentDisplayName && (
              <span className="text-p15b mr-1 text-green-600">@{comment.parentDisplayName}</span>
            )}
            {comment.content}
          </p>
          <div className="text-p13 flex items-center gap-4 text-gray-500">
            <button
              type="button"
              onClick={() => onReply?.(comment)}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <CommentIcon className="h-4 w-4" />
              답글달기
            </button>
            <button
              type="button"
              onClick={() => onToggleLike?.(comment)}
              className={`flex items-center gap-1 transition-colors ${
                comment.isLiked ? 'text-red-500' : 'hover:text-gray-700'
              }`}
            >
              <HeartIcon className="h-4 w-4" />
              <span>{comment.likeCount ?? 0}</span>
            </button>
          </div>
        </div>
      </div>
      {comment.children.length > 0 && (
        <div className="flex flex-col gap-6 pl-10">
          {comment.children.map((child) => (
            <CommentCard
              key={child.id}
              comment={child}
              onReply={onReply}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}
