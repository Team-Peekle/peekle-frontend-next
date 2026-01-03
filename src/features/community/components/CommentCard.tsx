'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { Ellipsis } from 'lucide-react';

import { ProfileVariant } from '@common/types/profile';

import { useModal } from '@common/hooks/useModal';

import { DetailNavbarModal } from '@common/components/DetailNavbarModal';
import Profile from '@common/components/Profile.server';
import { Check } from '@common/components/svg/Check';
import { HeartIcon } from '@common/components/svg/Heart';

import { getUsersMeOptions } from '@features/setting/apis/get/userOptions';

import { type CommunityCommentDTO } from '../schema';

export interface CommentNode extends CommunityCommentDTO {
  children: CommentNode[];
  depth: number;
  displayName: string;
  parentDisplayName?: string;
}

interface CommentCardProps {
  comment: CommentNode;
  selectedCommentId?: string | null;
  editingCommentId?: string | null;
  onReply?: (comment: CommentNode) => void;
  onToggleLike?: (comment: CommentNode) => void;
  onEdit?: (comment: CommentNode) => void;
  onDelete?: (comment: CommentNode) => void;
  onEditCancel?: () => void;
  onEditSubmit?: (commentId: string, content: string, isAnonymous: boolean) => void;
}

export default function CommentCard({
  comment,
  selectedCommentId,
  editingCommentId,
  onReply,
  onToggleLike,
  onEdit,
  onDelete,
  onEditCancel,
  onEditSubmit,
}: CommentCardProps) {
  const { data: userInfo } = useQuery(getUsersMeOptions());
  const { openModal } = useModal();
  const [editContent, setEditContent] = useState(comment.content);
  const [editIsAnonymous, setEditIsAnonymous] = useState(comment.isAnonymous);

  const isReply = comment.depth > 0;
  const isMyComment = comment.owner ?? userInfo?.id === comment.author.id;
  const isEditing = editingCommentId === comment.id;
  const formattedTime = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const handleMoreClick = () => {
    openModal(({ isOpen, onClose }) => (
      <DetailNavbarModal
        isOpen={isOpen}
        onClose={onClose}
        isOwner={true}
        onEdit={() => {
          onEdit?.(comment);
          onClose();
        }}
        onDelete={() => {
          onDelete?.(comment);
          onClose();
        }}
      />
    ));
  };

  const handleEditSubmit = () => {
    if (editContent.trim()) {
      onEditSubmit?.(comment.id, editContent.trim(), editIsAnonymous);
    }
  };

  const handleEditCancel = () => {
    setEditContent(comment.content);
    setEditIsAnonymous(comment.isAnonymous);
    onEditCancel?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3" data-depth={comment.depth}>
        <Profile
          src={comment.author.profileImage}
          alt={comment.author.nickname}
          variant={ProfileVariant.SIZE_32}
        />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-p16m text-gray-700">{comment.displayName}</span>
              <span className="text-p16m text-gray-300">{formattedTime}</span>
            </div>
            {isMyComment && !isEditing && (
              <button
                type="button"
                onClick={handleMoreClick}
                className="flex items-center justify-center stroke-[1px] text-gray-300 hover:text-gray-700"
              >
                <Ellipsis size={24} />
              </button>
            )}
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-[12px]">
                <label className="flex cursor-pointer items-center gap-[5px]">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      checked={editIsAnonymous}
                      onChange={(e) => setEditIsAnonymous(e.target.checked)}
                    />
                    <div
                      className={`flex size-[16px] items-center justify-center rounded transition-colors duration-200 ${
                        editIsAnonymous
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-200 bg-gray-600'
                      }`}
                    >
                      {editIsAnonymous && <Check className="size-4 text-white" />}
                    </div>
                  </div>
                  <span className="text-p15b whitespace-nowrap text-gray-700">익명</span>
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="h-46px focus:ring-primary-500 w-full resize-none rounded-[8px] border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-200 focus:ring-2 focus:outline-none"
                  placeholder="댓글을 입력해주세요"
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="text-p14 text-gray-500 hover:text-gray-700"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  disabled={!editContent.trim()}
                  className="text-p14b bg-primary-500 rounded-[8px] px-4 py-2 text-white transition-opacity disabled:opacity-50"
                >
                  수정
                </button>
              </div>
            </div>
          ) : (
            <p className="text-p16m text-gray-700">
              {comment.parentDisplayName && (
                <span className="text-p15b mr-1 text-green-600">@{comment.parentDisplayName}</span>
              )}
              {comment.content}
            </p>
          )}
          {!isEditing && (
            <div className="text-p13 flex items-center justify-between text-gray-500">
              <button
                type="button"
                onClick={() => onReply?.(comment)}
                className={
                  selectedCommentId === comment.id ? 'text-primary-500' : 'hover:text-gray-700'
                }
              >
                답글달기
              </button>
              <button
                type="button"
                onClick={() => onToggleLike?.(comment)}
                className={`flex items-center gap-1 transition-colors ${
                  comment.isLiked ? 'text-red-500' : 'hover:text-gray-700'
                }`}
              >
                <span>{comment.likeCount ?? 0}</span>
                <HeartIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      {comment.children.length > 0 && (
        <div className="flex flex-col gap-6 pl-10">
          {comment.children.map((child) => (
            <CommentCard
              key={child.id}
              comment={child}
              selectedCommentId={selectedCommentId}
              editingCommentId={editingCommentId}
              onReply={onReply}
              onToggleLike={onToggleLike}
              onEdit={onEdit}
              onDelete={onDelete}
              onEditCancel={onEditCancel}
              onEditSubmit={onEditSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
