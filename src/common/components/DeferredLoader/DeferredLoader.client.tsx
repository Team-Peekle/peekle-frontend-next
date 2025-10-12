'use client';

import { useEffect, useState } from 'react';

import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="로더"
      className="shirink-0 flex items-center justify-center"
    >
      <DotLottiePlayer
        src="https://framerusercontent.com/assets/xooaDQeeaje1bgxgMHPn01Yazek.lottie" // Lottie 애니메이션 파일의 URL을 지정
        autoplay // 애니메이션 자동 재생
        loop // 애니메이션 무한 반복
        style={{ width: '32px', height: '32px' }}
      />
    </div>
  );
};

const DeferredLoader = () => {
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

  return <Loader />;
};

export default DeferredLoader;
