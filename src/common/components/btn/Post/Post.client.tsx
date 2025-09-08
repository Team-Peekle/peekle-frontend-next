'use client';

import { ButtonsCommonProps } from '@common/types/btn';

import { cn } from '@common/libs/utils';

/**
 * @description 게시 버튼
 */

const Post = ({ onClick, disabled = false, ...props }: ButtonsCommonProps) => {
  return (
    <button
      aria-label="게시 버튼"
      className="h-33pxr w-43pxr rounded-8pxr bg-gray-0"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <p className={cn('text-p18', disabled ? 'text-gray-200' : 'text-primary-500')}>게시</p>
    </button>
  );
};

export default Post;
