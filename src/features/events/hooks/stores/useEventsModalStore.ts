import { useShallow } from 'zustand/shallow';

import eventsModalStore from '../../store/eventsModalStore';

export const useEventsModalInfo = () =>
  eventsModalStore(
    useShallow((state) => ({
      isOpenConfirmLocation: state.isOpenConfirmLocation,
      isOpenOnlyScrapped: state.isOpenOnlyScrapped,
      isOpenFilter: state.isOpenFilter,
    })),
  );

export const useOpenConfirmLocation = () =>
  eventsModalStore((state) => state.actions.openConfirmLocation);
export const useCloseConfirmLocation = () =>
  eventsModalStore((state) => state.actions.closeConfirmLocation);
export const useOpenOnlyScrapped = () =>
  eventsModalStore((state) => state.actions.openOnlyScrapped);
export const useCloseOnlyScrapped = () =>
  eventsModalStore((state) => state.actions.closeOnlyScrapped);
export const useOpenFilter = () => eventsModalStore((state) => state.actions.openFilter);
export const useCloseFilter = () => eventsModalStore((state) => state.actions.closeFilter);
