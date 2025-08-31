'use client';

import { useEffect, useState } from 'react';

import { cn } from '@lib/utils';

import { ToastItem } from '@common/types/toast';

import { useRemoveToast } from '@common/hooks/stores/useToastStore';

export interface ToastProps {
  toast: ToastItem;
}

const Toast = ({ toast }: ToastProps) => {
  const { key, text, duration } = toast;
  const [isEntering, setIsEntering] = useState(true); // 등장
  const [isRemoving, setIsRemoving] = useState(false); // 사라짐
  const removeToast = useRemoveToast();

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsEntering(false), 10);
    const removeTimer = setTimeout(() => setIsRemoving(true), duration ?? 2000);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(removeTimer);
    };
  }, [key]);

  useEffect(() => {
    if (isRemoving) {
      const timeout = setTimeout(() => removeToast(key), 500); // transition 시간과 맞춤
      return () => clearTimeout(timeout);
    }
  }, [isRemoving]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'gap-6pxr px-24pxr py-14pxr text-gray-0 transition-spring flex cursor-pointer items-center justify-center truncate rounded border-solid bg-gray-700 text-center duration-500',
        {
          'translate-y-4 opacity-0': isEntering, // 처음엔 아래에서 등장
          'translate-y-0 scale-y-100 opacity-100': !isEntering && !isRemoving, // 보임
          '-translate-y-4 scale-y-0 opacity-0': isRemoving, // 접히며 사라짐
        },
      )}
    >
      {text}
    </div>
  );
};

export default Toast;
