import { Suspense } from 'react';

import DeferredLoader from '@common/components/DeferredLoader/DeferredLoader.client';

import AnimationWrapper from '@features/search/components/AnimationWrapper';
import SearchHeader from '@features/search/components/SearchHeader';
import SearchList from '@features/search/components/SearchList';

const SearchPage = () => {
  return (
    // 페이지 진입하자마자 애니메이션 시작
    <AnimationWrapper>
      <Suspense fallback={<DeferredLoader className="mt-100pxr" size={40} />}>
        <SearchHeader />
        <SearchList />
      </Suspense>
    </AnimationWrapper>
  );
};

export default SearchPage;
