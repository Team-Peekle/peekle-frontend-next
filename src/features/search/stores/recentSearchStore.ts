import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PageContextType } from '@common/types/routes';

interface RecentSearchStoreState {
  recentSearches: Record<PageContextType, string[]>;
  actions: {
    setRecentSearch: (type: PageContextType, search: string) => void;
    removeRecentSearch: (type: PageContextType, search: string) => void;
    clearRecentSearch: (type: PageContextType) => void;
  };
}

const MAX_RECENT_SEARCH = 10;

const recentSearchStore = create<RecentSearchStoreState>()(
  devtools(
    persist(
      immer((set) => ({
        recentSearches: {
          [PageContextType.EVENT]: [],
          [PageContextType.COMMUNITY]: [],
        },
        actions: {
          setRecentSearch: (type, search) =>
            set((s) => {
              const targetList = s.recentSearches[type]; // 해당 타입의 리스트 선택

              // 검색어가 이미 존재하면 삭제 (순서를 맨 앞으로 갱신하기 위함)
              const existingIndex = targetList.indexOf(search);
              if (existingIndex !== -1) {
                targetList.splice(existingIndex, 1);
              }

              // 최신 검색어를 맨 앞에 추가 (unshift)
              targetList.unshift(search);

              // 저장 검색어 개수 제한
              if (targetList.length > MAX_RECENT_SEARCH) targetList.pop();
            }),

          removeRecentSearch: (type, search) =>
            set((state) => {
              state.recentSearches[type] = state.recentSearches[type].filter(
                (item) => item !== search,
              );
            }),

          clearRecentSearch: (type) =>
            set((state) => {
              state.recentSearches[type] = [];
            }),
        },
      })),
      // 새로고침해도 유지
      {
        name: 'recent-search-storage',
        partialize: (state) => ({ recentSearches: state.recentSearches }),
      },
    ),
    { name: 'RecentSearchStore' },
  ),
);

export default recentSearchStore;
