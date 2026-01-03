import { Suspense } from 'react';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import SettingSection from '@features/setting/components/setting-section/SettingSection.client';

const SettingPage = () => {
  return (
    <Suspense fallback={<DeferredLoader className="mt-200pxr" />}>
      <SettingSection />
    </Suspense>
  );
};

export default SettingPage;
