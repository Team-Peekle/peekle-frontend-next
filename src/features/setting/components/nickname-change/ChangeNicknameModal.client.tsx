'use client';

import { useRouter } from 'next/navigation';

import { PopupType } from '@common/types/popup';

import { useAddToast } from '@common/hooks/stores/useToastStore';

import Popup from '@common/components/Popup.server';

import useChangeNickname from '@features/setting/hooks/mutations/useChangeNickname';

interface ChangeNicknameModalProps {
  newNickname: string;
}

const ChangeNicknameModal = ({ newNickname }: ChangeNicknameModalProps) => {
  const router = useRouter();

  const addToast = useAddToast();

  const handleCancel = () => {
    router.back();
  };

  const { mutate, isPending } = useChangeNickname();

  const handleConfirmChange = () => {
    if (!newNickname) {
      addToast({ text: '변경할 닉네임 정보가 없습니다.' });
      router.back();
      return;
    }

    mutate(
      { newNickname: newNickname },
      {
        onSuccess: () => {
          addToast({ text: '닉네임 변경 성공!' });
          router.back(); // 성공 후 모달 닫기
        },
        onError: (err) => {
          console.error('닉네임 변경 실패:', err);
          // TODO: 날짜 문제면 모달 또 띄워야 함
        },
      },
    );
  };

  return (
    <Popup
      type={PopupType.VAR1}
      title={`정말 닉네임을 변경할까요?\n닉네임은 30일마다 1번\n수정할 수 있어요.`}
      leftText="취소"
      rightText={isPending ? '처리 중...' : '변경'}
      onLeft={handleCancel}
      onRight={handleConfirmChange}
      leftDisabled={isPending}
      rightDisabled={isPending}
    />
  );
};
export default ChangeNicknameModal;
