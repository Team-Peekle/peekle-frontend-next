'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { cn } from '@lib/utils';

import { PopupType } from '@common/types/popup';

import { ROUTES } from '@common/constants/routes';

import Checkbox from '@common/components/Checkbox.client';
import Popup from '@common/components/Popup.server';

import DescriptionCard from './DescriptionCard.client';

const WithDraw = () => {
  const router = useRouter();
  const [isChecked, setIsCecked] = useState(false);
  const [isWithdrawed, setIsWithdrawed] = useState(false);

  const handleCancle = () => {
    // parallel router 쓴다고 가정하고 이전 경로로 이동 (모달 닫기 역할)
    router.back();
  };

  const handleWithdraw = () => {
    // ✅ TODO: 여기서 실제 탈퇴 로직 수행
    setIsWithdrawed(true);
  };

  return (
    <>
      {!isWithdrawed ? (
        <div className="bg-gray-0 w-300pxr rounded-20pxr gap-16pxr pt-28pxr flex h-fit flex-col">
          <div className="p-14pxr gap-20pxr flex flex-col">
            <p className="text-p20 text-start text-gray-800">
              피클 탈퇴를 하기 위한 안내사항을 확인해주세요
            </p>
            <span className="gap-8pxr flex flex-col">
              <DescriptionCard
                description={`부정 이용 방지를 위해 탈퇴 후 7일 동안 \n재가입이 불가해요.`}
              />
              <DescriptionCard description="계정 정보는 다시 복구할 수 없어요." />
              <DescriptionCard
                description={`탈퇴 시 작성된 글이나 댓글을 지울 수 \n없으니, 삭제할 내용이 있는 경우 \n직접 삭제 후 탈퇴해주세요.`}
              />
            </span>
            <div className="gap-6pxr flex flex-row items-center">
              <Checkbox checked={isChecked} onChange={(e) => setIsCecked(e.target.checked)} />
              <p className="text-p16b text-gray-700">유의사항을 확인했어요</p>
            </div>
          </div>
          <div className="pb-14pxr px-14pxr flex flex-row">
            <button className="text-p17b py-10pxr w-full text-gray-500" onClick={handleCancle}>
              취소
            </button>
            <button
              className={cn(
                'text-p17b py-10pxr w-full',
                isChecked ? 'text-semantic-red' : 'text-gray-300',
              )}
              disabled={!isChecked}
              onClick={handleWithdraw}
              aria-disabled={!isChecked}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      ) : (
        <Popup
          type={PopupType.VAR3}
          title={`탈퇴 처리가 완료되었습니다. \n서비스를 이용해주셔서 감사합니다.`}
          leftText="확인"
          onLeft={() => router.push(ROUTES.SIGN_IN)}
        />
      )}
    </>
  );
};
export default WithDraw;
