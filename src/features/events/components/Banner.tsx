'use client';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import DropdownBar from '@common/components/DropdownBar/DropdownBar.client';

const Banner = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={cn(
          'py-32pxr bg-banner gap-y-24pxr flex w-full flex-col',
          isMobile ? 'py-32pxr' : 'py-44pxr',
        )}
      >
        {/* ✅ TODO: 데스크탑뷰 폰트 크기 조절 */}
        <p
          className={cn(
            'px-16pxr whitespace-pre-line text-gray-800',
            isMobile ? 'text-p20' : 'text-p20',
          )}
        >{`재취업·부업 시작을 위한 공공 강좌,\n 한곳에서 찾고 신청해 보세요.`}</p>
        <DropdownBar />
      </div>
    </>
  );
};

export default Banner;
