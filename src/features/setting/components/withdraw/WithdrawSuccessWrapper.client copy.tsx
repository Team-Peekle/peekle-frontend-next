'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES } from '@common/constants/routes';

import WithdrawSuccessModal from './WithdrawSuccessModal.client';

const WithdrawSuccessWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에 withdraw=success가 있는지 확인
  const isWithdrawSuccess = searchParams.get('withdraw') === 'success';

  const handleCloseModal = () => {
    // 쿼리 파라미터를 제거하여 모달을 닫음
    router.replace(ROUTES.ROOT);
  };
  return (
    <>
      isWithdrawSuccess && (
      <WithdrawSuccessModal onClose={handleCloseModal} />)
    </>
  );
};

export default WithdrawSuccessWrapper;
