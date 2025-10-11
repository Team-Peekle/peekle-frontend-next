'use client';

import { useState } from 'react';

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
  const [isOpenDefaultSort, setIsOpenDefaultSort] = useState(false);

  const handleRefusalLocation = () => {
    localStorage.setItem('curr-location-agree', 'false');
    setIsMyLocationLoading(false);
    setIsOpenDefaultSort(true); // 기본 정렬 안내 띄우기
    // 모달 닫으면서 가까운 날짜순 정렬 적용
    // closeConfirmLocation();
    handleSelectSort(SortType.DATE);
  };

  const handleLocationSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    setMyLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    localStorage.setItem('curr-location-agree', 'true');
    setIsMyLocationLoading(true);
    getCurrentLocation()
      .then(handleLocationSuccess)
      .catch((error) => {
        console.error('위치 가져오기 실패:', error);
        // 실패 시 위치 거부와 동일하게 처리
        handleRefusalLocation();
      })
      .finally(() => {
        setIsMyLocationLoading(false);
        // 모달 닫으면서 가까운 거리순 정렬
        closeConfirmLocation();
        handleSelectSort(SortType.DISTANCE);
      });
  };

  const handleCloseDefaultSort = () => {
    setIsOpenDefaultSort(false);
    // Now that the second popup is closed, you can close the main modal
    closeConfirmLocation();
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

      {isOpenDefaultSort && (
        <ModalLayout canClickDimmed={false}>
          <Popup
            type={PopupType.VAR2}
            title="위치 동의 거부로 기본 정렬을 사용합니다."
            leftText="확인"
            onLeft={handleCloseDefaultSort}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ConfirmLocationPopup;
