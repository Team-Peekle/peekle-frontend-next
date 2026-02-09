'use client';

import { PageContextType } from '@common/types/routes';

import { cn } from '@common/libs/utils';

import useIsCommunityPage from '@common/hooks/queries/useIsCommunityPage';
import { useIsMobile } from '@common/hooks/useIsMobile';

import DropdownBar from './DropdownBar/DropdownBar.client';

const Banner = () => {
  const isMobile = useIsMobile();
  const isCommunityPage = useIsCommunityPage();

  return (
    <article
      className={cn(
        'bg-banner flex flex-col items-center justify-center',
        'relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen', // 화면 끝까지 강제로 늘리기
        isMobile ? 'py-32pxr h-188pxr' : 'h-250pxr py-44pxr',
      )}
    >
      <div className="gap-y-24pxr mx-auto flex w-full max-w-300 flex-col">
        <h2
          className={cn(
            'px-16pxr whitespace-pre-line text-gray-800',
            isMobile ? 'text-p20' : 'text-32pxr leading-[1.6em] font-bold tracking-[-0.02em]',
          )}
        >
          {isCommunityPage
            ? `배움·일·일상 이야기를\n익명으로 자유롭게 나눠요.`
            : `재취업·부업 시작을 위한 공공 강좌,\n한곳에서 찾고 신청해 보세요.`}
        </h2>
        {!isCommunityPage && <DropdownBar />}
      </div>
    </article>
  );
};

export default Banner;
