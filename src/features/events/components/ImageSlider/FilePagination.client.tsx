'use client';

import { Arrow } from '@common/components/svg/Arrow';

interface FilePaginationProps {
  fileLength: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const FilePagination = ({
  fileLength,
  currentPage,
  onPrevPage,
  onNextPage,
}: FilePaginationProps) => {
  const iconStyle = 'w-3 h-3 text-gray-0 cursor-pointer';

  // 사진이 한장이면 표시 x
  if (fileLength === 1) return null;

  return (
    <div className="gap-4pxr px-8pxr py-4pxr text-p14 rounded-10pxr flex flex-row items-center justify-center bg-black/30">
      {currentPage > 1 && (
        <Arrow
          direction="left"
          onClick={onPrevPage}
          className={iconStyle}
          role="button"
          aria-label="이전 이미지"
        />
      )}
      <span className="text-gray-0">{currentPage}</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-300">{fileLength}</span>{' '}
      {currentPage < fileLength && (
        <Arrow
          direction="right"
          onClick={onNextPage}
          className={iconStyle}
          role="button"
          aria-label="다음 이미지"
        />
      )}{' '}
    </div>
  );
};

export default FilePagination;
