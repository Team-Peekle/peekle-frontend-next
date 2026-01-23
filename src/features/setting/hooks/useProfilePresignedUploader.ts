import { useRef, useState } from 'react';

import { UploadResult } from '@common/types/presignedUrl';

import { extractOrigin, toAbsoluteUrl } from '@common/utils/url';

import getPresignedUrl from '@common/apis/get/getPresignedUrl';

export default function useProfilePresignedUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 진행 중인 업로드 요청들을 id키로 저장
  const abortControllers = useRef<Map<string, AbortController>>(new Map());

  const upload = async (files: File[], uploadId: string) => {
    setIsUploading(true);
    setError(null);

    const controller = new AbortController();
    abortControllers.current.set(uploadId, controller);

    try {
      const results: UploadResult[] = [];

      for (const file of files) {
        // 백엔드에게 업로드 권한 요청
        const presigned = await getPresignedUrl({
          domain: 'profile',
          kind: 'image',
          contentType: file.type,
          size: file.size,
          totalSize: file.size,
          batchCount: 1,
        });

        const fallbackOrigins = [
          extractOrigin(presigned.fileUrl),
          extractOrigin(presigned.publicUrl),
          extractOrigin(presigned.upload?.url),
        ];
        const fileUrlCandidate =
          presigned.fileUrl ?? presigned.publicUrl ?? presigned.upload?.url ?? presigned.key;
        const fileUrl = toAbsoluteUrl(fileUrlCandidate, fallbackOrigins);
        const uploadUrl = presigned.uploadUrl;

        if (!fileUrl) {
          throw new Error('파일 URL을 받지 못했습니다.');
        }

        // S3 서버에 파일을 전송
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
          signal: controller.signal, // 취소 신호 연결
        });

        if (!response.ok) {
          const errorXml = await response.text();
          console.log('S3 에러 디테일:', errorXml);
          throw new Error('이미지 업로드에 실패했습니다.');
        }

        // 성공 시 최종 이미지 URL을 UI에 반영
        results.push({
          uploadUrl: uploadUrl,
          fileUrl: fileUrl,
        });
      }

      return results;
    } catch (err) {
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
      setError(message);
      throw err;
    } finally {
      abortControllers.current.delete(uploadId);
      setIsUploading(false);
    }
  };

  // 업로드 취소 함수
  const cancelUpload = (uploadId: string) => {
    const controller = abortControllers.current.get(uploadId);
    if (controller) {
      controller.abort();
      abortControllers.current.delete(uploadId);
    }
  };

  return {
    upload,
    isUploading,
    error,
    cancelUpload,
    resetError: () => setError(null),
  };
}
