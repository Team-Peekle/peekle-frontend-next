import { z } from 'zod';

/**
 * GET /v1/auth/protected 응답 스키마
 * 토큰 검증 성공 시 반환되는 데이터
 */
export const authProtectedResponseSchema = z.object({
  message: z.string(),
});

export type AuthProtectedResponseDTO = z.infer<typeof authProtectedResponseSchema>;

/**
 * POST /v1/auth/oauth/register 요청 스키마
 * OAuth 사용자 회원가입
 */
export const authOauthRegisterRequestSchema = z.object({
  nickname: z.string(),
  terms: z.array(
    z.object({
      termId: z.number(),
      isAccepted: z.boolean(),
    }),
  ),
});

export type AuthOauthRegisterRequestDTO = z.infer<typeof authOauthRegisterRequestSchema>;

/**
 * POST /v1/auth/oauth/register 응답 스키마
 * 토큰은 쿠키로 전달되므로 응답 body는 메시지만 포함
 */
export const authOauthRegisterResponseSchema = z.object({
  message: z.string().optional(),
});

export type AuthOauthRegisterResponseDTO = z.infer<typeof authOauthRegisterResponseSchema>;

/**
 * GET /auth/test/token 응답 스키마
 * 테스트 토큰 생성
 */
export const authTestTokenResponseSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthTestTokenResponseDTO = z.infer<typeof authTestTokenResponseSchema>;
