'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, X } from 'lucide-react';
import { useController, useForm } from 'react-hook-form';

import { Check } from '@common/components/svg/Check';

import {
  type CommunityArticleDTO,
  type CommunityArticleFormValues,
  communityArticleFormSchema,
} from '@features/community/schema';

import { useCommunityArticleMutation } from '../hooks/useCommunityArticleMutation';
import { useCommunityPresignedUploader } from '../hooks/useCommunityPresignedUploader';

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

type UploadStatus = 'idle' | 'uploading' | 'uploaded' | 'failed';

interface ArticleImageItem {
  id: string;
  url?: string;
  previewUrl: string;
  status: UploadStatus;
  shouldRevoke?: boolean;
  isNew: boolean;
  errorMessage?: string;
  file?: File;
}

interface CommunityArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityId: string;
  mode: 'create' | 'edit';
  article?: CommunityArticleDTO;
  onSuccess?: () => void;
}

export function CommunityArticleModal({
  isOpen,
  onClose,
  communityId,
  mode,
  article,
  onSuccess,
}: CommunityArticleModalProps) {
  // Refs
  const modalRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mountedRef = useRef<boolean>(false);
  const didInitRef = useRef(false);
  const prevArticleIdRef = useRef<string | null>(null);

  const [images, setImages] = useState<ArticleImageItem[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<Set<string>>(new Set());
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CommunityArticleFormValues>({
    resolver: zodResolver(communityArticleFormSchema),
    mode: 'onChange',
    defaultValues: {
      communityId,
      title: '',
      content: '',
      isAnonymous: true,
    },
  });

  const { upload, isUploading, error: uploadError, resetError } = useCommunityPresignedUploader();

  const articleMutation = useCommunityArticleMutation({
    mode,
    articleId: article?.id,
    communityId,
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : '게시글 저장 중 오류가 발생했습니다.';
      setSubmitError(message);
    },
  });

  const isSubmitting = articleMutation.isPending;

  const switchId = useId();
  const titleId = useId();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      didInitRef.current = false;
      prevArticleIdRef.current = null;
      return;
    }

    const nextArticleId = article?.id ?? null;
    if (didInitRef.current && prevArticleIdRef.current === nextArticleId) {
      return;
    }

    didInitRef.current = true;
    prevArticleIdRef.current = nextArticleId;

    form.reset({
      communityId,
      title: article?.title ?? '',
      content: article?.content ?? '',
      isAnonymous: article?.isAnonymous ?? true,
    });

    const initialImages: ArticleImageItem[] =
      article?.images?.map((image) => ({
        id: image.imageUrl,
        url: image.imageUrl,
        previewUrl: image.imageUrl,
        status: 'uploaded' as const,
        isNew: false,
        shouldRevoke: false,
      })) ?? [];

    setImages(initialImages);
    setRemovedImageUrls(new Set());
    setSubmitError(null);
    resetError();
  }, [isOpen, article, communityId, form, resetError]);

  useEffect(() => {
    if (!isOpen) return;
    return () => {
      images.forEach((img) => {
        if (img.shouldRevoke) URL.revokeObjectURL(img.previewUrl);
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isUploading && !isSubmitting) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isUploading, isSubmitting, onClose]);

  const validateFiles = (files: File[]) => {
    const valid: File[] = [];
    const errors: string[] = [];
    for (const f of files) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errors.push(`${f.name}: 지원하지 않는 형식`);
        continue;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`${f.name}: ${MAX_SIZE_MB}MB 초과`);
        continue;
      }
      valid.push(f);
    }
    return { valid, errors };
  };

  const safeSetImages = (updater: (prev: ArticleImageItem[]) => ArticleImageItem[]) => {
    if (!mountedRef.current) return;
    setImages(updater);
  };

  const uploadSingle = useCallback(
    async (file: File) => {
      const res = await upload([file]);
      return res?.[0];
    },
    [upload],
  );

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      event.target.value = '';
      return;
    }

    const sliced = Array.from(files).slice(0, remaining);
    const { valid, errors } = validateFiles(sliced);
    if (errors.length) {
      setSubmitError(errors.join('\n'));
    }

    const newItems: ArticleImageItem[] = valid.map((file) => ({
      id: crypto.randomUUID(),
      previewUrl: URL.createObjectURL(file),
      status: 'uploading',
      shouldRevoke: true,
      isNew: true,
      file,
    }));

    safeSetImages((prev) => [...prev, ...newItems]);

    const results = await Promise.allSettled(
      newItems.map(async (item) => {
        const r = await uploadSingle(item.file!);
        return { itemId: item.id, fileUrl: r?.fileUrl };
      }),
    );

    safeSetImages((prev) =>
      prev.map((item) => {
        const r = results.find((x) => x.status === 'fulfilled' && x.value.itemId === item.id) as
          | PromiseFulfilledResult<{ itemId: string; fileUrl?: string }>
          | undefined;

        const rej = results.find(
          (x) =>
            x.status === 'rejected' &&
            (x as PromiseRejectedResult).reason &&
            newItems.find((n) => n.id === item.id),
        ) as PromiseRejectedResult | undefined;

        if (!newItems.find((n) => n.id === item.id)) return item;

        if (r && r.value.fileUrl) {
          if (item.shouldRevoke) URL.revokeObjectURL(item.previewUrl);
          return {
            ...item,
            url: r.value.fileUrl,
            previewUrl: r.value.fileUrl,
            status: 'uploaded',
            shouldRevoke: false,
            file: undefined,
          };
        }

        if (rej) {
          return {
            ...item,
            status: 'failed',
            errorMessage:
              (rej.reason && (rej.reason.message || String(rej.reason))) || '업로드 실패',
          };
        }

        return {
          ...item,
          status: 'failed',
          errorMessage: '업로드 실패',
        };
      }),
    );

    event.target.value = '';
  };

  const handleRemoveImage = (id: string) => {
    safeSetImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (!target) return prev;

      if (!target.isNew && target.url) {
        setRemovedImageUrls((s) => new Set(s).add(target.url!));
      }

      if (target.shouldRevoke) URL.revokeObjectURL(target.previewUrl);

      return prev.filter((img) => img.id !== id);
    });
  };

  const retryUpload = async (id: string) => {
    const target = images.find((i) => i.id === id);
    if (!target || target.status !== 'failed' || !target.file) return;

    safeSetImages((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'uploading', errorMessage: undefined } : i)),
    );

    try {
      const r = await uploadSingle(target.file);
      if (!r?.fileUrl) throw new Error('업로드 실패');
      safeSetImages((prev) =>
        prev.map((i) => {
          if (i.id !== id) return i;
          if (i.shouldRevoke) URL.revokeObjectURL(i.previewUrl);
          return {
            ...i,
            url: r.fileUrl,
            previewUrl: r.fileUrl,
            status: 'uploaded',
            shouldRevoke: false,
            file: undefined,
          };
        }),
      );
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : typeof e === 'string' ? e : '업로드 실패';
      safeSetImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: 'failed', errorMessage } : i)),
      );
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    const imageUrls = images
      .filter((img) => img.status === 'uploaded' && img.url)
      .map((img) => img.url!)
      .slice(0, MAX_IMAGES);

    const payload = {
      data: values,
      imageUrls,
      removeImageUrls: Array.from(removedImageUrls),
    } as const;

    articleMutation.mutate(payload);
  });

  const isSubmitDisabled = useMemo(() => {
    const hasUploading = images.some((img) => img.status === 'uploading');
    return !form.formState.isValid || isUploading || hasUploading || isSubmitting;
  }, [form.formState.isValid, images, isSubmitting, isUploading]);

  const bottomInfo = `${Math.min(images.length, MAX_IMAGES)}/${MAX_IMAGES}`;
  const { field: anonymousField } = useController({
    name: 'isAnonymous',
    control: form.control,
  });
  const onAnonymousChange = useCallback(
    (checked: boolean) => {
      if (anonymousField.value === checked) return;
      anonymousField.onChange(checked);
    },
    [anonymousField],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      ref={containerRef}
    >
      <div
        className={`absolute inset-0 bg-black/50 ${isUploading || isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={isUploading || isSubmitting ? undefined : onClose}
      />

      <form
        ref={modalRef}
        onSubmit={onSubmit}
        className="relative z-10 flex max-h-[90vh] w-full max-w-[480px] flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
      >
        <h2 id={titleId} className="sr-only">
          게시글 작성
        </h2>

        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading || isSubmitting}
            className="text-p18 text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`text-p18 ${isSubmitDisabled ? 'text-gray-200' : 'text-primary-600'}`}
          >
            게시
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          <div className="flex flex-col gap-3">
            <input
              {...form.register('title')}
              placeholder="제목을 입력해주세요."
              className="text-p20 w-full border-b border-gray-100 pb-3 outline-none placeholder:text-gray-400 focus:border-gray-300"
              aria-label="제목"
            />
            {form.formState.errors.title && (
              <p className="text-p13 text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <textarea
              {...form.register('content')}
              placeholder="자유롭게 내용을 입력해주세요."
              rows={6}
              className="text-p15b h-[320px] w-full resize-none rounded-xl text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-300"
              aria-label="내용"
            />
            {form.formState.errors.content && (
              <p className="text-p13 text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>

          {images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-xl"
                >
                  <Image
                    src={image.previewUrl}
                    alt="첨부 이미지"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    unoptimized
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                    aria-label="이미지 삭제"
                  >
                    <X size={14} />
                  </button>

                  {image.status === 'uploading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                      업로드 중...
                    </div>
                  )}

                  {image.status === 'failed' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white">
                      <span className="text-p13">업로드 실패</span>
                      <button
                        type="button"
                        className="rounded bg-white/90 px-2 py-1 text-xs text-gray-900"
                        onClick={() => retryUpload(image.id)}
                      >
                        재시도
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= MAX_IMAGES || isUploading || isSubmitting}
              className="flex h-fit w-fit items-center justify-center text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="이미지 추가"
            >
              <Camera className="size-6" />
            </button>
          </div>

          <label htmlFor={switchId} className="flex cursor-pointer items-center gap-2">
            <div className="relative">
              <input
                id={switchId}
                type="checkbox"
                className="absolute inset-0 cursor-pointer opacity-0"
                checked={!!anonymousField.value}
                onChange={(event) => onAnonymousChange(event.target.checked)}
              />
              <div
                className={`flex size-[16px] items-center justify-center rounded transition-colors duration-200 ${
                  anonymousField.value
                    ? 'border-gray-900 bg-gray-900'
                    : 'border-gray-200 bg-gray-600'
                }`}
              >
                {anonymousField.value && <Check className="size-4 text-white" />}
              </div>
            </div>
            <span className="text-p15b text-gray-700">익명</span>
          </label>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileSelect}
        />

        {(submitError || uploadError) && (
          <p className="text-p13 text-red-500" role="alert">
            {submitError ?? uploadError}
          </p>
        )}
      </form>
    </div>
  );
}
