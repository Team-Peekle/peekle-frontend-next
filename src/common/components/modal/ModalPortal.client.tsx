'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

/**
 * React Portal을 사용하여 모달을 렌더링하는 클라이언트 컴포넌트입니다.
 * 'modal' ID를 가진 DOM 엘리먼트에 자식 컴포넌트를 포팅합니다.
 * 이를 통해 HTML 구조상 body 태그의 직속 자식으로 모달을 위치시켜 다른 DOM 요소의 영향을 받지 않도록 합니다.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - 포탈을 통해 렌더링될 자식 컴포넌트
 * @returns {React.ReactNode | null} Portal로 감싸진 자식 컴포넌트 또는 렌더링 준비가 되지 않았을 경우 null을 반환합니다.
 */
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setEl(document.getElementById('modal'));
  }, []);

  if (!mounted || !el) return null;
  return createPortal(children, el);
};

export default ModalPortal;
