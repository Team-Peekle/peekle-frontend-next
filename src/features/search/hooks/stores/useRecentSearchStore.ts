import { useShallow } from 'zustand/shallow';

import { PageContextType } from '@common/types/routes';

import recentSearchStore from '@features/search/stores/recentSearchStore';

export const useRecentSearchInfo = (type: PageContextType) =>
  recentSearchStore(
    useShallow((state) => ({
      recentSearches: state.recentSearches[type], // 해당 타입의 배열만 리턴
    })),
  );

export const useSetRecentSearch = () => recentSearchStore((state) => state.actions.setRecentSearch);
export const useRemoveRecentSearch = () =>
  recentSearchStore((state) => state.actions.removeRecentSearch);
export const useClearRecentSearch = () =>
  recentSearchStore((state) => state.actions.clearRecentSearch);
