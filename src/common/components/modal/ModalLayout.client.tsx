'use client';

import { useEffect } from 'react';

import { cn } from '@lib/utils';

import ModalPortal from './ModalPortal.client';

interface ModalLayoutProps {
  children: React.ReactNode;
  /** 모달 배경 클릭 가능 여부 */
  canClickDimmed?: boolean;
  /** 모닿 배경 클릭시 실행될 함수 */
  onClickDimmed?: () => void;
}

/**
 * 모달의 레이아웃을 정의하는 클라이언트 컴포넌트입니다.
 * 이 컴포넌트는 배경(dimmed)과 모달 컨텐츠 영역을 포함하며,
 * `ModalPortal`을 사용하여 DOM 트리의 최상단에 렌더링됩니다.
 *
 * @param {ModalLayoutProps} props
 * @param {React.ReactNode} props.children - 모달 내부에 렌더링될 메인 콘텐츠입니다.
 * @param {boolean} [props.canClickDimmed=true] - 모달 배경(dimmed) 클릭 시 모달이 닫히도록 할지 여부를 결정합니다. 기본값은 `true`입니다.
 * @returns {JSX.Element} 모달 배경과 자식 컴포넌트를 포함하는 JSX 엘리먼트입니다.
 */
const ModalLayout = ({ children, canClickDimmed = true, onClickDimmed }: ModalLayoutProps) => {
  const handleDimmedClick = () => {
    if (!canClickDimmed) return;
    onClickDimmed?.();
  };

  // body 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className={cn(
          'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/40',
          canClickDimmed ? 'cursor-pointer' : 'cursor-default',
        )}
        onClick={handleDimmedClick}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
