'use client';

import { PopupType } from '@common/types/popup';

import Popup from '@common/components/Popup.server';
import ModalLayout from '@common/components/modal/ModalLayout.client';

import { useCloseConfirmLocation, useEventsModalInfo } from '../hooks/stores/useEventsModalStore';
import { useSetMyLocation, useSetMyLocationLoading } from '../hooks/stores/useMyLocationStore';
import useSort from '../hooks/useSort';
import { SortType } from '../types/sort';
import getCurrentLocation from '../utils/getCurrentLocation';

const ConfirmLocationPopup = () => {
  const setIsMyLocationLoading = useSetMyLocationLoading();
  const setMyLocation = useSetMyLocation();
  const { isOpenConfirmLocation } = useEventsModalInfo();
  const closeConfirmLocation = useCloseConfirmLocation();
  const { handleSelectSort } = useSort();

  const handleRefusalLocation = () => {
    localStorage.setItem('curr-location-agree', 'false');
    setIsMyLocationLoading(false);
    alert('위치 동의 거부로 기본 정렬을 사용합니다.'); // alert 띄우기
    // 모달 닫으면서 가까운 날짜순 정렬 적용
    closeConfirmLocation();
    handleSelectSort(SortType.NEAREST_DATE);
  };

  const handleLocationSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setMyLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    localStorage.setItem('curr-location-agree', 'true');
    setIsMyLocationLoading(true);
    getCurrentLocation()
      .then(handleLocationSuccess)
      .finally(() => {
        setIsMyLocationLoading(false);
        // 모달 닫으면서 가까운 거리순 정렬
        closeConfirmLocation();
        handleSelectSort(SortType.NEAREST_DISTANCE);
      });
  };

  return (
    <>
      {isOpenConfirmLocation && (
        <ModalLayout canClickDimmed={false}>
          <Popup
            type={PopupType.VAR1}
            title="위치 정보 제공에 동의하시겠습니까?"
            leftText="아니오"
            rightText="예"
            onLeft={handleRefusalLocation}
            onRight={handleConfirmLocation}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ConfirmLocationPopup;
