import { z } from 'zod';

/**
 * GET /v1/auth/protected 응답 스키마
 * 토큰 검증 성공 시 반환되는 데이터
 */
export const authProtectedResponseSchema = z.object({
  message: z.string(),
});

export type AuthProtectedResponseDTO = z.infer<typeof authProtectedResponseSchema>;
