'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { DropdownType } from '@common/types/dropdown';

import { loginStore } from '@common/stores/loginStore';

import CategoryMenu from '@common/components/CategoryMenu/CategoryMenu.client';
import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';
import ModalPortal from '@common/components/modal/ModalPortal.client';

import { CategoryType } from '@features/events/types/category';
import { SortType } from '@features/events/types/sort';

import {
  useOpenFilter,
  useOpenOnlyScrapped,
} from '@features/events/hooks/stores/useEventsModalStore';
import useEventsFilter from '@features/events/hooks/useEventsFilter';
import useSort from '@features/events/hooks/useSort';

import SortMenu from '@features/events/components/SortMenu/SortMenu.client';

import { SORT_LABELS } from '@features/events/constansts/sort';

interface DropdownState {
  filter: boolean;
  sort: boolean;
  category: boolean;
}

const DropdownBar = () => {
  const { isLoggedIn } = loginStore();
  const openOnlyScrapped = useOpenOnlyScrapped();
  const { clearFilter } = useEventsFilter();
  const searchParams = useSearchParams();
  const router = useRouter();

  const openFilter = useOpenFilter();
  const { currentSort } = useSort();
  // 필터, 정렬, 카테고리 드롭다운 열림 상태
  const [openedDropdowns, setOpenedDropdowns] = useState<DropdownState>({
    filter: false,
    sort: false,
    category: false,
  });
  // 메뉴 위치
  const [MenuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  // 각 드롭다운 버튼의 위치를 참조할 ref
  const sortRef = useRef<HTMLButtonElement | null>(null);
  const categoryRef = useRef<HTMLButtonElement | null>(null);
  // 드롭다운 메뉴 바깥 클릭시 닫기 위해
  // 드롭다운 메뉴를 참조할 ref
  const sortMenuRef = useRef<HTMLDivElement | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 열려 있는 경우, 해당 메뉴 컴포넌트 ref
      const isInsideSortMenu =
        openedDropdowns.sort && sortMenuRef.current && sortMenuRef.current.contains(target);
      const isInsideCategoryMenu =
        openedDropdowns.category &&
        categoryMenuRef.current &&
        categoryMenuRef.current.contains(target);

      // 클릭된 요소가
      // 열린 SortMenu 내부도 아니고 (isInsideSortMenu === false)
      // 열린 CategoryMenu 내부도 아닐 때 (isInsideCategoryMenu === false)
      if (!isInsideSortMenu && !isInsideCategoryMenu) {
        // 닫기
        setOpenedDropdowns({
          filter: false,
          sort: false,
          category: false,
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openedDropdowns]);

  // 내가 찜한 이벤트 드롭다운 활성화 상태
  const [isActiveBookmarkDropdown, setIsActiveBookmarkDropdown] = useState(false);

  const handleDropdownClick = (
    menuName: keyof DropdownState,
    ref?: React.RefObject<HTMLButtonElement | null>,
  ) => {
    if (ref?.current && menuName !== 'filter') {
      const rect = ref.current.getBoundingClientRect();
      setMenuPosition({
        x: Math.round(rect.left + window.scrollX),
        y: Math.round(rect.bottom + window.scrollY + 8), // 간격 조금 줌
      });
    }

    setOpenedDropdowns((prev) => ({
      filter: false,
      sort: menuName === 'sort' ? !prev.sort : false,
      category: menuName === 'category' ? !prev.category : false,
    }));

    if (menuName === 'filter') {
      // 필터 모달 열기
      openFilter();
    }
  };

  // categories 문자열
  const categoriesValue = searchParams.get('categories');

  let categoriesStr: string;

  if (categoriesValue) {
    const categoriesArray = categoriesValue.split(',');
    if (categoriesArray.includes(CategoryType.ALL)) {
      // ALL이 있으면 무조건 '카테고리'를 표시하고 바로 종료
      categoriesStr = '카테고리';
    } else {
      categoriesStr = categoriesArray.filter(Boolean).join(', ');
    }
  } else {
    categoriesStr = '카테고리';
  }

  return (
    <div className="scrollbar-hide gap-12pxr px-12pxr flex flex-shrink-0 flex-row items-center overflow-x-auto">
      {/* Filter Dropdown & Menu */}
      <Dropdown
        dropdownType={DropdownType.VAR6}
        text="필터"
        onClick={() => handleDropdownClick('filter')}
      />
      <span className="gap-8pxr flex flex-row items-center">
        {/* Sort Dropdown & Menu */}
        <Dropdown
          ref={sortRef}
          dropdownType={DropdownType.VAR1}
          text={SORT_LABELS[currentSort as SortType]}
          onClick={() => handleDropdownClick('sort', sortRef)}
        />
        {/* Category Dropdown & Menu */}
        <Dropdown
          ref={categoryRef}
          dropdownType={DropdownType.VAR1}
          text={categoriesStr}
          onClick={() => handleDropdownClick('category', categoryRef)}
        />
        {/* Bookmark */}
        {isActiveBookmarkDropdown ? (
          <Dropdown
            dropdownType={DropdownType.VAR4}
            text="내가 찜한 이벤트"
            onClick={() => {
              setIsActiveBookmarkDropdown(false);
              router.push(`?onlyScrapped=false`);
            }}
          />
        ) : (
          <Dropdown
            dropdownType={DropdownType.VAR5}
            text="내가 찜한 이벤트"
            onClick={() => {
              // 다른 드롭다운은 닫기
              setOpenedDropdowns({ filter: false, sort: false, category: false });
              // 로그인 한 사용자인지 확인해 팝업 열기
              if (!isLoggedIn) {
                openOnlyScrapped();
                return;
              }
              // 필터링 적용
              setIsActiveBookmarkDropdown(true);
              router.push(`?onlyScrapped=true`);
            }}
          />
        )}
      </span>
      <button onClick={clearFilter} className="text-p14 py-7pxr shrink-0 text-gray-500">
        초기화
      </button>

      {openedDropdowns.sort && (
        <ModalPortal>
          <div
            ref={sortMenuRef}
            className="absolute"
            style={{
              top: `${MenuPosition.y}px`,
              left: `${MenuPosition.x}px`,
            }}
          >
            <SortMenu />
          </div>
        </ModalPortal>
      )}
      {openedDropdowns.category && (
        <ModalPortal>
          <div
            ref={categoryMenuRef}
            className="absolute"
            style={{
              top: `${MenuPosition.y}px`,
              left: `${MenuPosition.x}px`,
            }}
          >
            <CategoryMenu />
          </div>
        </ModalPortal>
      )}
    </div>
  );
};

export default DropdownBar;
