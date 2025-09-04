'use client';

import { ButtonsCommonProps } from '@common/types/btn';

import useCopyToClipboard from '@common/hooks/useCopyToClipboard';

import { Export } from '@common/components/svg/Export';

interface ShareProps extends ButtonsCommonProps {
  /** 공유할 링크를 props로 받음 */
  link: string;
  /** 선택: 복사 완료 후 콜백 함수 */
  onCopyComplete?: () => void;
}

const Share = ({ link, onCopyComplete }: ShareProps) => {
  // 훅을 사용하여 복사 기능과 상태를 가져옴
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleCopyClick = async () => {
    const success = await copyToClipboard(link);
    // 복사 완료 후 콜백 함수 있으면 호출
    if (success) {
      onCopyComplete?.();
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className="py-16pxr px-32pxr gap-8pxr rounded-12pxr transition-spring flex h-fit w-fit flex-row items-center justify-center bg-gray-50"
    >
      <Export className="w-14pxr h-14pxr text-gray-400" />
      <p className="text-p16sb text-gray-800">{isCopied ? '링크 복사됨' : '공유하기'}</p>
    </button>
  );
};

export default Share;
