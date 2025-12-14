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
      <Title title="커뮤니티 프로필" />
      <ProfileRow />

      <Title title="약관 및 개인정보처리" />
      <LinkButton label={TERMS_LABELS.PRIVACY} href={ROUTES.TERMS.PRIVACY} />
      <LinkButton label={TERMS_LABELS.TERMS} href={ROUTES.TERMS.TERMS} />

      <Title title="설정" />
      <LinkButton label="로그아웃" href={ROUTES.MODAL.SETTING.LOGOUT} />
      <LinkButton label="탈퇴하기" href={ROUTES.MODAL.SETTING.WITHDRAW} />
    </section>
  );
};

SettingSection.Web = function SettingSectionWeb() {
  return <section></section>;
};
