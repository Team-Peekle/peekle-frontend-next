import { z } from 'zod';

/**
 * GET /users/me 응답 스키마
 * 내 정보 조회 API 응답
 */
export const getUsersMeResponseSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  nickname: z.string(),
  birthdate: z.string().optional(),
  gender: z.string().optional(),
  phoneNumber: z.string().optional(),
  profileImage: z.string().optional(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetUsersMeResponseDTO = z.infer<typeof getUsersMeResponseSchema>;

/**
 * GET /users/nickname/check 응답 스키마
 * 닉네임 중복 확인 API 응답
 */
export const getUsersNicknameCheckResponseSchema = z.object({
  available: z.boolean(),
});

export type GetUsersNicknameCheckResponseDTO = z.infer<typeof getUsersNicknameCheckResponseSchema>;
