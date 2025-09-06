import { useShallow } from 'zustand/shallow';

import toastStore from '@common/store/toastStore';

export const useToastInfo = () =>
  toastStore(
    useShallow((state) => ({
      toastList: state.toastList,
    })),
  );

export const useAddToast = () => toastStore((state) => state.actions.addToast);
export const useRemoveToast = () => toastStore((state) => state.actions.removeToast);
export const useClearToast = () => toastStore((state) => state.actions.clearToasts);
