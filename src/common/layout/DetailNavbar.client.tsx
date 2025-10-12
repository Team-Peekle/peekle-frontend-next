'use client';

import { useRouter } from 'next/navigation';

import { DetailNavbarModal } from '@common/components/DetailNavbarModal';
import { ArrowLeft } from '@common/components/svg/ArrowLeft';

import { useIsScrolled } from '@/common/hooks/useIsScrolled';
import { useModal } from '@/common/hooks/useModal';

interface DetailNavbarProps {
  onShare?: () => void;
  onScrap?: () => void;
}

export default function DetailNavbar({ onShare, onScrap }: DetailNavbarProps) {
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
      className={`py-10pxr bg-gray-0 h-64pxr flex w-full flex-row items-center justify-between ${
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
    </nav>
  );
}
