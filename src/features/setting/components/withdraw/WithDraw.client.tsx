'use client';

import { useState } from 'react';

import { cn } from '@common/libs/utils';

import Checkbox from '@common/components/Checkbox.client';

import useWithdraw from '@features/setting/hooks/mutations/useWithdraw';

import DescriptionCard from './DescriptionCard.client';

interface WithDrawModalProps {
  onClose: () => void;
}

const WithDrawModal = ({ onClose }: WithDrawModalProps) => {
  const [isChecked, setIsCecked] = useState(false);
  const { mutate: withdraw, isPending } = useWithdraw();

  const handleCancle = () => {
    onClose();
  };

  const handleWithdraw = () => {
    withdraw();
  };

  return (
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
  );
};
export default WithDrawModal;
