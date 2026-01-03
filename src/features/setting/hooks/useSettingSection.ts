import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getUsersMeOptions } from '@common/apis/get/userOptions';

import { ModalType } from '../constants/modal';

export default function useSettingSection() {
  const { data: userInfo } = useSuspenseQuery(getUsersMeOptions());
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const closeModal = () => setActiveModal(null);
  const openModal = (type: ModalType) => setActiveModal(type);

  return { userInfo, activeModal, openModal, closeModal };
}
