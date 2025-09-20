import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { CategoryType, exceptAllCategoryOptions } from '../types/category';

export default function useCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategories = useMemo(() => {
    const categoryParam = searchParams.get('category');
    return categoryParam?.split(',') ?? CategoryType.ALL;
  }, [searchParams]);

  const handleSelectCategory = (newCategory: CategoryType) => {
    const updatedParams = new URLSearchParams(searchParams.toString()); // 기존 쿼리 파라미터 복사
    let currentCategories = searchParams.get('category')?.split(',') ?? CategoryType.ALL;

    // '전체' 포함되어 있으면 제거
    if (Array.isArray(currentCategories)) {
      currentCategories = currentCategories.filter((v) => v !== CategoryType.ALL);
    }

    if (newCategory === CategoryType.ALL) {
      // '전체' 선택시
      updatedParams.set('category', CategoryType.ALL);
    } else if (Array.isArray(currentCategories) && currentCategories.includes(newCategory)) {
      // 이미 선택된 값이면 제거
      const newValues = currentCategories.filter((v) => v !== newCategory);
      updatedParams.set(
        'category',
        newValues.length === 0 ? CategoryType.ALL : newValues.join(','),
      );
    } else {
      // 새로운 값 추가
      const newValues = [...currentCategories, newCategory];
      // 추가 후 모든 옵션이 선택되면 '전체'로 변경
      if (newValues.length === exceptAllCategoryOptions.length) {
        updatedParams.set('category', CategoryType.ALL);
      } else {
        updatedParams.set('category', newValues.join(','));
      }
    }

    router.push(`?${updatedParams.toString()}`);
  };

  return { currentCategories, handleSelectCategory };
}
