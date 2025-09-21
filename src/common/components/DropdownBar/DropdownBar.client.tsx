'use client';

import { useRef, useState } from 'react';

import { DropdownType } from '@common/types/dropdown';

import CategoryMenu from '@common/components/CategoryMenu/CategoryMenu.client';
import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';
import ModalPortal from '@common/components/modal/ModalPortal.client';

import { SortType } from '@features/events/types/sort';

import { useOpenFilter } from '@features/events/hooks/stores/useEventsModalStore';
import useSort from '@features/events/hooks/useSort';

import SortMenu from '@features/events/components/SortMenu/SortMenu.client';

import { SORT_LABELS } from '@features/events/constansts/sort';

interface DropdownState {
  filter: boolean;
  sort: boolean;
  category: boolean;
}

const DropdownBar = () => {
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
      sort: false,
      category: false,
      [menuName]: !prev[menuName],
    }));

    if (menuName === 'filter') {
      // 필터 모달 열기
      openFilter();
    }
  };

  return (
    <div className="scrollbar-hide gap-12pxr px-12pxr flex flex-shrink-0 flex-row items-center overflow-x-auto">
      {/* Filter Dropdown & Menu */}
      {/* ✅ TODO: 애니메이션 적용 필요 */}
      <Dropdown
        dropdownType={DropdownType.VAR6}
        text="필터"
        onClick={() => handleDropdownClick('filter')}
      />
      <span className="gap-8pxr flex flex-row items-center">
        {/* Sort Dropdown & Menu */}
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        <Dropdown
          ref={sortRef}
          dropdownType={DropdownType.VAR1}
          text={SORT_LABELS[currentSort as SortType]}
          onClick={() => handleDropdownClick('sort', sortRef)}
        />
        {/* Category Dropdown & Menu */}
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        <Dropdown
          ref={categoryRef}
          dropdownType={DropdownType.VAR1}
          // ✅ TODO: 실제 값으로 변경 필요
          text="카테고리"
          onClick={() => handleDropdownClick('category', categoryRef)}
        />
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        {isActiveBookmarkDropdown ? (
          <Dropdown
            dropdownType={DropdownType.VAR4}
            text="내가 찜한 이벤트"
            onClick={() => {
              setIsActiveBookmarkDropdown(false);
            }}
          />
        ) : (
          <Dropdown
            dropdownType={DropdownType.VAR5}
            text="내가 찜한 이벤트"
            onClick={() => {
              setIsActiveBookmarkDropdown(true);
              setOpenedDropdowns({ filter: false, sort: false, category: false });
            }}
          />
        )}
      </span>
      <button className="text-p14 py-7pxr shrink-0 text-gray-500">초기화</button>

      {/* {openedDropdowns.sort && (
        <div className="mt-8pxr absolute top-full">
          <SortMenu />
        </div>
      )}
      {openedDropdowns.category && (
        <div className="mt-8pxr absolute top-full">
          <CategoryMenu />
        </div>
      )} */}
      {openedDropdowns.sort && (
        <ModalPortal>
          <div
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
