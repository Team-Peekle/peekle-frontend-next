import { TermsType } from '@common/types/terms';

import { TermsLabels } from '@common/constants/terms';

import FooterButton from './TermsButton.client';

const Footer = () => {
  // 구분선
  const Divider = () => <p className="text-p13-14 text-gray-200">|</p>;

  // 임시 클릭 핸들러
  const handleClick = (type: TermsType) => {
    console.log(`${TermsLabels[type]} 클릭`);
  };

  return (
    <div className="pt-40pxr pb-24pxr px-18pxr gap-8pxr bg-gray-0 flex flex-col items-center">
      <div className="gap-x-4pxr flex items-center">
        <FooterButton termsType={TermsType.PRIVACY} onClick={handleClick} />
        <Divider />
        <FooterButton termsType={TermsType.TERMS} onClick={handleClick} />
        <Divider />
        <FooterButton termsType={TermsType.CONTACT} onClick={handleClick} />
      </div>
      <p className="text-p13-14 text-center text-gray-300">ⓒ 2025 Peekle. All rights reserved</p>
    </div>
  );
};

export default Footer;
