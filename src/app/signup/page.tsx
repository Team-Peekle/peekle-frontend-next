'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import { useModal } from '@common/hooks/useModal';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Textfield from '@common/components/Textfield';
import Cta from '@common/components/btn/Cta/Cta.client';

import { SignupSchema, signupSchema } from '@features/sign/types/signupSchema';

import { useOauthInfo } from '@features/sign/hooks/useOauthInfo';

import { getUsersNicknameCheckOptions } from '@features/setting/apis/get/userOptions';

import TermsAgreementModal from '@features/sign/components/TermsAgreementModal';

import { postAuthOauthRegisterOptions } from '@features/sign/api/auth';

export default function SignupPage() {
  const router = useRouter();
  const [debouncedNickname, setDebouncedNickname] = useState('');
  const { openModal, closeModal } = useModal();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      terms: [],
    },
  });

  const nickname = watch('nickname');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNickname(nickname);
    }, 1000);

    return () => clearTimeout(timer);
  }, [nickname]);

  const { data: nicknameCheckData } = useQuery({
    ...getUsersNicknameCheckOptions(debouncedNickname),
    enabled: debouncedNickname.trim().length > 0 && !errors.nickname,
  });

  const oauthInfo = useOauthInfo();

  const registerMutation = useMutation({
    ...postAuthOauthRegisterOptions(),
    onSuccess: () => {
      closeModal();
      router.push(ROUTES.SIGNUP_COMPLETE);
    },
  });

  const onNicknameSubmit = () => {
    openModal(({ isOpen, onClose }) => (
      <TermsAgreementModal
        control={control}
        isOpen={isOpen}
        onClose={onClose}
        onFormSubmit={handleSubmit((data) => registerMutation.mutate(data))}
        isPending={registerMutation.isPending}
      />
    ));
  };

  const isNicknameValid = !errors.nickname && nicknameCheckData?.available === true;

  return (
    <div className="flex flex-col items-center">
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr max-mb:w-full flex w-[568px] flex-col items-center">
        <div className="flex w-full flex-col gap-10">
          <section className="flex w-full flex-col gap-2">
            <h2 className="text-p16sb text-gray-800">이름</h2>
            <Textfield value={oauthInfo?.name || ''} disabled status="default" />
          </section>
          <section className="flex w-full flex-col gap-2">
            <h2 className="text-p16sb text-gray-800">닉네임</h2>
            <Textfield
              {...register('nickname', { maxLength: 10 })}
              maxLength={10}
              placeholder="사용하실 닉네임을 입력해주세요."
              status={
                errors.nickname
                  ? 'error'
                  : nicknameCheckData?.available === false
                    ? 'error'
                    : nicknameCheckData?.available === true
                      ? 'success'
                      : 'default'
              }
              helperText={
                errors.nickname
                  ? errors.nickname.message
                  : nicknameCheckData?.available === false
                    ? '이미 있는 닉네임이에요'
                    : nicknameCheckData?.available === true
                      ? '사용할 수 있는 닉네임이에요.'
                      : `커뮤니티에서 사용되는 닉네임이에요.\n가입 후에도 수정할 수 있어요.`
              }
            />
          </section>

          <Cta
            className={cn('mt-[72px] w-full')}
            onClick={onNicknameSubmit}
            disabled={!isNicknameValid}
            text="가입하기"
          />
        </div>
      </main>
    </div>
  );
}
