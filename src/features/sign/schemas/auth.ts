import { z } from 'zod';

/**
 * JWT RegisterToken payload 공통 필드
 */
const baseOAuthUserSchema = z.object({
  oauthProvider: z.enum(['kakao', 'google']),
  oauthId: z.string(),
  iat: z.number(),
  exp: z.number(),
});

/**
 * Kakao OAuth 사용자 데이터
 */
export const kakaoUserDataSchema = baseOAuthUserSchema.extend({
  oauthProvider: z.literal('kakao'),
  name: z.string(),
  nickname: z.string(),
  email: z.string().optional(),
  profileImage: z.string(),
});

/**
 * Google OAuth 사용자 데이터
 */
export const googleUserDataSchema = baseOAuthUserSchema.extend({
  oauthProvider: z.literal('google'),
  name: z.string(),
  profileImage: z.string(),
});

/**
 * RegisterToken payload 전체 스키마
 */
export const registerTokenPayloadSchema = z.union([kakaoUserDataSchema, googleUserDataSchema]);

export type KakaoUserData = z.infer<typeof kakaoUserDataSchema>;
export type GoogleUserData = z.infer<typeof googleUserDataSchema>;
export type RegisterTokenPayload = z.infer<typeof registerTokenPayloadSchema>;
