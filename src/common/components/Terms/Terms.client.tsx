'use client';

import { useState } from 'react';

import { TermsType } from '@common/types/terms';

import Checkbox from '@common/components/Checkbox.client';
import Cta from '@common/components/btn/Cta/Cta.client';

const Terms = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [requiredChecked, setRequiredChecked] = useState({
    [TermsType.TERMS]: false,
    [TermsType.PRIVACY]: false,
  });

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    setRequiredChecked({
      [TermsType.TERMS]: checked,
      [TermsType.PRIVACY]: checked,
    });
  };

  const handleRequiredChange = (key: Exclude<TermsType, TermsType.CONTACT>, checked: boolean) => {
    const updatedRequiredChecked = { ...requiredChecked, [key]: checked };
    setRequiredChecked(updatedRequiredChecked);
    setAllChecked(Object.values(updatedRequiredChecked).every(Boolean));
  };

  const isSubmitDisabled = !Object.values(requiredChecked).every(Boolean);

  return (
    <div className="w-328pxr rounded-16pxr px-20pxr pt-40pxr pb-20pxr gap-40pxr flex h-fit flex-col items-center justify-center bg-white">
      <div className="gap-44pxr flex flex-shrink-0 flex-col">
        {/* 헤더 영역 */}
        <div className="gap-4pxr flex flex-col">
          <p className="text-h3">약관에 동의해주세요</p>
          <p className="text-p16m text-gray-600">서비스를 이용하기 위해서는 동의가 필요해요</p>
        </div>
        {/* 체크 영역 */}
        <div className="gap-20pxr flex flex-col">
          <div className="pb-20pxr gap-8pxr flex flex-row items-center border-b border-b-gray-100">
            <Checkbox
              checked={allChecked}
              onChange={(e) => handleAllCheckedChange(e.target.checked)}
            />
            <p className="text-p17b text-gray-900">네, 모두 동의합니다.</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="gap-8pxr flex flex-row items-center">
              <Checkbox
                checked={requiredChecked[TermsType.TERMS]}
                onChange={(e) => handleRequiredChange(TermsType.TERMS, e.target.checked)}
              />
              <p className="text-p16m text-gray-900">(필수) 서비스 이용약관</p>
            </span>
            <button className="text-p16m text-gray-300">보기</button>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="gap-8pxr flex flex-row items-center">
              <Checkbox
                checked={requiredChecked[TermsType.PRIVACY]}
                onChange={(e) => handleRequiredChange(TermsType.PRIVACY, e.target.checked)}
              />
              <p className="text-p16m text-gray-900">(필수) 개인정보 처리방침</p>
            </span>
            <button className="text-p16m text-gray-300">보기</button>
          </div>
        </div>
      </div>
      {/* 완료 버튼 */}
      <Cta
        text="가입 완료"
        disabled={isSubmitDisabled}
        onClick={() => {
          console.log('가입 완료 클릭');
        }}
      />
    </div>
  );
};

export default Terms;
