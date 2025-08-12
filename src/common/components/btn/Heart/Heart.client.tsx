'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { ButtonsCommonProps } from '@common/types/btn';

import { HeartIcon } from '@common/components/svg/HeartIcon';

interface HeartProps extends ButtonsCommonProps {
  isLiked: boolean; // 초기 좋아요 상태
  likeCount?: number; //  초기 좋아요 개수 (없으면 숫자 안 보임)
  onStateChange: (...args: unknown[]) => void; // 클릭됐을 때 호출할 함수
}

const Heart = ({ isLiked = false, likeCount, onStateChange, ...props }: HeartProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCnt, setLikeCnt] = useState(likeCount);

  const handleClick = () => {
    const newState = !liked;
    let newLikeCnt = likeCnt;

    // likeCnt가 숫자일때만 개수 조정 - 0인 경우 반영
    if (typeof likeCnt === 'number') {
      newLikeCnt = newState ? likeCnt! + 1 : likeCnt! - 1;
      setLikeCnt(newLikeCnt);
    }

    setLiked(newState);
    onStateChange?.(newState, liked, newLikeCnt);
  };

  return (
    <button
      aria-label={`좋아요 버튼, 현재 ${liked ? '눌림' : '안 눌림'} 상태`}
      aria-pressed={liked}
      className={clsx(
        'w-28pxr h-21pxr gap-6pxr transition-spring flex items-center justify-center transition-all',
        liked ? 'text-semantic-red' : 'text-gray-300',
      )}
      onClick={handleClick}
      {...props}
    >
      {typeof likeCnt === 'number' && <p className="text-p14">{likeCnt}</p>}
      {liked ? <HeartIcon fill="weight" /> : <HeartIcon fill="outlined" />}
    </button>
  );
};

export default Heart;
