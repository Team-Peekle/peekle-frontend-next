'use client';

import { useRouter } from 'next/navigation';

import { PopupType } from '@common/types/popup';
import { PageContextType } from '@common/types/routes';

import { ROUTES } from '@common/constants/routes';

import Popup from '@common/components/Popup.server';
import ModalLayout from '@common/components/modal/ModalLayout.client';
import { Search } from '@common/components/svg/Search';

import useSearch from '../hooks/useSearch';

const SearchHeader = () => {
  const router = useRouter();
  const {
    pageContextType,
    inputValue,
    handleChange,
    handleKeyDown,
    handleSearch,
    isOpenMinLengthPopup,
    setIsOpenMinLengthPopup,
  } = useSearch();

  // 닫기 버튼 핸들러
  const handleClose = () => {
    // 커뮤니티 컨텍스트라면 커뮤니티 메인으로,
    // 아니라면(이벤트) 루트(이벤트 메인)로 이동
    const targetPath =
      pageContextType === PageContextType.COMMUNITY ? ROUTES.COMMUNITY : ROUTES.ROOT;

    router.replace(targetPath);
  };

  return (
    <>
      <header className="p-12pxr gap-x-10pxr flex">
        <div className="rounded-12pxr px-16pxr py-14pxr gap-x-12pxr flex flex-1 items-center bg-gray-50">
          <Search
            onClick={() => handleSearch()}
            className="w-20pxr h-20pxr cursor-pointer text-gray-400"
          />
          <input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={`관심 있는 ${pageContextType === PageContextType.EVENT ? '활동' : '게시물'} 검색`}
            className="w-full text-gray-900 outline-none placeholder:text-gray-400"
            autoComplete="off"
            enterKeyHint="search"
          />
        </div>
        <button className="text-p15m text-gray-600" onClick={handleClose}>
          닫기
        </button>
      </header>
      {/* 최소 글자수 팝업 */}
      {isOpenMinLengthPopup && (
        <ModalLayout canClickDimmed={false}>
          <Popup
            type={PopupType.VAR3}
            title={'두 글자 이상 입력해주세요'}
            leftText="확인"
            onLeft={() => {
              setIsOpenMinLengthPopup(false);
            }}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default SearchHeader;
