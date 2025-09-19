import { useRouter, useSearchParams } from 'next/navigation';

import { CategoryType } from '../types/category';

export default function useCategory() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const currentCategory = searchParams.get('category') ?? CategoryType.ALL;

  const handleSelectCategory = (newCategory: CategoryType) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('category', newCategory);

    router.push(`?${updatedParams.toString()}`);
  };

  return { currentCategory, handleSelectCategory };
}
