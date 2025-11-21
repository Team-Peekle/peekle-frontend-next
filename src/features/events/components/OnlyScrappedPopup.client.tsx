'use client';

import { useRouter } from 'next/navigation';

import { PopupType } from '@common/types/popup';

import { ROUTES } from '@common/constants/routes';

import Popup from '@common/components/Popup.server';
import ModalLayout from '@common/components/modal/ModalLayout.client';

import { useCloseOnlyScrapped, useEventsModalInfo } from '../hooks/stores/useEventsModalStore';

const OnlyScrappedPopup = () => {
  const router = useRouter();
  const { isOpenOnlyScrapped } = useEventsModalInfo();
  const closeOnlyScrapped = useCloseOnlyScrapped();

  const handleRefusalSignIn = () => {
    // 모달 닫기
    closeOnlyScrapped();
  };

  const handleConfirmSignIn = () => {
    // 모달 닫기
    closeOnlyScrapped();
    // 페이지 이동
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <>
      {isOpenOnlyScrapped && (
        <ModalLayout canClickDimmed={false}>
          <Popup
            type={PopupType.VAR1}
            title={`로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?`}
            leftText="아니오"
            rightText="예"
            onLeft={handleRefusalSignIn}
            onRight={handleConfirmSignIn}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default OnlyScrappedPopup;
