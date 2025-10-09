'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@common/libs/utils';

import DefaultNavbar from '@common/layout/DefaultNavbar.client';

import Textfield from '@common/components/Textfield';
import Cta from '@common/components/btn/Cta/Cta.client';

import { SignupSchema, signupSchema } from '@features/sign/types/signupSchema';

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
    },
  });

  const onSubmit = (data: SignupSchema) => {
    console.log('회원가입 데이터:', data);
    router.push('/signup/complete');
  };

  return (
    <div className="flex flex-col items-center">
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr max-mb:w-full flex w-[568px] flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <section className="flex w-full flex-col gap-2">
            <h2 className="text-p16sb text-gray-800">이름</h2>
            <Textfield
              {...register('name')}
              placeholder="이름을 입력해주세요."
              status={errors.name ? 'error' : 'default'}
              helperText={errors.name?.message || ''}
            />
          </section>
          <section className="mt-10 flex w-full flex-col gap-2">
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
          <Cta
            className={cn('mt-[72px] w-full')}
            type="submit"
            disabled={!isValid}
            text="가입하기"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </main>
    </div>
  );
}
