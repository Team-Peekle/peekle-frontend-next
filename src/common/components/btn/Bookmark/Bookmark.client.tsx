'use client';

import { ButtonsCommonProps } from '@common/types/btn';

import { HeartIcon } from '@common/components/svg/Heart';

interface BookmarkProps extends ButtonsCommonProps {
  isBookmarked: boolean;
  // 상태 변경 요청을 부모에게 알리는 함수
  onStateChange: (nextState: boolean) => void;
}

const Bookmark = ({ isBookmarked, onStateChange, ...props }: BookmarkProps) => {
  const handleClick = () => {
    onStateChange(!isBookmarked);
  };

  return (
    <button
      aria-label="찜하기 버튼"
      aria-pressed={isBookmarked}
      onClick={handleClick}
      className="py-16pxr px-32pxr gap-8pxr rounded-12pxr transition-spring flex h-fit w-full flex-row items-center justify-center bg-gray-50"
      {...props}
    >
      {isBookmarked ? (
        <HeartIcon fill="weight" className="w-22pxr h-18pxr text-semantic-red" />
      ) : (
        <HeartIcon fill="outlined" className="w-22pxr h-18pxr text-gray-400" />
      )}
      <p className="text-p16sb text-gray-800">찜하기</p>
    </button>
  );
};

export default Bookmark;
