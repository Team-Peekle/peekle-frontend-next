import { Suspense } from 'react';

import { TermsType } from '@common/types/terms';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import PolicyRenderer from '@features/policy/components/PolicyRenderer.client';

const TermsPage = () => {
  return (
    <Suspense fallback={<DeferredLoader className="mt-200pxr" />}>
      <PolicyRenderer termsType={TermsType.PRIVACY} />
    </Suspense>
  );
};

export default TermsPage;
