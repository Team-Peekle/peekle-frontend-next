import { useCallback, useEffect, useRef } from 'react';

/**
 * Debounce 처리 훅
 */
export default function useDebounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
) {
  // 타이머 id를 렌더링 간에 기억하기 위해 useRef 사용
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 최신 func 참조 - func가 바뀔 때마다 디바운스가 초기화되는 것을 방지
  const funcRef = useRef(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  );
}
