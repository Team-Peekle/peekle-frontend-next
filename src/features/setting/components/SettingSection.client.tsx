'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProfileVariant } from '@common/types/profile';

import { ROUTES } from '@common/constants/routes';
import { TERMS_LABELS } from '@common/constants/terms';

import UserProfile from '@common/components/UserProfile.client';
import WithDraw from '@common/components/WithDraw/WithDraw.client';
import ModalLayout from '@common/components/modal/ModalLayout.client';

import { getUsersMeOptions } from '@common/apis/get/userOptions';

import LogoutModal from '@features/events/components/LogoutModal.client';
import ProfileEdit from '@features/setting/components/profile-edit/ProfileEdit.client';

import { useIsMobile } from '@/common/hooks/useIsMobile';

import { ModalType } from '../constants/modal';
import LinkButton from './LinkButton.client';
import Title from './Title.client';

export default function SettingSection() {
  const isMobile = useIsMobile();

  return <>{isMobile ? <SettingSection.Mobile /> : <SettingSection.Web />}</>;
}

SettingSection.Mobile = function SettingSectionMobile() {
  const { data: userInfo } = useQuery(getUsersMeOptions());

  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <section className="g-y-40pxr px-16pxr flex flex-col">
        <div className="mt-32pxr">
          <Title title="커뮤니티 프로필" className="pb-8pxr" />
          <div className="py-16pxr flex items-center justify-between">
            <span className="gap-x-12pxr flex items-center">
              <UserProfile variant={ProfileVariant.SIZE_40} />
              <p className="text-p16sb text-gray-800">{userInfo?.nickname}</p>
            </span>
            <button
              onClick={() => setActiveModal(ModalType.PROFILE_EDIT)}
              className="text-p14 rounded-8pxr py-5pxr px-10pxr shrink-0 bg-gray-100 text-gray-900"
            >
              프로필 수정
            </button>
          </div>
        </div>

        <div className="gap-y-8pxr py-8pxr flex flex-col">
          <Title title="약관 및 개인정보처리" />
          <LinkButton label={TERMS_LABELS.PRIVACY} href={ROUTES.TERMS.PRIVACY} />
          <LinkButton label={TERMS_LABELS.TERMS} href={ROUTES.TERMS.TERMS} />
        </div>

        <div className="gap-y-8pxr py-8pxr flex flex-col">
          <Title title="설정" />
          <LinkButton label="로그아웃" onClick={() => setActiveModal(ModalType.LOGOUT)} />
          <LinkButton label="탈퇴하기" onClick={() => setActiveModal(ModalType.WITHDRAW)} />
        </div>
      </section>
      {/* 모달들 */}
      {activeModal === ModalType.PROFILE_EDIT && (
        <ModalLayout canClickDimmed={false}>
          <ProfileEdit onClose={closeModal} />
        </ModalLayout>
      )}

      {activeModal === ModalType.LOGOUT && (
        <ModalLayout canClickDimmed={false}>
          <LogoutModal onClose={closeModal} />
        </ModalLayout>
      )}

      {activeModal === ModalType.WITHDRAW && (
        <ModalLayout canClickDimmed={false}>
          <WithDraw onClose={closeModal} />
        </ModalLayout>
      )}
    </>
  );
};

SettingSection.Web = function SettingSectionWeb() {
  return <section></section>;
};
