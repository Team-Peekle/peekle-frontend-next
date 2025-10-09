'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { cn } from '@common/libs/utils';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Checkbox from '@common/components/Checkbox.client';
import Textfield from '@common/components/Textfield';
import Cta from '@common/components/btn/Cta/Cta.client';

import { SignupSchema, TERM_IDS, signupSchema } from '@features/sign/types/signupSchema';

import { postAuthOauthRegisterOptions } from '@features/sign/api/auth';

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      terms: [
        { termId: TERM_IDS.SERVICE, isAccepted: false },
        { termId: TERM_IDS.PRIVACY, isAccepted: false },
      ],
    },
  });

  const registerMutation = useMutation(postAuthOauthRegisterOptions());

  const onSubmit = async (data: SignupSchema) => {
    try {
      await registerMutation.mutateAsync(data);
      router.push('/signup/complete');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr max-mb:w-full flex w-[568px] flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <section className="flex w-full flex-col gap-2">
            <h2 className="text-p16sb text-gray-800">닉네임</h2>
            <Textfield
              {...register('nickname', { maxLength: 10 })}
              maxLength={10}
              placeholder="사용하실 닉네임을 입력해주세요."
              status={errors.nickname ? 'error' : watch('nickname') ? 'success' : 'default'}
              helperText={
                errors.nickname
                  ? errors.nickname.message
                  : watch('nickname')
                    ? '사용할 수 있는 닉네임이에요.'
                    : `커뮤니티에서도 사용되는 닉네임이에요.\n가입 후에도 수정할 수 있어요.`
              }
            />
          </section>

          {/* 약관 동의 섹션 */}
          <section className="mt-10 flex w-full flex-col gap-4">
            <h2 className="text-p16sb text-gray-800">약관 동의</h2>
            <Controller
              name="terms"
              control={control}
              render={({ field }) => {
                const serviceChecked =
                  field.value.find((t) => t.termId === TERM_IDS.SERVICE)?.isAccepted || false;
                const privacyChecked =
                  field.value.find((t) => t.termId === TERM_IDS.PRIVACY)?.isAccepted || false;
                const allChecked = serviceChecked && privacyChecked;

                const handleTermChange = (termId: number, checked: boolean) => {
                  const updatedTerms = field.value.map((term) =>
                    term.termId === termId ? { ...term, isAccepted: checked } : term,
                  );
                  field.onChange(updatedTerms);
                };

                const handleAllTermsChange = (checked: boolean) => {
                  const updatedTerms = field.value.map((term) => ({
                    ...term,
                    isAccepted: checked,
                  }));
                  field.onChange(updatedTerms);
                };

                return (
                  <div className="flex flex-col gap-4">
                    {/* 전체 동의 */}
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                      <Checkbox
                        checked={allChecked}
                        onChange={(e) => handleAllTermsChange(e.target.checked)}
                      />
                      <label className="text-p16sb text-gray-900">네, 모두 동의합니다.</label>
                    </div>

                    {/* 개별 약관 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={serviceChecked}
                          onChange={(e) => handleTermChange(TERM_IDS.SERVICE, e.target.checked)}
                        />
                        <label className="text-p16m text-gray-900">(필수) 서비스 이용약관</label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={privacyChecked}
                          onChange={(e) => handleTermChange(TERM_IDS.PRIVACY, e.target.checked)}
                        />
                        <label className="text-p16m text-gray-900">(필수) 개인정보처리방침</label>
                      </div>
                    </div>

                    {errors.terms && (
                      <p className="text-p14m text-red-500">{errors.terms.message}</p>
                    )}
                  </div>
                );
              }}
            />
          </section>

          <Cta
            className={cn('mt-[72px] w-full')}
            type="submit"
            disabled={!isValid || registerMutation.isPending}
            text={registerMutation.isPending ? '가입 중...' : '가입하기'}
          />
        </form>
      </main>
    </div>
  );
}
