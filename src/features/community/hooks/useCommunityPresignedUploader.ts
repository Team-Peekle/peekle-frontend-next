import { useState } from 'react';

import getPresignedUrl from '@common/apis/get/getPresignedUrl';

interface UploadResult {
  fileUrl: string;
  uploadUrl: string;
}

const extractOrigin = (url?: string | null) => {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    if (url.startsWith('//')) {
      return new URL(`https:${url}`).origin;
    }
    return null;
  }
};

const toAbsoluteUrl = (
  rawUrl: string | undefined,
  fallbackOrigins: Array<string | null>,
): string | null => {
  if (!rawUrl) return null;
  try {
    return new URL(rawUrl).toString();
  } catch {
    if (rawUrl.startsWith('//')) {
      return `https:${rawUrl}`;
    }
    const origin = fallbackOrigins.find((candidate) => candidate && candidate.length > 0) ?? null;
    if (origin) {
      return `${origin.replace(/\/+$/, '')}/${rawUrl.replace(/^\/+/, '')}`;
    }
    if (rawUrl.startsWith('/')) {
      return `https://${rawUrl.replace(/^\/+/, '')}`;
    }
    return `https://${rawUrl}`;
  }
};

export function useCommunityPresignedUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: File[]) => {
    setIsUploading(true);
    setError(null);

    try {
      const results: UploadResult[] = [];

      for (const file of files) {
        const presigned = await getPresignedUrl({
          domain: 'community',
          kind: 'image',
          contentType: file.type,
          size: file.size,
          totalSize: file.size,
          batchCount: 1,
        });

        const uploadUrl = presigned.uploadUrl;
        const fallbackOrigins = [
          extractOrigin(presigned.fileUrl),
          extractOrigin(presigned.publicUrl),
          extractOrigin(presigned.upload?.url),
        ];
        const fileUrlCandidate =
          presigned.fileUrl ?? presigned.publicUrl ?? presigned.upload?.url ?? presigned.key;
        const fileUrl = toAbsoluteUrl(fileUrlCandidate, fallbackOrigins);

        if (!fileUrl) {
          throw new Error('파일 URL을 받지 못했습니다.');
        }

        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        if (!response.ok) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }

        results.push({ uploadUrl, fileUrl });
      }

      return results;
    } catch (err) {
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
    resetError: () => setError(null),
  };
}
