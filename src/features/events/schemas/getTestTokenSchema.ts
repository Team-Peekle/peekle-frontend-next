import { z } from 'zod';

export const getTestTokenSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type GetTestTokenReponseDTO = z.infer<typeof getTestTokenSchema>;
