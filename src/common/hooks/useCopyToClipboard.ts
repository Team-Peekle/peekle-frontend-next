'use client';

import { useState } from 'react';

import { useAddToast } from '@common/hooks/stores/useToastStore';

/**
 * text를 받아 텍스트를 복사하는 비동기 함수와 복사 상태를 반환하는 훅
 */
export const useCopyToClipboard = () => {
  const addToast = useAddToast();
  const [isCopied, setIsCopied] = useState(false);

  /**
   * @params {string} text - 복사할 텍스트
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    // 이미 복사됐으면 무시 - 중복 호출 방지
    if (isCopied) {
      return false;
    }

    try {
      // 브라우저/보안 컨텍스트 확인
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback: textarea + execCommand
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
      }

      setIsCopied(true);
      addToast({ text: '복사되었어요' });

      // 복사 완료 후 일정 시간 뒤에 상태 초기화
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('텍스트 복사 실패:', err);
      addToast({ text: '복사에 실패했어요' });
      return false;
    }
  };

  return { copyToClipboard, isCopied };
};

export default useCopyToClipboard;
