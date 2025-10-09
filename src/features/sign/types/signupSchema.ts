import { z } from 'zod';

/**
 * 회원가입 폼 스키마 (API 요청 스키마와 동일)
 */
export const signupSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, '닉네임을 입력해주세요.')
    .max(10, '닉네임은 최대 10자까지 입력할 수 있습니다.')
    .regex(
      /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ]+$/,
      '닉네임은 한글, 영문, 숫자, 공백만 사용할 수 있습니다.',
    )
    .refine((val) => val.trim().length > 0, {
      message: '닉네임은 최소 한 글자 이상이어야 합니다.',
    }),
  terms: z
    .array(
      z.object({
        termId: z.number(),
        isAccepted: z.boolean(),
      }),
    )
    .refine((terms) => terms.every((term) => term.isAccepted), {
      message: '모든 필수 약관에 동의해주세요.',
    }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

/**
 * 약관 ID 상수
 */
export const TERM_IDS = {
  SERVICE: 1, // 서비스 이용약관
  PRIVACY: 2, // 개인정보처리방침
} as const;
