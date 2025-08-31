'use client';

import { useState } from 'react';

import { DropdownType } from '@common/types/dropdown';

import CategoryMenu from '@common/components/CategoryMenu/CategoryMenu.client';
import SortMenu from '@common/components/SortMenu/SortMenu.client';
import Dropdown from '@common/components/btn/Dropdown/Dropdown.client';

const DropdownBar = () => {
  // 필터, 정렬, 카테고리 드롭다운 열림 상태
  const [openedDropdowns, setOpenedDropdowns] = useState({
    filter: false,
    sort: false,
    category: false,
  });

  // 내가 찜한 이벤트 드롭다운 활성화 상태
  const [isActiveBookmarkDropdown, setIsActiveBookmarkDropdown] = useState(false);

  const handleFilterDropdownClick = () => {
    setOpenedDropdowns((prev) => ({
      filter: !prev.filter,
      sort: false,
      category: false,
    }));
  };

  const handleSortDropdownClick = () => {
    setOpenedDropdowns((prev) => ({
      filter: false,
      sort: !prev.sort,
      category: false,
    }));
  };

  const handleCategoryDropdownClick = () => {
    setOpenedDropdowns((prev) => ({
      filter: false,
      sort: false,
      category: !prev.category,
    }));
  };

  return (
    <div className="gap-12pxr pl-12pxr flex flex-shrink-0 flex-row items-center">
      {/* Filter Dropdown & Menu */}
      {/* ✅ TODO: 애니메이션 적용 필요 */}
      <div className="relative">
        <Dropdown
          dropdownType={DropdownType.VAR1}
          text="필터"
          onClick={handleFilterDropdownClick}
        />
        {openedDropdowns.filter && (
          <div className="mt-8pxr absolute top-full z-1">{/* <FilterMenu /> */}</div>
        )}
      </div>
      <span className="gap-8pxr flex flex-row items-center">
        {/* Sort Dropdown & Menu */}
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        <div className="relative">
          <Dropdown
            dropdownType={DropdownType.VAR6}
            // ✅ TODO: 실제 값으로 변경 필요
            text="가까운 날짜순"
            onClick={handleSortDropdownClick}
          />
          {openedDropdowns.sort && (
            <div className="mt-8pxr absolute top-full z-1">
              {' '}
              {/* Position the menu absolutely */}
              <SortMenu />
            </div>
          )}
        </div>
        {/* Category Dropdown & Menu */}
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        <div className="relative">
          <Dropdown
            dropdownType={DropdownType.VAR6}
            // ✅ TODO: 실제 값으로 변경 필요
            text="카테고리"
            onClick={handleCategoryDropdownClick}
          />
          {openedDropdowns.category && (
            <div className="mt-8pxr absolute top-full z-1">
              <CategoryMenu />
            </div>
          )}
        </div>
        {/* ✅ TODO: 애니메이션 적용 필요 */}
        {isActiveBookmarkDropdown ? (
          <Dropdown
            dropdownType={DropdownType.VAR4}
            text="내가 찜한 이벤트"
            onClick={() => setIsActiveBookmarkDropdown(false)}
          />
        ) : (
          <Dropdown
            dropdownType={DropdownType.VAR5}
            text="내가 찜한 이벤트"
            onClick={() => setIsActiveBookmarkDropdown(true)}
          />
        )}
      </span>
      <button className="text-p14 py-7pxr text-gray-500">초기화</button>
    </div>
  );
};

export default DropdownBar;
