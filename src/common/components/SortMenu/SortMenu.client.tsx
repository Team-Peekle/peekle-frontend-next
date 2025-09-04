'use client';

import { SORT_LABELS } from '@common/constants/sort';

import Select from '@common/components/btn/Select/Select.client';

const SortMenu = () => {
  // ✅ TODO: 훅으로 로직 추출 필요
  return (
    <div className="bg-gray-0 gap-4pxr p-8pxr rounded-12pxr flex h-fit w-fit flex-col items-center justify-center shadow-[0_0_40px_0_rgba(126,131,145,0.5)]">
      {/* 기본값 */}
      <Select
        text={SORT_LABELS.NEAREST_DATE}
        isSelected={true}
        onStateChange={(newState, text, oldState) => {
          console.log('가까운 날짜순 새상태:', newState, '텍스트:', text, '이전상태:', oldState);
        }}
      />
      <Select
        text={SORT_LABELS.LOWEST_PRICE}
        isSelected={false}
        onStateChange={(newState, text, oldState) => {
          console.log('낮은 금액순 새상태:', newState, '텍스트:', text, '이전상태:', oldState);
        }}
      />
      <Select
        text={SORT_LABELS.NEAREST_DISTANCE}
        isSelected={false}
        onStateChange={(newState, text, oldState) => {
          console.log('가까운 거리순 새상태:', newState, '텍스트:', text, '이전상태:', oldState);
        }}
      />
    </div>
  );
};

export default SortMenu;
