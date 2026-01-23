'use client';

import { PopupType } from '@common/types/popup';

import Popup from '@common/components/Popup.server';

interface WithdrawSuccessModalProps {
  onClose: () => void;
}
const WithdrawSuccessModal = ({ onClose }: WithdrawSuccessModalProps) => {
  return (
    <Popup
      type={PopupType.VAR3}
      title={`탈퇴 처리가 완료되었습니다.\n서비스를 이용해주셔서 감사합니다.`}
      leftText="확인"
      onLeft={onClose}
    />
  );
};

export default WithdrawSuccessModal;
