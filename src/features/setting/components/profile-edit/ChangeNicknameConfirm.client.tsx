'use client';

import { useState } from 'react';

import { PopupType } from '@common/types/popup';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import Popup from '@common/components/Popup.server';

import useChangeNickname from '@features/setting/hooks/mutations/useChangeNickname';

interface LogoutModalProps {
  onClose: () => void;
  onParentClose: () => void;
  newNickname: string;
}
const ChangeNicknameConfirm = ({ onClose, onParentClose, newNickname }: LogoutModalProps) => {
  const { mutate: changeNicknameMutate, isPending } = useChangeNickname();
  const addToast = useAddToast();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleErrorConfirm = () => {
    setServerError(null);
    onClose();
  };

  const handleChangeNickname = () => {
    changeNicknameMutate(
      { newNickname },
      {
        onSuccess: () => {
          addToast({ text: '닉네임이 변경되었습니다.' });
          onClose(); // 컨펌 팝업 닫기
          onParentClose(); // 프로필 수정 모달도 함께 닫기
        },
        onError: (err) => {
          // 서버에서 내려주는 에러 메시지 추출 (구조에 따라 조정)
          const message = err?.message ?? '닉네임 변경에 실패했습니다.';
          setServerError(message);
        },
      },
    );
  };

  return (
    <>
      {serverError ? (
        <Popup
          type={PopupType.VAR3}
          title={serverError}
          leftText="확인"
          onLeft={handleErrorConfirm}
        />
      ) : (
        <Popup
          type={PopupType.VAR1}
          title={`정말 닉네임을 변경할까요?\n닉네임을 30일마다 1번\n수정할 수 있어요.`}
          leftText="취소"
          rightText={isPending ? '변경 중...' : '변경하기'}
          onLeft={onClose}
          onRight={handleChangeNickname}
          leftDisabled={isPending}
          rightDisabled={isPending}
        />
      )}
    </>
  );
};

export default ChangeNicknameConfirm;
