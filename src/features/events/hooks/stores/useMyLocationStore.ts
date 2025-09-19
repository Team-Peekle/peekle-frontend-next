import { useShallow } from 'zustand/shallow';

import myLocationStore from '../../store/myLocationStore';

export const useMyLocationInfo = () =>
  myLocationStore(
    useShallow((state) => ({
      isMyLocationLoading: state.isMyLocationLoading,
      myLocation: state.myLocation,
    })),
  );

export const useSetMyLocationLoading = () =>
  myLocationStore((state) => state.actions.setIsMyLocationLoading);
export const useSetMyLocation = () => myLocationStore((state) => state.actions.setMyLocation);
