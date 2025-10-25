import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventsModalStoreState {
  isOpenConfirmLocation: boolean;
  isOpenOnlyScrapped: boolean;
  isOpenFilter: boolean;
  actions: {
    openConfirmLocation: () => void;
    closeConfirmLocation: () => void;
    openOnlyScrapped: () => void;
    closeOnlyScrapped: () => void;
    openFilter: () => void;
    closeFilter: () => void;
  };
}

const eventsModalStore = create<EventsModalStoreState>()(
  devtools(
    immer((set) => ({
      isOpenConfirmLocation: false,
      isOpenOnlyScrapped: false,
      isOpenFilter: false,
      actions: {
        openConfirmLocation: () => set((s) => ({ ...s, isOpenConfirmLocation: true })),
        closeConfirmLocation: () => set((s) => ({ ...s, isOpenConfirmLocation: false })),
        openOnlyScrapped: () => set((s) => ({ ...s, isOpenOnlyScrapped: true })),
        closeOnlyScrapped: () => set((s) => ({ ...s, isOpenOnlyScrapped: false })),
        openFilter: () => set((s) => ({ ...s, isOpenFilter: true })),
        closeFilter: () => set((s) => ({ ...s, isOpenFilter: false })),
      },
    })),
    { name: 'EventsModalStore' },
  ),
);

export default eventsModalStore;
