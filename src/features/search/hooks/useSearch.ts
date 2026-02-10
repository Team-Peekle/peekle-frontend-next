import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { PageContextType } from '@common/types/routes';

import { useSetRecentSearch } from './stores/useRecentSearchStore';

const MIN_LENGTH = 2;

/**
 * 최근 검색을 위한 커스텀 훅
 */
export default function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 값 가져오기
  const pageContextType = (searchParams.get('context') as PageContextType) ?? PageContextType.EVENT;
  const queryFromUrl = searchParams.get('q') ?? '';

  // 입력창 상태 관리 (URL과 분리)
  // 초기값은 URL에 있는 값으로 설정 (새로고침 시 유지 위해)
  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [isOpenMinLengthPopup, setIsOpenMinLengthPopup] = useState(false);

  const hasSearchQuery = !!queryFromUrl && inputValue.trim().length > 0;

  // 스토어 훅
  const setRecentSearch = useSetRecentSearch();

  // URL이 바뀌면(뒤로가기 등) 입력창도 동기화
  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  // 검색 실행 함수 (URL 이동)
  const handleSearch = (keyword?: string) => {
    // 인자로 받은 keyword가 있으면 그걸 쓰고, 없으면 inputValue 사용
    const targetQuery = keyword ?? inputValue;
    const trimmedQuery = targetQuery.trim();

    // 빈 값은 무시
    if (!trimmedQuery) return;

    // 유효성 검사
    if (trimmedQuery.length < MIN_LENGTH) {
      setIsOpenMinLengthPopup(true);
      return;
    }

    // URL 업데이트 (페이지 이동)
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('q', trimmedQuery);
    newParams.set('context', pageContextType); // context 유지

    router.push(`?${newParams.toString()}`);
  };

  // URL(q)이 변경되었을 때 스토어에 저장
  useEffect(() => {
    if (queryFromUrl && queryFromUrl.trim().length >= MIN_LENGTH) {
      setRecentSearch(pageContextType, queryFromUrl);
    }
  }, [queryFromUrl, pageContextType, setRecentSearch]);

  // 입력 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (isOpenMinLengthPopup) setIsOpenMinLengthPopup(false);

    // 검색어를 다 지웠을 때 URL 동기화
    if (newValue.trim().length === 0) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('q'); // 쿼리 파라미터 삭제
      router.replace(`?${newParams.toString()}`);
    }
  };

  // 5. 엔터 키 핸들러
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSearch();
    }
  };

  return {
    pageContextType,
    inputValue,
    hasSearchQuery,
    handleChange,
    handleKeyDown,
    handleSearch,
    isOpenMinLengthPopup,
    setIsOpenMinLengthPopup,
  };
}
