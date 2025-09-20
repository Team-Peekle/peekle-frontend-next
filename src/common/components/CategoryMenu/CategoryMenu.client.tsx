'use client';

import Select from '@common/components/btn/Select/Select.client';

import { CategoryType } from '@features/events/types/category';

import useCategory from '@features/events/hooks/useCategory';

import { CATEGORY_LABELS } from '@features/events/constansts/category';

const CategoryMenu = () => {
  const { currentCategories, handleSelectCategory } = useCategory();

  return (
    <div className="bg-gray-0 gap-16pxr px-8pxr pt-8pxr pb-16pxr rounded-12pxr w-155pxr flex h-fit flex-col items-center justify-center shadow-[0_0_40px_0_rgba(126,131,145,0.5)]">
      <div className="gap-8pxr flex w-full flex-col">
        {Object.keys(CATEGORY_LABELS).map((key) => {
          const type = key as CategoryType;

          return (
            <Select
              key={type}
              text={CATEGORY_LABELS[type]}
              isSelected={currentCategories.includes(type)}
              onStateChange={() => handleSelectCategory(type)}
            />
          );
        })}
      </div>
      <p className="text-primary-500 text-p16sb px-8pxr">*2개 이상 선택 가능</p>
    </div>
  );
};

export default CategoryMenu;
