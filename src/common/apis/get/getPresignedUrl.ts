import {
  PresignedUrlRequestDTO,
  presignedUrlRequestSchema,
  presignedUrlResponseSchema,
} from '@common/schemas/presignedUrl';

import { authenticatedClientFetcher } from '@common/libs/api/client';

export default function getPresignedUrl(payload: PresignedUrlRequestDTO) {
  const body = presignedUrlRequestSchema.parse(payload);
  return authenticatedClientFetcher('uploads/presigned', presignedUrlResponseSchema, {
    method: 'POST',
    json: body,
  });
}
