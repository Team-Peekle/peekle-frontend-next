import { useShallow } from 'zustand/shallow';

import tabsStore from '@common/store/tabsStore';

export const useTabsInfo = () =>
  tabsStore(
    useShallow((state) => ({
      selectedValue: state.selectedValue,
      option: state.option,
    })),
  );

export const useSetSelectedValue = () => tabsStore((state) => state.actions.setSelectedValue);
export const useSetOption = () => tabsStore((state) => state.actions.setOption);
