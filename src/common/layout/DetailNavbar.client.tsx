'use client';

import { useRouter } from 'next/navigation';

import { DetailNavbarModal } from '@common/components/DetailNavbarModal';
import { ArrowLeft } from '@common/components/svg/ArrowLeft';
import { ShareIcon } from '@common/components/svg/Share';

import { Back } from '@/common/components/svg/Back';
import { Scrap } from '@/common/components/svg/Scrap';
import { useIsScrolled } from '@/common/hooks/useIsScrolled';
import { useModal } from '@/common/hooks/useModal';

interface DetailNavbarProps {
  onShare?: () => void;
  onScrap?: () => void;
  isScrap?: boolean;
}

export default function DetailNavbar({ onShare, onScrap, isScrap = false }: DetailNavbarProps) {
  const router = useRouter();
  const isScrolled = useIsScrolled();
  const { openModal } = useModal();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length <= 1) {
      alert('뒤로가기 (스토리북 환경)');
      return;
    }
    router.back();
  };

  const handleMoreClick = () => {
    openModal(({ isOpen, onClose }) => <DetailNavbarModal isOpen={isOpen} onClose={onClose} />);
  };

  return (
    <nav
      className={`py-10pxr bg-gray-0 h-64pxr flex w-full flex-row items-center justify-between border-1 ${
        isScrolled ? 'border-b border-gray-100' : ''
      }`}
    >
      <button
        onClick={handleBack}
        className="flex cursor-pointer items-center justify-center gap-[12px] text-gray-400"
      >
        <ArrowLeft className="h-[16px] w-[10px]" />
        <p className="text-p17m">뒤로</p>
      </button>

      <div className="gap-8pxr flex flex-row">
        {onShare && (
          <button
            onClick={onShare}
            className="size-44pxr flex cursor-pointer items-center justify-center"
          >
            <ShareIcon className="size-20pxr text-gray-600" />
          </button>
        )}
        {onScrap && (
          <button
            onClick={onScrap}
            className="size-44pxr flex cursor-pointer items-center justify-center"
          >
            <Scrap className="size-20pxr text-gray-600" fill={isScrap ? 'weight' : 'outlined'} />
          </button>
        )}
      </div>
    </nav>
  );
}
