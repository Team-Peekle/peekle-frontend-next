'use client';

import { useRouter } from 'next/navigation';

import { PopupType } from '@common/types/popup';

import Popup from '@common/components/Popup.server';

const CannotChangeModal = () => {
  const router = useRouter();

  const handleConfirm = () => {
    router.back();
  };

  return (
    <Popup
      type={PopupType.VAR3}
      title={`닉네임을 변경할 수 없어요`}
      leftText="확인"
      onLeft={handleConfirm}
    />
  );
};

export default CannotChangeModal;
