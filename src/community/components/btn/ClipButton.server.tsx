import { ButtonHTMLAttributes, useState } from 'react';

import { cn } from '@common/libs/utils';

import { ShareIcon2 } from '../../../common/components/svg/ShareIcon2';

/**
 * ClipButton
 *
 * 커뮤니티 페이지에서 사용되는 현재 링크를 복사하는 버튼입니다.
 * 특정 기능만을 사용하는 버튼이기 때문에 onClick 이벤트는 컴포 내부에 작성했습니다.
 */

export function ShareButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [copy, setCopy] = useState<boolean>(false);
  return (
    <button
      className={cn(
        'text-p16sb flex cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-gray-50 py-4 text-gray-800',
        copy ? 'px-[21px]' : 'px-[31px]',
      )}
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setCopy(true);
      }}
      disabled={copy}
    >
      <ShareIcon2 className="h-[15px] w-[18px] text-gray-400" />
      {copy ? '링크 복사됨' : '공유하기'}
    </button>
  );
}
