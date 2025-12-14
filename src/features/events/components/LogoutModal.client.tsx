'use client';

import { useRouter } from 'next/navigation';

import { PopupType } from '@common/types/popup';

import Popup from '@common/components/Popup.server';

const LogoutModal = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleConfirmLogout = () => {
    // TODO: 실제 로그아웃 처리 로직 수행
  };

  return (
    <Popup
      type={PopupType.VAR1}
      title="로그아웃 하시겠어요?"
      leftText="취소"
      rightText="로그아웃"
      onLeft={handleCancel}
      onRight={handleConfirmLogout}
    />
  );
};
export default LogoutModal;
