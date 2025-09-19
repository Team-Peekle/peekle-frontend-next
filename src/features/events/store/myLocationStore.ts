import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface LocationPosition {
  latitude: number;
  longitude: number;
}

interface MyLocationStoreState {
  isMyLocationLoading: boolean;
  myLocation: LocationPosition | null;
  actions: {
    setIsMyLocationLoading: (isLoading: boolean) => void;
    setMyLocation: (location: LocationPosition) => void;
  };
}

const myLocationStore = create<MyLocationStoreState>()(
  devtools(
    immer((set) => ({
      isMyLocationLoading: false,
      myLocation: null,
      actions: {
        setIsMyLocationLoading: (isLoading) => {
          set((s) => {
            s.isMyLocationLoading = isLoading;
          });
        },
        setMyLocation: (location) => {
          set((s) => {
            s.myLocation = location;
          });
        },
      },
    })),
    { name: 'MyLocationStore' },
  ),
);

export default myLocationStore;
