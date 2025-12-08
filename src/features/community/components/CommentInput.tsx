'use client';

import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Switch from '@radix-ui/react-switch';
import { Controller, useForm } from 'react-hook-form';

import queryKeys from '@common/constants/queryKeys';

import { createCommunityComment } from '../api';
import { type CreateCommunityCommentRequestDTO } from '../schema';

interface CommentInputProps {
  articleId: string;
  parentCommentId?: string | null;
}

type CommentFormValues = Pick<CreateCommunityCommentRequestDTO, 'content' | 'isAnonymous'>;

const DEFAULT_VALUES: CommentFormValues = {
  content: '',
  isAnonymous: true,
};

export default function CommentInput({ articleId, parentCommentId = null }: CommentInputProps) {
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-p15b text-gray-900">익명</span>
        <Controller
          control={control}
          name="isAnonymous"
          render={({ field: { value, onChange } }) => (
            <label className="flex items-center gap-2">
              <span className="text-p13 text-gray-500">익명으로 작성</span>
              <Switch.Root
                className="relative h-5 w-9 rounded-full bg-gray-200 data-[state=checked]:bg-gray-900"
                checked={value}
                onCheckedChange={onChange}
              >
                <Switch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]" />
              </Switch.Root>
            </label>
          )}
        />
      </div>
      <textarea
        rows={3}
        className="text-p15 w-full resize-none rounded-xl border border-gray-200 p-4 text-gray-700 outline-none focus:border-gray-900"
        placeholder="따뜻한 댓글을 입력해주세요 :)"
        {...register('content', { required: '댓글을 입력해주세요.' })}
      />
      {errors.content && (
        <p className="text-p13 text-red-500">{errors.content.message ?? '댓글을 입력해주세요.'}</p>
      )}
      {submitError && <p className="text-p13 text-red-500">{submitError}</p>}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="text-p15b flex items-center rounded-lg bg-gray-900 px-5 py-2 text-white transition-opacity disabled:opacity-50"
        >
          {isPending ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  );
}
