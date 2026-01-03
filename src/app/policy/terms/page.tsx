import { TermsType } from '@common/types/terms';

import PolicyRenderer from '@features/policy/components/PolicyRenderer.client';

const TermsPage = () => {
  return <PolicyRenderer termsType={TermsType.TERMS} />;
};

export default TermsPage;
