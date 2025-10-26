import { useRouter, useSearchParams } from 'next/navigation';

import { SortType } from '../types/sort';
import { useOpenConfirmLocation } from './stores/useEventsModalStore';

const useSort = () => {
  const openConfirmLocation = useOpenConfirmLocation();
  const searchParams = useSearchParams();

  const router = useRouter();

  const currentSort = searchParams.get('sort') ?? SortType.DATE;

  const handleSelectSort = (newSort: SortType) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('sort', newSort);

    // 가까운 거리순일 경우
    if (newSort === SortType.DISTANCE) {
      // 로컬 스토리지에서 위치 동의 여부 가져와 안 되어있으면 모달로 확인
      const locationAgreed = localStorage.getItem('curr-location-agree');
      if (locationAgreed !== 'true') {
        openConfirmLocation();
        return;
      }
    }

    router.push(`?${updatedParams.toString()}`);
  };

  return { currentSort, handleSelectSort };
};

export default useSort;
