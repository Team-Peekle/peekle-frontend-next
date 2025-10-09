import { z } from 'zod';

/**
 * GET /users/me 응답 스키마
 * 내 정보 조회 API 응답
 */
export const getUsersMeResponseSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  nickname: z.string(),
  birthdate: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  profileImage: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetUsersMeResponseDTO = z.infer<typeof getUsersMeResponseSchema>;
