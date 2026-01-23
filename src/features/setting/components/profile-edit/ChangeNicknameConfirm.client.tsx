'use client';

import { useState } from 'react';

import { PopupType } from '@common/types/popup';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import Popup from '@common/components/Popup.server';

import { UpdateProfileImageRequestDTO } from '@features/setting/schemas/api/user';

import useChangeNickname from '@features/setting/hooks/mutations/useChangeNickname';
import useChangeProfileImage from '@features/setting/hooks/mutations/useChangeProfileImage';

interface ChangeNicknameConfirmProps {
  onClose: () => void;
  onParentClose: () => void;
  onResetNickname: () => void;
  newNickname: string;
  newProfileImages: UpdateProfileImageRequestDTO[];
}
const ChangeNicknameConfirm = ({
  onClose,
  onParentClose,
  onResetNickname,
  newNickname,
  newProfileImages,
}: ChangeNicknameConfirmProps) => {
  const { mutate: changeNicknameMutate, isPending: isNicknamePending } = useChangeNickname();
  const { mutate: changeImageMutate, isPending: isImagePending } = useChangeProfileImage();
  const addToast = useAddToast();
  const [serverError, setServerError] = useState<string | null>(null);

  const isPending = isNicknamePending || isImagePending;

  const handleErrorConfirm = () => {
    setServerError(null);
    onResetNickname(); // 확인 버튼 누를 때 닉네임 원복
    onClose();
  };

  const handleChangeProfile = () => {
    // 1. 먼저 닉네임 변경
    changeNicknameMutate(
      { newNickname },
      {
        onSuccess: () => {
          // 닉네임 변경 성공 시, 이미지를 변경
          changeImageMutate(
            { newProfileImages },
            {
              onSuccess: () => {
                addToast({ text: '프로필이 성공적으로 수정되었습니다.' });
                onClose();
                onParentClose();
              },
              onError: () => {
                // 이미지는 실패하고 닉네임만 성공한 경우에 대한 처리
                addToast({ text: '닉네임은 변경되었으나 이미지 변경에 실패했습니다.' });
                onClose();
                onParentClose();
              },
            },
          );
        },
        onError: (err) => {
          console.log(err);
          setServerError(err.message);
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
          onRight={handleChangeProfile}
          leftDisabled={isPending}
          rightDisabled={isPending}
        />
      )}
    </>
  );
};

export default ChangeNicknameConfirm;
