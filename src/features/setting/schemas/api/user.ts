import { z } from 'zod';

/**
 * 프로필 이미지 스키마
 * 서버에서 주는 base 객체
 */
export const profileImageSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  order: z.number().int(),
});

/**
 * 서버 응답 데이터 타입 (목록)
 */
export const profileImagesSchema = z
  .array(profileImageSchema)
  .transform((images) => [...images].sort((a, b) => a.order - b.order));

export type ProfileImages = z.infer<typeof profileImageSchema>;

/**
 * 업로드 타입
 */
export const UploadStatusEnum = z.enum(['idle', 'uploading', 'uploaded', 'failed']);

export type UploadStatus = z.infer<typeof UploadStatusEnum>;

/**
 * 서버로 수정 요청을 보낼 때 사용하는 타입
 */
export const updateProfileImageRequestDTO = profileImageSchema.omit({ id: true });

export type UpdateProfileImageRequestDTO = z.infer<typeof updateProfileImageRequestDTO>;

/**
 * 내 정보 조회 API 응답 스키마
 */
export const getUsersMeResponseSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  nickname: z.string(),
  birthdate: z.string().optional(),
  gender: z.string().optional(),
  phoneNumber: z.string().optional(),
  profileImages: profileImagesSchema,
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetUsersMeResponseDTO = z.infer<typeof getUsersMeResponseSchema>;

/**
 * 닉네임 중복 확인 API 응답 스키마
 */
export const getUsersNicknameCheckResponseSchema = z.object({
  available: z.boolean(),
});

export type GetUsersNicknameCheckResponseDTO = z.infer<typeof getUsersNicknameCheckResponseSchema>;

/**
 * 닉네임 변경 API 성공 응답 스키마
 */
export const ChangeNicknameResponseSchema = z.object({
  message: z.string(),
});

export type ChangeNicknameResponseDTO = z.infer<typeof ChangeNicknameResponseSchema>;

/**
 * 닉네임 변경 API 성공 응답 스키마
 */
export const ChangeProfileImageResponseSchema = z.object({
  message: z.string(),
});

export type ChangeProfileImageResponseDTO = z.infer<typeof ChangeProfileImageResponseSchema>;

/**
 * 회원탈퇴 API 응답 스키마
 */
export const WithdrawResponseScheme = z.object({
  message: z.string(),
});
