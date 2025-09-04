'use client';

import { useState } from 'react';

import { CategoryOptions } from '@common/types/category';

import { CATEGORY_LABELS } from '@common/constants/category';

import Select from '@common/components/btn/Select/Select.client';

const CategoryMenu = () => {
  // ✅ TODO: 훅으로 추출 필요
  // 기본은 모두 선택된 상태로 초기화
  const [selectedCategories, setSelectedCategories] = useState({
    [CategoryOptions.ALL]: true,
    [CategoryOptions.EDUCATION]: true,
    [CategoryOptions.CULTURE]: true,
  });

  const handleCategoryChange = (key: CategoryOptions, newState: boolean) => {
    let updatedState = { ...selectedCategories };

    // 전체 선택 클릭시
    if (key === CategoryOptions.ALL) {
      updatedState = {
        [CategoryOptions.ALL]: newState,
        [CategoryOptions.EDUCATION]: newState,
        [CategoryOptions.CULTURE]: newState,
      };
    } else {
      // '교육' 또는 '문화' 카테고리를 클릭했을 때
      updatedState[key] = newState;

      // '교육'과 '문화'가 모두 선택되었는지 확인, 전체 이벤트 상태도 업데이트
      const allSelected =
        updatedState[CategoryOptions.EDUCATION] && updatedState[CategoryOptions.CULTURE];
      updatedState[CategoryOptions.ALL] = allSelected;
    }

    // 아무것도 안 선택되는 경우는 없음 - 교육을 기본으로 함
    if (
      !updatedState[CategoryOptions.EDUCATION] &&
      !updatedState[CategoryOptions.CULTURE] &&
      key !== CategoryOptions.ALL
    ) {
      updatedState = {
        [CategoryOptions.ALL]: false,
        [CategoryOptions.EDUCATION]: true, // 교육을 기본으로 활성화해둠
        [CategoryOptions.CULTURE]: false,
      };
    }

    setSelectedCategories(updatedState);
  };

  return (
    <div className="bg-gray-0 gap-16pxr px-8pxr pt-8pxr pb-16pxr rounded-12pxr flex h-fit w-fit flex-col items-center justify-center shadow-[0_0_40px_0_rgba(126,131,145,0.5)]">
      <span className="gap-8pxr flex flex-col">
        <Select
          text={CATEGORY_LABELS.ALL}
          isSelected={selectedCategories[CategoryOptions.ALL]}
          onStateChange={(newState) =>
            handleCategoryChange(CategoryOptions.ALL, newState as boolean)
          }
        />
        <Select
          text={CATEGORY_LABELS.EDUCATION}
          isSelected={selectedCategories[CategoryOptions.EDUCATION]}
          onStateChange={(newState) =>
            handleCategoryChange(CategoryOptions.EDUCATION, newState as boolean)
          }
        />
        <Select
          text={CATEGORY_LABELS.CULTURE}
          isSelected={selectedCategories[CategoryOptions.CULTURE]}
          onStateChange={(newState) =>
            handleCategoryChange(CategoryOptions.CULTURE, newState as boolean)
          }
        />
      </span>
      <p className="text-primary-500 text-p16sb px-8pxr">*2개 이상 선택 가능</p>
    </div>
  );
};

export default CategoryMenu;
