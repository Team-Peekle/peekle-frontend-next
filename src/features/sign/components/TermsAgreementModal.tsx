'use client';

import Link from 'next/link';

import { Control, Controller } from 'react-hook-form';

import { ROUTES } from '@common/constants/routes';
import { POLICY_LINKS } from '@common/constants/terms';

import { cn } from '@common/libs/utils';

import Checkbox from '@common/components/Checkbox.client';
import Cta from '@common/components/btn/Cta/Cta.client';

import { SignupSchema, TERM_IDS } from '@features/sign/types/signupSchema';

interface TermsAgreementModalProps {
  control: Control<SignupSchema>;
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

export default function TermsAgreementModal({
  control,
  isOpen,
  onClose,
  onFormSubmit,
  isPending,
}: TermsAgreementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-gray-0 mx-16pxr max-w-600pxr p-20pxr relative w-full rounded-[16px] shadow-lg">
        <form onSubmit={onFormSubmit} className="flex flex-col gap-[44px]">
          <div className="flex flex-col gap-[4px] pt-[20px]">
            <h2 className="text-h3 text-gray-900">약관에 동의해주세요</h2>
            <p className="text-p16m text-gray-600">서비스를 이용하기 위해서는 동의가 필요해요</p>
          </div>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => {
              const serviceChecked =
                field.value?.find((t) => t.termId === TERM_IDS.SERVICE)?.isAccepted || false;
              const privacyChecked =
                field.value?.find((t) => t.termId === TERM_IDS.PRIVACY)?.isAccepted || false;
              const allChecked = serviceChecked && privacyChecked;

              const handleTermChange = (termId: number, checked: boolean) => {
                const currentTerms = field.value || [];
                const existingTerm = currentTerms.find((t) => t.termId === termId);

                if (existingTerm) {
                  const updatedTerms = currentTerms.map((term) =>
                    term.termId === termId ? { ...term, isAccepted: checked } : term,
                  );
                  field.onChange(updatedTerms);
                } else {
                  field.onChange([...currentTerms, { termId, isAccepted: checked }]);
                }
              };

              const handleAllTermsChange = (checked: boolean) => {
                field.onChange([
                  { termId: TERM_IDS.SERVICE, isAccepted: checked },
                  { termId: TERM_IDS.PRIVACY, isAccepted: checked },
                ]);
              };

              return (
                <>
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex items-center gap-[8px] border-b border-gray-100 pb-[20px]">
                      <Checkbox
                        checked={allChecked}
                        onChange={(e) => handleAllTermsChange(e.target.checked)}
                      />
                      <label className="text-p17b text-gray-900">네, 모두 동의합니다.</label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Checkbox
                          checked={serviceChecked}
                          onChange={(e) => handleTermChange(TERM_IDS.SERVICE, e.target.checked)}
                        />
                        <label className="text-p16m text-gray-900">(필수) 서비스 이용약관</label>
                      </div>
                      <Link
                        className="text-p16m text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={POLICY_LINKS.TERMS}
                      >
                        보기
                      </Link>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <Checkbox
                          checked={privacyChecked}
                          onChange={(e) => handleTermChange(TERM_IDS.PRIVACY, e.target.checked)}
                        />
                        <label className="text-p16m text-gray-900">(필수) 개인정보처리방침</label>
                      </div>
                      <Link
                        className="text-p16m text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={POLICY_LINKS.PRIVACY}
                      >
                        보기
                      </Link>
                    </div>
                  </div>
                  <Cta
                    className={cn('w-full')}
                    type="submit"
                    disabled={isPending || !allChecked}
                    text={isPending ? '가입 중...' : '가입 완료'}
                  />
                </>
              );
            }}
          />
        </form>
      </div>
    </div>
  );
}
