'use client';

import { ButtonHTMLAttributes } from 'react';

import { cn } from '@common/libs/utils';

import { HeartIcon } from '../../../common/components/svg/Heart';

/**
 * ScrapButton
 *
 * 커뮤니티 페이지에서 사용되는 좋아요 버튼입니다.
 */
interface ScrapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isScraped: boolean;
  likeCount?: number;
}

export function ScrapButton({ isScraped, likeCount, className, ...props }: ScrapButtonProps) {
  return (
    <button
      className={cn(
        'text-p16sb flex cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-gray-50 px-9 py-4 text-gray-800',
        className,
      )}
      {...props}
    >
      <HeartIcon
        fill={isScraped ? 'weight' : 'outlined'}
        className={cn('h-[15px] w-[18px]', isScraped ? 'text-semantic-red' : 'text-gray-400')}
      />
      찜하기
      {likeCount !== undefined && <span>{likeCount}</span>}
    </button>
  );
}
