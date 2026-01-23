import { useEffect, useState } from 'react';

export default function useImagePreloader(src: string) {
  const [loadedSrc, setLoadedSrc] = useState(src);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoadedSrc(src); // 로드가 완전히 완료된 후에만 src 업데이트
    };
  }, [src]);

  return loadedSrc;
}
