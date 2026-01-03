'use client';

import { useEffect, useState } from 'react';

import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

import { cn } from '@common/libs/utils';

interface LoaderProps {
  className?: string;
}
const Loader = ({ className }: LoaderProps) => {
  return (
    <div role="status" aria-live="polite" aria-busy="true" aria-label="로더" className={className}>
      <DotLottiePlayer
        src="https://framerusercontent.com/assets/xooaDQeeaje1bgxgMHPn01Yazek.lottie" // Lottie 애니메이션 파일의 URL을 지정
        autoplay // 애니메이션 자동 재생
        loop // 애니메이션 무한 반복
        style={{ width: '32px', height: '32px' }}
      />
    </div>
  );
};

interface DeferredLoaderProps {
  className?: string;
}
const DeferredLoader = ({ className }: DeferredLoaderProps) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되고 500ms후에 setIsDeferred 호출 - 짧은 시간에는 로딩 스피너 안 띄우려고
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, 500);

    // 클린업 함수로 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <Loader className={cn('flex h-full w-full items-center justify-center', className)} />;
};

export default DeferredLoader;
