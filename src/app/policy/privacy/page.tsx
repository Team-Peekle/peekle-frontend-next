import { TermsType } from '@common/types/terms';

import PolicyRenderer from '@features/policy/components/PolicyRenderer.client';

const PrivacyPage = () => {
  return <PolicyRenderer termsType={TermsType.PRIVACY} />;
};

export default PrivacyPage;
