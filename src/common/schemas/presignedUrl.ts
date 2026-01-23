import { z } from 'zod';

export const presignedUrlRequestSchema = z.object({
  domain: z.enum(['community', 'events', 'profile']),
  kind: z.enum(['image', 'attachment']),
  contentType: z.string(),
  size: z.number().optional(),
  totalSize: z.number().optional(),
  batchCount: z.number().optional(),
});

export const presignedUrlResponseSchema = z
  .object({
    uploadUrl: z.url(),
    fileUrl: z.string().min(1).optional(),
    publicUrl: z.string().min(1).optional(),
    key: z.string().optional(),
    upload: z
      .object({
        url: z.string().min(1).optional(),
      })
      .loose()
      .optional(),
  })
  .loose()
  .refine(
    (data) => data.fileUrl || data.publicUrl || data.upload?.url,
    '응답에 유효한 파일 URL이 없습니다.',
  );

export type PresignedUrlRequestDTO = z.infer<typeof presignedUrlRequestSchema>;
export type PresignedUrlResponseDTO = z.infer<typeof presignedUrlResponseSchema>;
