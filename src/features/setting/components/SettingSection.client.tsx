'use client';

import { ROUTES } from '@common/constants/routes';
import { TERMS_LABELS } from '@common/constants/terms';

import { useIsMobile } from '@/common/hooks/useIsMobile';

import LinkButton from './LinkButton.client';
import ProfileRow from './ProfileRow.client';
import Title from './Title.client';

export default function SettingSection() {
  const isMobile = useIsMobile();

  return <>{isMobile ? <SettingSection.Mobile /> : <SettingSection.Web />}</>;
}

SettingSection.Mobile = function SettingSectionMobile() {
  return (
    <section className="g-y-40pxr px-16pxr flex flex-col">
      <div className="mt-32pxr">
        <Title title="커뮤니티 프로필" />
        <ProfileRow />
      </div>

      <div className="gap-y-8pxr py-8pxr flex flex-col">
        <Title title="약관 및 개인정보처리" className="pb-16pxr" />
        <LinkButton label={TERMS_LABELS.PRIVACY} href={ROUTES.TERMS.PRIVACY} />
        <LinkButton label={TERMS_LABELS.TERMS} href={ROUTES.TERMS.TERMS} />
      </div>

      <div className="gap-y-8pxr py-8pxr flex flex-col">
        <Title title="설정" className="pb-16pxr" />
        <LinkButton label="로그아웃" href={ROUTES.MODAL.SETTING.LOGOUT} />
        <LinkButton label="탈퇴하기" href={ROUTES.MODAL.SETTING.WITHDRAW} />
      </div>
    </section>
  );
};

SettingSection.Web = function SettingSectionWeb() {
  return <section></section>;
};
