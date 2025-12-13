'use client';

import { useRouter } from 'next/navigation';

import { DetailNavbarModal } from '@common/components/DetailNavbarModal';
import { ArrowLeft } from '@common/components/svg/ArrowLeft';

import { useIsScrolled } from '@/common/hooks/useIsScrolled';
import { useModal } from '@/common/hooks/useModal';

interface DetailNavbarProps {
  onShare?: () => void;
  onScrap?: () => void;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

export default function DetailNavbar({
  onShare: _onShare,
  onScrap: _onScrap,
  isOwner = false,
  onEdit,
  onDelete,
  onReport,
}: DetailNavbarProps) {
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

  const hasMoreActions = isOwner ? !!(onEdit || onDelete) : !!onReport;

  const handleMoreClick = () => {
    openModal(({ isOpen, onClose }) => (
      <DetailNavbarModal
        isOpen={isOpen}
        onClose={onClose}
        isOwner={isOwner}
        onEdit={onEdit}
        onDelete={onDelete}
        onReport={onReport}
      />
    ));
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
      {hasMoreActions && (
        <button
          type="button"
          onClick={handleMoreClick}
          className="text-p15 flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          더보기
        </button>
      )}
    </nav>
  );
}
