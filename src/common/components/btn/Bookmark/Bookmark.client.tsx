'use client';

import { useState } from 'react';

import { ButtonsCommonProps } from '@common/types/btn';

import { HeartIcon } from '@common/components/svg/Heart';

interface BookmarkProps extends ButtonsCommonProps {
  isBookmarked: boolean;
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const Bookmark = ({ isBookmarked = false, onStateChange, ...props }: BookmarkProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleClick = () => {
    const newState = !bookmarked;
    setBookmarked(newState);

    onStateChange?.(newState, bookmarked);
  };

  return (
    <button
      aria-label="찜하기 버튼"
      aria-pressed={bookmarked}
      onClick={handleClick}
      className="py-16pxr px-32pxr gap-8pxr rounded-12pxr transition-spring flex h-fit w-full flex-row items-center justify-center bg-gray-50"
      {...props}
    >
      {bookmarked ? (
        <HeartIcon fill="weight" className="w-22pxr h-18pxr text-semantic-red" />
      ) : (
        <HeartIcon fill="outlined" className="w-22pxr h-18pxr text-gray-400" />
      )}
      <p className="text-p16sb text-gray-800">찜하기</p>
    </button>
  );
};

export default Bookmark;
