'use client';

import WithDraw from '@common/components/WithDraw/WithDraw.client';
import ModalLayout from '@common/components/modal/ModalLayout.client';

import { ModalType } from '@features/setting/constants/modal';

import LogoutModal from '@features/events/components/LogoutModal.client';
import ProfileEdit from '@features/setting/components/profile-edit/ProfileEdit.client';

interface SettingModalsProps {
  activeModal: ModalType | null;
  onClose: () => void;
}

export default function SettingModals({ activeModal, onClose }: SettingModalsProps) {
  if (!activeModal) return null;

  return (
    <>
      {activeModal === ModalType.PROFILE_EDIT && (
        <ModalLayout canClickDimmed={false}>
          <ProfileEdit onClose={onClose} />
        </ModalLayout>
      )}
      {activeModal === ModalType.LOGOUT && (
        <ModalLayout canClickDimmed={false}>
          <LogoutModal onClose={onClose} />
        </ModalLayout>
      )}
      {activeModal === ModalType.WITHDRAW && (
        <ModalLayout canClickDimmed={false}>
          <WithDraw onClose={onClose} />
        </ModalLayout>
      )}
    </>
  );
}
