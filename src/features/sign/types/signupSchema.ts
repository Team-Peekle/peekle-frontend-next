import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
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
});

export type SignupSchema = z.infer<typeof signupSchema>;

export async function checkNicknameDuplicate(nickname: string): Promise<boolean> {
  return false;
}
