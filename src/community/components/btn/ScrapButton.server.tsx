import { ButtonHTMLAttributes } from 'react';

import { HeartIcon } from '../../../common/components/svg/Heart';
import { cn } from '../../../lib/utils';

/**
 * ScrapButton
 *
 * 커뮤니티 페이지에서 사용되는 좋아요 버튼입니다.
 */
interface ScrapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isScraped: boolean;
}

export function ScrapButton({ isScraped, ...props }: ScrapButtonProps) {
  return (
    <button
      className="text-p16sb flex cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-gray-50 px-9 py-4 text-gray-800"
      {...props}
    >
      <HeartIcon
        fill={isScraped ? 'weight' : 'outlined'}
        className={cn('h-[15px] w-[18px]', isScraped ? 'text-semantic-red' : 'text-gray-400')}
      />
      찜하기
    </button>
  );
}
