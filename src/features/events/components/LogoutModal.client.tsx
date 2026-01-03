'use client';

import { PopupType } from '@common/types/popup';

import Popup from '@common/components/Popup.server';

import useLogout from '@features/sign/hooks/mutations/useLogout';

interface LogoutModalProps {
  onClose: () => void;
}
const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const { mutate: handleLogout, isPending } = useLogout();

  const handleCancel = () => {
    onClose();
  };

  const handleConfirmLogout = () => {
    handleLogout();
  };

  return (
    <Popup
      type={PopupType.VAR1}
      title="로그아웃 하시겠어요?"
      leftText="취소"
      rightText={isPending ? '처리 중...' : '로그아웃'}
      onLeft={handleCancel}
      onRight={handleConfirmLogout}
      leftDisabled={isPending}
      rightDisabled={isPending}
    />
  );
};
export default LogoutModal;
