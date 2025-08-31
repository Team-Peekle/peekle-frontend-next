import { useShallow } from 'zustand/shallow';

import toastStoreState from '@common/store/toastStore';

export const useToastInfo = () =>
  toastStoreState(
    useShallow((state) => ({
      toastList: state.toastList,
    })),
  );

export const useAddToast = () => toastStoreState((state) => state.actions.addToast);
export const useRemoveToast = () => toastStoreState((state) => state.actions.removeToast);
export const useClearToast = () => toastStoreState((state) => state.actions.clearToasts);
