'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '@common/types/btn';

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
      <p className={clsx('text-p18', disabled ? 'text-gray-200' : 'text-primary-500')}>게시</p>
    </button>
  );
};

export default Post;
