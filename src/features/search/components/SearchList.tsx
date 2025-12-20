'use client';

import { PageContextType } from '@common/types/routes';

import { Close } from '@common/components/svg/Close';

import DropdownBar from '@features/events/components/DropdownBar/DropdownBar.client';
import EventsList from '@features/events/components/EventsList/EventsList.client';

import CommunityList from './CommunityList';

import {
  useClearRecentSearch,
  useRecentSearchInfo,
  useRemoveRecentSearch,
} from '../hooks/stores/useRecentSearchStore';
import useSearch from '../hooks/useSearch';

const SearchList = () => {
  const { pageContextType, hasSearchQuery, handleSearch } = useSearch();

  const recentSearches = useRecentSearchInfo(pageContextType).recentSearches;
  const removeRecentSearch = useRemoveRecentSearch();
  const clearRecentSearch = useClearRecentSearch();

  return (
    <>
      {hasSearchQuery ? (
        <>
          {/* 검색어가 있을 때: 결과 리스트 노출 */}
          {pageContextType === PageContextType.EVENT ? (
            <>
              <DropdownBar />
              <EventsList isSearchPage={true} />
            </>
          ) : (
            <CommunityList isSearchPage={true} />
          )}
        </>
      ) : (
        /* 검색어가 없을 때: 최근 검색어 노출 */
        <div className="pt-20pxr gap-y-20pxr px-12pxr flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-p20 text-gray-600">최근 검색어</h3>
            <button
              onClick={() => {
                clearRecentSearch(pageContextType);
              }}
              className="text-p18m text-gray-400 hover:text-gray-600"
            >
              전체 삭제
            </button>
          </div>
          {/* 리스트 */}
          {recentSearches.length === 0 ? (
            <p className="text-17b text-gray-600">최근 검색어가 없어요</p>
          ) : (
            <ul className="rounded-16pxr gap-y-24pxr py-24pxr px-28pxr flex flex-col bg-gray-100">
              {recentSearches.map((keyword) => (
                <li key={keyword} className="flex w-full items-center justify-between">
                  <span className="text-17b cursor-pointer" onClick={() => handleSearch(keyword)}>
                    {keyword}
                  </span>
                  <Close
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(pageContextType, keyword);
                    }}
                    className="cursor-pointer text-gray-900"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchList;
