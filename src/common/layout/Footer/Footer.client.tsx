'use client';

import { TermsType } from '@common/types/terms';

import { ROUTES } from '@common/constants/routes';
import { TERMS_LABELS } from '@common/constants/terms';

import FooterButton from './TermsButton.client';

const Footer = () => {
  // 구분선
  const Divider = () => <p className="text-p14-15 text-gray-200">|</p>;

  return (
    <footer className="pt-40pxr pb-24pxr px-18pxr gap-8pxr bg-gray-0 flex flex-col items-center">
      <div className="gap-x-4pxr flex items-center">
        <FooterButton termsType={TermsType.PRIVACY} href={ROUTES.TERMS.PRIVACY} />
        <Divider />
        <FooterButton termsType={TermsType.TERMS} href={ROUTES.TERMS.TERMS} />
        <Divider />
        <FooterButton termsType={TermsType.CONTACT} href={ROUTES.TERMS.CONTACT} />
      </div>
      <p className="text-p14-15 text-center text-gray-300">ⓒ 2025 Peekle. All rights reserved</p>
    </footer>
  );
};

export default Footer;
