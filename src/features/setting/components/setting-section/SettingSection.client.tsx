'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import { ROUTES } from '@common/constants/routes';
import { TERMS_LABELS } from '@common/constants/terms';

import UserProfile from '@common/components/UserProfile.client';

import { GetUsersMeResponseDTO } from '@features/setting/schemas/api/user';

import useSettingSection from '@features/setting/hooks/useSettingSection';

import { useIsMobile } from '@/common/hooks/useIsMobile';

import { ModalType } from '../../constants/modal';
import LinkButton from '../LinkButton.client';
import Title from '../Title.client';
import SettingModals from './SettingModals.client';

interface SettingSectionCommonProps {
  userInfo: GetUsersMeResponseDTO;
  openModal: (modalType: ModalType) => void;
}
export default function SettingSection() {
  const isMobile = useIsMobile();
  const common = useSettingSection();

  return (
    <>
      {isMobile ? (
        <SettingSection.Mobile userInfo={common.userInfo} openModal={common.openModal} />
      ) : (
        <SettingSection.Web userInfo={common.userInfo} openModal={common.openModal} />
      )}
      <SettingModals activeModal={common.activeModal} onClose={common.closeModal} />
    </>
  );
}

SettingSection.Mobile = function SettingSectionMobile({
  userInfo,
  openModal,
}: SettingSectionCommonProps) {
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
              onClick={() => openModal(ModalType.PROFILE_EDIT)}
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
          <LinkButton label="로그아웃" onClick={() => openModal(ModalType.LOGOUT)} />
          <LinkButton label="탈퇴하기" onClick={() => openModal(ModalType.WITHDRAW)} />
        </div>
      </section>
    </>
  );
};

SettingSection.Web = function SettingSectionWeb({
  userInfo,
  openModal,
}: SettingSectionCommonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 tab 파라미터를 가져옴 (기본값: profile)
  const currentTab = searchParams.get('settingTab') || 'profile';

  const handleTabChange = (tab: string) => {
    router.push(`?settingTab=${tab}`, { scroll: false });
  };

  return (
    <>
      <section className="pt-40pxr px-16pxr gap-x-44pxr flex flex-row">
        {/* 탭 */}
        <div className="w-145pxr not-last:gap-y-12pxr flex flex-col">
          <LinkButton
            label="내 정보"
            onClick={() => handleTabChange('profile')}
            showArrow={false}
            isActive={currentTab === 'profile'}
          />
          <LinkButton
            label="약관 및 개인정보"
            onClick={() => handleTabChange('policy')}
            showArrow={false}
            isActive={currentTab === 'policy'}
          />
          <LinkButton
            label="설정"
            onClick={() => handleTabChange('settings')}
            showArrow={false}
            isActive={currentTab === 'settings'}
          />
        </div>
        {/* 메인 */}
        <div className="flex-1">
          {currentTab === 'profile' && (
            <div>
              <Title title="커뮤니티 프로필" className="pt-6pxr pl-18pxr text-p20" />
              <div className="py-16pxr pl-18pxr flex items-center justify-between">
                <span className="gap-x-12pxr flex items-center">
                  <UserProfile variant={ProfileVariant.SIZE_40} />
                  <p className="text-p16sb text-gray-800">{userInfo?.nickname}</p>
                </span>
                <button
                  onClick={() => openModal(ModalType.PROFILE_EDIT)}
                  className="text-p14 rounded-8pxr py-5pxr px-10pxr shrink-0 bg-gray-100 text-gray-900"
                >
                  프로필 수정
                </button>
              </div>
            </div>
          )}
          {currentTab === 'policy' && (
            <div className="flex flex-col">
              <Title title="약관 및 개인정보 처리" className="pt-6pxr pl-18pxr text-p20" />
              <span className="gap-y-8pxr pt-8pxr pl-6pxr flex flex-col">
                <LinkButton label={TERMS_LABELS.PRIVACY} href={ROUTES.TERMS.PRIVACY} />
                <LinkButton label={TERMS_LABELS.TERMS} href={ROUTES.TERMS.TERMS} />
              </span>
            </div>
          )}
          {currentTab === 'settings' && (
            <div className="flex flex-col">
              <Title title="설정" className="pt-6pxr pl-18pxr text-p20" />
              <span className="gap-y-8pxr pt-8pxr pl-6pxr flex flex-col">
                <LinkButton label="로그아웃" onClick={() => openModal(ModalType.LOGOUT)} />
                <LinkButton label="탈퇴하기" onClick={() => openModal(ModalType.WITHDRAW)} />
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
