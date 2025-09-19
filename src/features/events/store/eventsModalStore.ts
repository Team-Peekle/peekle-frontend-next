import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface EventsModalStoreState {
  isOpenConfirmLocation: boolean;
  isOpenFilter: boolean;
  actions: {
    openConfirmLocation: () => void;
    closeConfirmLocation: () => void;
    openFilter: () => void;
    closeFilter: () => void;
  };
}

const eventsModalStore = create<EventsModalStoreState>()(
  devtools(
    immer((set) => ({
      isOpenConfirmLocation: false,
      isOpenFilter: false,
      actions: {
        openConfirmLocation: () => set((s) => ({ ...s, isOpenConfirmLocation: true })),
        closeConfirmLocation: () => set((s) => ({ ...s, isOpenConfirmLocation: false })),
        openFilter: () => set((s) => ({ ...s, isOpenFilter: true })),
        closeFilter: () => set((s) => ({ ...s, isOpenFilter: false })),
      },
    })),
    { name: 'EventsModalStore' },
  ),
);

export default eventsModalStore;
