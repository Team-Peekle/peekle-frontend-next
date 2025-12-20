'use client';

import { useEffect, useId, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Controller, useForm } from 'react-hook-form';

import { Check } from '@common/components/svg/Check';

import queryKeys from '@common/constants/queryKeys';

import { createCommunityComment } from '../api';
import { type CreateCommunityCommentRequestDTO } from '../schema';

interface CommentInputProps {
  articleId: string;
  parentCommentId?: string | null;
  onReplyCancel?: () => void;
}

type CommentFormValues = Pick<CreateCommunityCommentRequestDTO, 'content' | 'isAnonymous'>;

const DEFAULT_VALUES: CommentFormValues = {
  content: '',
  isAnonymous: true,
};

export default function CommentInput({
  articleId,
  parentCommentId = null,
  onReplyCancel,
}: CommentInputProps) {
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const checkboxId = useId();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<CommentFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    setFocus('content');
  }, [setFocus]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: CommentFormValues) =>
      createCommunityComment({ articleId, parentCommentId, ...values }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.community.comments(articleId).queryKey,
      });
      reset(DEFAULT_VALUES);
      setSubmitError(null);
      onReplyCancel?.();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '댓글 작성 중 오류가 발생했습니다.';
      setSubmitError(message);
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await mutateAsync(values);
    } catch {
      // onError에서 처리
    }
  });

  return (
    <div className='sticky bottom-0 left-0 right-0'>
      <form
      onSubmit={onSubmit}
      className="flex w-full flex-col bg-gray-50 px-[14px] py-[12px] rounded-[16px]"
    >
      <div className="flex items-start justify-between gap-[12px]">
        <Controller
          control={control}
          name="isAnonymous"
          render={({ field: { value, onChange } }) => (
            <label htmlFor={checkboxId} className="flex items-center gap-[5px] cursor-pointer">
              <div className="relative">
                <input
                  id={checkboxId}
                  type="checkbox"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  checked={!!value}
                  onChange={(event) => onChange(event.target.checked)}
                />
                <div
                  className={`size-[16px] rounded flex items-center justify-center transition-colors duration-200 ${
                    value
                      ? 'border-gray-900 bg-gray-900'
                      : 'border-gray-200 bg-gray-600'
                  }`}
                >
                  {value && <Check className="size-4 text-white" />}
                </div>
              </div>
              <span className="text-p15b text-gray-700 whitespace-nowrap">익명</span>
            </label>
          )}
        />
        <textarea
          className="h-46px w-full resize-none text-gray-900 placeholder:text-gray-200 focus:outline-none"
          placeholder="따뜻한 댓글을 입력해주세요 :)"
          {...register('content', { required: '댓글을 입력해주세요.' })}
        />
      </div>
      {errors.content && (
        <p className="text-p13 text-red-500">{errors.content.message ?? '댓글을 입력해주세요.'}</p>
      )}
      {submitError && <p className="text-p13 text-red-500">{submitError}</p>}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="text-p16b px-[12px] py-[4px] text-gray-700 transition-opacity disabled:opacity-50"
        >
          {isPending ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
    </div>
  );
}
